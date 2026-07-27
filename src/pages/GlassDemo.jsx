import React, { useState, useEffect, useRef } from 'react';
import { Settings, Info, RefreshCw, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import './GlassDemo.css';

// Shader source code
const VS_SOURCE = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FS_SOURCE = `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 u_resolution;
  uniform vec2 u_spherePos;
  uniform float u_refraction;
  uniform float u_depth;
  uniform float u_dispersion;
  uniform float u_frost;
  uniform float u_lightAngle;
  uniform float u_lightIntensity;

  // Simple hash for frost noise
  float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    
    // Adjust coordinates for aspect ratio
    vec2 uvAspect = uv;
    uvAspect.x *= aspect;
    
    vec2 spherePosAspect = u_spherePos;
    spherePosAspect.x *= aspect;
    
    // Size of the refracting glass sphere
    float radius = 0.28;
    float dist = distance(uvAspect, spherePosAspect);
    
    // Base width of the background vertical stripes
    float stripeWidth = 0.06;
    
    if (dist < radius) {
      // 3D surface normal calculation
      float z = sqrt(radius * radius - dist * dist);
      vec3 normal = normalize(vec3(uvAspect - spherePosAspect, z));
      
      // Frost noise offset
      float frostVal = u_frost * 0.035;
      vec2 noise = vec2(rand(uv) - 0.5, rand(uv + vec2(1.3, 0.7))) * frostVal;
      
      // IOR (Index of Refraction) calculations for R, G, B channels
      float baseIor = 1.0 + u_refraction * 0.45;
      float dispAmount = u_dispersion * 0.07;
      float iorR = baseIor - dispAmount;
      float iorG = baseIor;
      float iorB = baseIor + dispAmount;
      
      // Refraction vectors
      vec3 incoming = vec3(0.0, 0.0, -1.0);
      vec3 refR = refract(incoming, normal, 1.0 / iorR);
      vec3 refG = refract(incoming, normal, 1.0 / iorG);
      vec3 refB = refract(incoming, normal, 1.0 / iorB);
      
      // Depth multiplier
      float depthMult = u_depth * 0.25;
      
      // Project refracted rays onto background plane
      vec2 uvR = uv + refR.xy * depthMult + noise;
      vec2 uvG = uv + refG.xy * depthMult + noise;
      vec2 uvB = uv + refB.xy * depthMult + noise;
      
      // Sample black and white stripes
      float stripeR = step(0.5, fract(uvR.x / stripeWidth));
      float stripeG = step(0.5, fract(uvG.x / stripeWidth));
      float stripeB = step(0.5, fract(uvB.x / stripeWidth));
      
      // 3D Lighting vectors
      vec3 lightDir = normalize(vec3(cos(u_lightAngle), sin(u_lightAngle), 1.6));
      vec3 viewDir = vec3(0.0, 0.0, 1.0);
      
      // Specular highlight
      vec3 halfVec = normalize(lightDir + viewDir);
      float spec = pow(max(dot(normal, halfVec), 0.0), 45.0) * (u_lightIntensity / 100.0) * 1.0;
      
      // Fresnel rim reflections
      float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.2) * 0.48;
      
      // Combine lighting and base color
      vec3 baseColor = vec3(stripeR, stripeG, stripeB);
      vec3 finalColor = baseColor * (0.8 + 0.2 * max(dot(normal, lightDir), 0.0)) + vec3(spec + fresnel);
      
      // Inner shadow glow for liquid depth feel
      float edgeGlow = smoothstep(radius, radius - 0.02, dist);
      finalColor *= (0.7 + 0.3 * edgeGlow);
      
      gl_FragColor = vec4(finalColor, 1.0);
    } else {
      // Background stripes
      float bgStripe = step(0.5, fract(uv.x / (stripeWidth / aspect)));
      
      // Ambient drop-shadow behind sphere
      float shadow = smoothstep(radius + 0.12, radius, dist);
      vec3 color = vec3(bgStripe) * (1.0 - shadow * 0.22);
      
      gl_FragColor = vec4(color, 1.0);
    }
  }
`;

export default function GlassDemo() {
  const canvasRef = useRef(null);

  // States matching user controls in screenshot
  const [refraction, setRefraction] = useState(100);
  const [depth, setDepth] = useState(71);
  const [dispersion, setDispersion] = useState(100);
  const [frost, setFrost] = useState(0);
  const [lightAngle, setLightAngle] = useState(-45); // Degrees
  const [lightIntensity, setLightIntensity] = useState(50); // Default specular brightness

  // Sphere Position states for dragging (lerped in loop)
  const spherePos = useRef({ x: 0.35, y: 0.5 }); // Starting position centered on left
  const targetPos = useRef({ x: 0.35, y: 0.5 });
  const isDragging = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL is not supported in this browser.');
      return;
    }

    // Compile Shader helper
    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      }
      return shader;
    };

    const vs = compileShader(VS_SOURCE, gl.VERTEX_SHADER);
    const fs = compileShader(FS_SOURCE, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Shader linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup full-screen quad positions
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Find uniform references
    const uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      spherePos: gl.getUniformLocation(program, 'u_spherePos'),
      refraction: gl.getUniformLocation(program, 'u_refraction'),
      depth: gl.getUniformLocation(program, 'u_depth'),
      dispersion: gl.getUniformLocation(program, 'u_dispersion'),
      frost: gl.getUniformLocation(program, 'u_frost'),
      lightAngle: gl.getUniformLocation(program, 'u_lightAngle'),
      lightIntensity: gl.getUniformLocation(program, 'u_lightIntensity'),
    };

    // Resize canvas helper
    const resizeCanvas = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }
    };

    let animationFrameId;

    // Render loop
    const render = () => {
      resizeCanvas();

      // Lerp sphere position for liquid inertia drag response
      spherePos.current.x += (targetPos.current.x - spherePos.current.x) * 0.1;
      spherePos.current.y += (targetPos.current.y - spherePos.current.y) * 0.1;

      // Pass controls to WebGL uniform variables
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.spherePos, spherePos.current.x, spherePos.current.y);
      gl.uniform1f(uniforms.refraction, refraction / 100.0);
      gl.uniform1f(uniforms.depth, depth / 100.0);
      gl.uniform1f(uniforms.dispersion, dispersion / 100.0);
      gl.uniform1f(uniforms.frost, frost / 100.0);
      gl.uniform1f(uniforms.lightAngle, (lightAngle * Math.PI) / 180.0);
      gl.uniform1f(uniforms.lightIntensity, parseFloat(lightIntensity));

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [refraction, depth, dispersion, frost, lightAngle, lightIntensity]);

  // Handle Drag logic for the Glass Sphere
  const handlePointerDown = (e) => {
    isDragging.current = true;
    e.target.setPointerCapture(e.pointerId);
    updateTargetPosition(e);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    updateTargetPosition(e);
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
    e.target.releasePointerCapture(e.pointerId);
  };

  const updateTargetPosition = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    // In WebGL, y starts at bottom, so subtract relative coordinates
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    
    // Clamp to canvas boundaries
    targetPos.current.x = Math.max(0.1, Math.min(0.9, x));
    targetPos.current.y = Math.max(0.1, Math.min(0.9, y));
  };

  return (
    <div className="glass-demo-page animate-fade">
      {/* Header back navigation overlay */}
      <div className="demo-header">
        <Link to="/" className="back-link btn-secondary">
          <ArrowLeft size={16} /> Back to Diagnostics
        </Link>
        <h1>Glass Refraction Playground</h1>
      </div>

      <div className="demo-content-container">
        {/* WebGL Refraction Canvas viewport */}
        <div className="canvas-wrapper">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            title="Drag the glass sphere around!"
          />
          <div className="drag-hint">
            <span>Drag the sphere to move it across the stripes</span>
          </div>
        </div>

        {/* Specular iOS-style Control widgets (replica of user screenshot) */}
        <div className="control-panel-wrapper">
          <div className="refraction-control-card">
            {/* Header toolbar */}
            <div className="card-header-bar">
              <div className="header-badge-dropdown">
                <div className="dropdown-pill">
                  <span className="dot-indicator"></span>
                  <span>Glass</span>
                  <span className="arrow-down">▾</span>
                </div>
                <span className="beta-tag">Beta</span>
              </div>
              <button className="close-panel-btn" title="Close Panel">
                <X size={15} />
              </button>
            </div>

            {/* Light Settings Group */}
            <div className="light-setup-container">
              <span className="setting-label">Light</span>
              
              <div className="light-grid-controls">
                {/* 2D Light angle directional joystick pad */}
                <div className="light-pad">
                  <div 
                    className="light-indicator"
                    style={{
                      transform: `translate(-50%, -50%) translate(${Math.cos(lightAngle * Math.PI / 180) * 16}px, ${-Math.sin(lightAngle * Math.PI / 180) * 16}px)`
                    }}
                  />
                  <div className="joystick-icon">💡</div>
                </div>

                <div className="light-numerical-controls">
                  <div className="numerical-value-row">
                    <span className="icon">📐</span>
                    <input 
                      type="number" 
                      value={lightAngle} 
                      onChange={(e) => setLightAngle(Math.max(-180, Math.min(180, parseInt(e.target.value) || 0)))}
                      className="numerical-input" 
                    />
                    <span className="suffix">°</span>
                  </div>

                  <div className="numerical-value-row">
                    <span className="icon">🔆</span>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={lightIntensity}
                      onChange={(e) => setLightIntensity(e.target.value)}
                      className="slider-input" 
                    />
                    <span className="label-val">{lightIntensity}%</span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="divider-line" />

            {/* Sliders group */}
            <div className="sliders-section">
              {/* Refraction */}
              <div className="control-slider-group">
                <span className="slider-label">Refraction</span>
                <div className="slider-row">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={refraction}
                    onChange={(e) => setRefraction(parseInt(e.target.value))}
                    className="main-slider"
                  />
                  <span className="slider-value-display">{refraction}</span>
                </div>
              </div>

              {/* Depth */}
              <div className="control-slider-group">
                <span className="slider-label">Depth</span>
                <div className="slider-row">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={depth}
                    onChange={(e) => setDepth(parseInt(e.target.value))}
                    className="main-slider"
                  />
                  <span className="slider-value-display">{depth}</span>
                </div>
              </div>

              {/* Dispersion */}
              <div className="control-slider-group">
                <span className="slider-label">Dispersion</span>
                <div className="slider-row">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={dispersion}
                    onChange={(e) => setDispersion(parseInt(e.target.value))}
                    className="main-slider"
                  />
                  <span className="slider-value-display">{dispersion}</span>
                </div>
              </div>

              {/* Frost */}
              <div className="control-slider-group">
                <span className="slider-label">Frost</span>
                <div className="slider-row">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={frost}
                    onChange={(e) => setFrost(parseInt(e.target.value))}
                    className="main-slider"
                  />
                  <span className="slider-value-display">{frost}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
