import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { useRef, useMemo, useState, useCallback } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

// Click reaction hook
const useClickReaction = (baseSpeed: number) => {
  const [clicked, setClicked] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0, rotX: 0, rotY: 0 });
  
  const handleClick = useCallback((event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setClicked(true);
    
    // Random push direction
    const pushX = (Math.random() - 0.5) * 3;
    const pushY = Math.random() * 2 + 1;
    const pushZ = (Math.random() - 0.5) * 2;
    
    setVelocity({
      x: pushX,
      y: pushY,
      z: pushZ,
      rotX: (Math.random() - 0.5) * 8,
      rotY: (Math.random() - 0.5) * 8
    });
    
    setTimeout(() => setClicked(false), 800);
  }, []);
  
  return { clicked, velocity, handleClick, setVelocity };
};


const JSLogo = ({
  position,
  speed,
  scale = 1,
}: {
  position: [number, number, number];
  speed: number;
  scale?: number;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const initialY = position[1];
  const initialX = position[0];
  const { clicked, velocity, handleClick, setVelocity } = useClickReaction(speed);
  const clickOffset = useRef({ x: 0, y: 0, z: 0, rotX: 0, rotY: 0 });

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Apply click reaction
      if (clicked) {
        clickOffset.current.x += velocity.x * delta;
        clickOffset.current.y += velocity.y * delta;
        clickOffset.current.z += velocity.z * delta;
        clickOffset.current.rotX += velocity.rotX * delta;
        clickOffset.current.rotY += velocity.rotY * delta;
        
        setVelocity(prev => ({
          x: prev.x * 0.92,
          y: prev.y * 0.92 - delta * 3,
          z: prev.z * 0.92,
          rotX: prev.rotX * 0.92,
          rotY: prev.rotY * 0.92
        }));
      } else {
        clickOffset.current.x *= 0.93;
        clickOffset.current.y *= 0.93;
        clickOffset.current.z *= 0.93;
        clickOffset.current.rotX *= 0.93;
        clickOffset.current.rotY *= 0.93;
      }

      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.4 + clickOffset.current.rotY;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * speed * 0.2) * 0.1 + clickOffset.current.rotX;
      meshRef.current.position.y =
        initialY + Math.sin(state.clock.elapsedTime * speed) * 0.8 + clickOffset.current.y;
      meshRef.current.position.x =
        initialX + Math.cos(state.clock.elapsedTime * speed * 0.5) * 0.5 + clickOffset.current.x;
      meshRef.current.position.z = position[2] + clickOffset.current.z;
    }
  });

  const jShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0.15, 0.4);
    shape.lineTo(0.15, -0.1);
    shape.quadraticCurveTo(0.15, -0.35, -0.1, -0.35);
    shape.quadraticCurveTo(-0.25, -0.35, -0.25, -0.2);
    shape.lineTo(-0.15, -0.2);
    shape.quadraticCurveTo(-0.15, -0.25, -0.05, -0.25);
    shape.quadraticCurveTo(0.05, -0.25, 0.05, -0.1);
    shape.lineTo(0.05, 0.4);
    shape.closePath();
    return shape;
  }, []);

  const sShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0.55, 0.3);
    shape.quadraticCurveTo(0.55, 0.4, 0.42, 0.4);
    shape.lineTo(0.28, 0.4);
    shape.quadraticCurveTo(0.18, 0.4, 0.18, 0.3);
    shape.quadraticCurveTo(0.18, 0.22, 0.28, 0.2);
    shape.lineTo(0.42, 0.15);
    shape.quadraticCurveTo(0.55, 0.12, 0.55, 0);
    shape.quadraticCurveTo(0.55, -0.15, 0.42, -0.15);
    shape.lineTo(0.28, -0.15);
    shape.quadraticCurveTo(0.18, -0.15, 0.18, -0.05);
    shape.lineTo(0.28, -0.05);
    shape.quadraticCurveTo(0.28, -0.08, 0.32, -0.08);
    shape.lineTo(0.4, -0.08);
    shape.quadraticCurveTo(0.45, -0.08, 0.45, 0);
    shape.quadraticCurveTo(0.45, 0.08, 0.38, 0.1);
    shape.lineTo(0.28, 0.15);
    shape.quadraticCurveTo(0.18, 0.18, 0.18, 0.3);
    shape.quadraticCurveTo(0.18, 0.32, 0.2, 0.33);
    shape.lineTo(0.28, 0.33);
    shape.quadraticCurveTo(0.28, 0.3, 0.32, 0.3);
    shape.lineTo(0.45, 0.3);
    shape.closePath();
    return shape;
  }, []);

  const extrudeSettings = {
    steps: 1,
    depth: 0.08,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.01,
    bevelSegments: 2,
  };

  return (
    <group 
      ref={meshRef} 
      position={position} 
      scale={clicked ? scale * 1.15 : scale}
      onClick={handleClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'default'}
    >
      <mesh>
        <boxGeometry args={[1.8, 1.8, 0.15]} />
        <meshStandardMaterial 
          color={clicked ? "#FFE74C" : "#F7DF1E"} 
          metalness={0.2} 
          roughness={0.3}
          emissive={clicked ? "#F7DF1E" : "#000000"}
          emissiveIntensity={clicked ? 0.5 : 0}
        />
      </mesh>
      <mesh position={[-0.35, -0.15, 0.1]}>
        <extrudeGeometry args={[jShape, extrudeSettings]} />
        <meshStandardMaterial color="#323330" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[-0.05, -0.15, 0.1]}>
        <extrudeGeometry args={[sShape, extrudeSettings]} />
        <meshStandardMaterial color="#323330" metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
};

const ReactLogo = ({
  position,
  speed,
  scale = 1,
}: {
  position: [number, number, number];
  speed: number;
  scale?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  const initialX = position[0];
  const { clicked, velocity, handleClick, setVelocity } = useClickReaction(speed);
  const clickOffset = useRef({ x: 0, y: 0, z: 0, rotX: 0, rotY: 0 });
  const spinBoost = useRef(1);

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (clicked) {
        clickOffset.current.x += velocity.x * delta;
        clickOffset.current.y += velocity.y * delta;
        clickOffset.current.z += velocity.z * delta;
        spinBoost.current = 5;
        
        setVelocity(prev => ({
          x: prev.x * 0.92,
          y: prev.y * 0.92 - delta * 3,
          z: prev.z * 0.92,
          rotX: prev.rotX * 0.92,
          rotY: prev.rotY * 0.92
        }));
      } else {
        clickOffset.current.x *= 0.93;
        clickOffset.current.y *= 0.93;
        clickOffset.current.z *= 0.93;
        spinBoost.current = spinBoost.current * 0.95 + 1 * 0.05;
      }

      groupRef.current.position.y =
        initialY + Math.sin(state.clock.elapsedTime * speed * 0.8) * 0.6 + clickOffset.current.y;
      groupRef.current.position.x =
        initialX + Math.cos(state.clock.elapsedTime * speed * 0.4) * 0.4 + clickOffset.current.x;
      groupRef.current.position.z = position[2] + clickOffset.current.z;
      groupRef.current.rotation.y = state.clock.elapsedTime * speed * 0.15 * spinBoost.current;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = state.clock.elapsedTime * speed * 0.8 * spinBoost.current;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = state.clock.elapsedTime * speed * 0.6 * spinBoost.current;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = state.clock.elapsedTime * speed * 0.7 * spinBoost.current;
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position} 
      scale={clicked ? scale * 1.2 : scale}
      onClick={handleClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'default'}
    >
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color="#61DAFB"
          emissive="#61DAFB"
          emissiveIntensity={clicked ? 1.5 : 0.5}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={ring1Ref} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#61DAFB"
          emissive="#61DAFB"
          emissiveIntensity={clicked ? 1 : 0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.5, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#61DAFB"
          emissive="#61DAFB"
          emissiveIntensity={clicked ? 1 : 0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh ref={ring3Ref} rotation={[-Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.5, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#61DAFB"
          emissive="#61DAFB"
          emissiveIntensity={clicked ? 1 : 0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};

const NodeLogo = ({
  position,
  speed,
  scale = 1,
}: {
  position: [number, number, number];
  speed: number;
  scale?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  const initialX = position[0];
  const { clicked, velocity, handleClick, setVelocity } = useClickReaction(speed);
  const clickOffset = useRef({ x: 0, y: 0, z: 0, rotX: 0, rotY: 0 });

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (clicked) {
        clickOffset.current.x += velocity.x * delta;
        clickOffset.current.y += velocity.y * delta;
        clickOffset.current.z += velocity.z * delta;
        clickOffset.current.rotX += velocity.rotX * delta;
        clickOffset.current.rotY += velocity.rotY * delta;
        
        setVelocity(prev => ({
          x: prev.x * 0.92,
          y: prev.y * 0.92 - delta * 3,
          z: prev.z * 0.92,
          rotX: prev.rotX * 0.92,
          rotY: prev.rotY * 0.92
        }));
      } else {
        clickOffset.current.x *= 0.93;
        clickOffset.current.y *= 0.93;
        clickOffset.current.z *= 0.93;
        clickOffset.current.rotX *= 0.93;
        clickOffset.current.rotY *= 0.93;
      }

      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.4 + clickOffset.current.rotY;
      meshRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2 + clickOffset.current.rotX;
      meshRef.current.position.y =
        initialY + Math.sin(state.clock.elapsedTime * speed * 0.9) * 0.5 + clickOffset.current.y;
      meshRef.current.position.x =
        initialX + Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.5 + clickOffset.current.x;
      meshRef.current.position.z = position[2] + clickOffset.current.z;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      scale={clicked ? scale * 1.15 : scale}
      onClick={handleClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'default'}
    >
      <cylinderGeometry args={[1, 1, 0.3, 6]} />
      <meshStandardMaterial
        color={clicked ? "#4AE54A" : "#339933"}
        metalness={0.3}
        roughness={0.2}
        emissive="#339933"
        emissiveIntensity={clicked ? 0.8 : 0.3}
      />
    </mesh>
  );
};

const TypeScriptLogo = ({
  position,
  speed,
  scale = 1,
}: {
  position: [number, number, number];
  speed: number;
  scale?: number;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const initialY = position[1];
  const initialX = position[0];
  const { clicked, velocity, handleClick, setVelocity } = useClickReaction(speed);
  const clickOffset = useRef({ x: 0, y: 0, z: 0, rotX: 0, rotY: 0 });

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (clicked) {
        clickOffset.current.x += velocity.x * delta;
        clickOffset.current.y += velocity.y * delta;
        clickOffset.current.z += velocity.z * delta;
        clickOffset.current.rotX += velocity.rotX * delta;
        clickOffset.current.rotY += velocity.rotY * delta;
        
        setVelocity(prev => ({
          x: prev.x * 0.92,
          y: prev.y * 0.92 - delta * 3,
          z: prev.z * 0.92,
          rotX: prev.rotX * 0.92,
          rotY: prev.rotY * 0.92
        }));
      } else {
        clickOffset.current.x *= 0.93;
        clickOffset.current.y *= 0.93;
        clickOffset.current.z *= 0.93;
        clickOffset.current.rotX *= 0.93;
        clickOffset.current.rotY *= 0.93;
      }

      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * speed * 0.25) * 0.4 + clickOffset.current.rotY;
      meshRef.current.rotation.x =
        Math.cos(state.clock.elapsedTime * speed * 0.15) * 0.1 + clickOffset.current.rotX;
      meshRef.current.position.y =
        initialY + Math.sin(state.clock.elapsedTime * speed * 0.7) * 0.6 + clickOffset.current.y;
      meshRef.current.position.x =
        initialX + Math.cos(state.clock.elapsedTime * speed * 0.6) * 0.4 + clickOffset.current.x;
      meshRef.current.position.z = position[2] + clickOffset.current.z;
    }
  });

  const tShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.3, 0.35);
    shape.lineTo(0.3, 0.35);
    shape.lineTo(0.3, 0.25);
    shape.lineTo(0.05, 0.25);
    shape.lineTo(0.05, -0.35);
    shape.lineTo(-0.05, -0.35);
    shape.lineTo(-0.05, 0.25);
    shape.lineTo(-0.3, 0.25);
    shape.closePath();
    return shape;
  }, []);

  const cShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0.45, 0.3);
    shape.quadraticCurveTo(0.45, 0.4, 0.32, 0.4);
    shape.lineTo(0.18, 0.4);
    shape.quadraticCurveTo(0.08, 0.4, 0.08, 0.3);
    shape.quadraticCurveTo(0.08, 0.22, 0.18, 0.2);
    shape.lineTo(0.32, 0.15);
    shape.quadraticCurveTo(0.45, 0.12, 0.45, 0);
    shape.quadraticCurveTo(0.45, -0.15, 0.32, -0.15);
    shape.lineTo(0.18, -0.15);
    shape.quadraticCurveTo(0.08, -0.15, 0.08, -0.05);
    shape.lineTo(0.18, -0.05);
    shape.quadraticCurveTo(0.18, -0.08, 0.22, -0.08);
    shape.lineTo(0.3, -0.08);
    shape.quadraticCurveTo(0.35, -0.08, 0.35, 0);
    shape.quadraticCurveTo(0.35, 0.08, 0.28, 0.1);
    shape.lineTo(0.18, 0.15);
    shape.quadraticCurveTo(0.08, 0.18, 0.08, 0.3);
    shape.quadraticCurveTo(0.08, 0.32, 0.1, 0.33);
    shape.lineTo(0.18, 0.33);
    shape.quadraticCurveTo(0.18, 0.3, 0.22, 0.3);
    shape.lineTo(0.35, 0.3);
    shape.closePath();
    return shape;
  }, []);

  const extrudeSettings = {
    steps: 1,
    depth: 0.08,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.01,
    bevelSegments: 2,
  };

  return (
    <group 
      ref={meshRef} 
      position={position} 
      scale={clicked ? scale * 1.15 : scale}
      onClick={handleClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'default'}
    >
      <mesh>
        <boxGeometry args={[1.8, 1.8, 0.15]} />
        <meshStandardMaterial 
          color={clicked ? "#4A9FE8" : "#3178C6"} 
          metalness={0.3} 
          roughness={0.2}
          emissive={clicked ? "#3178C6" : "#000000"}
          emissiveIntensity={clicked ? 0.5 : 0}
        />
      </mesh>
      <mesh position={[-0.25, -0.15, 0.1]}>
        <extrudeGeometry args={[tShape, extrudeSettings]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.05, -0.15, 0.1]}>
        <extrudeGeometry args={[cShape, extrudeSettings]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

const CodeBracket = ({
  position,
  rotation,
  color,
  speed,
  scale,
  type,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  speed: number;
  scale: number;
  type: "curly" | "angle" | "square";
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  const initialX = position[0];
  const { clicked, velocity, handleClick, setVelocity } = useClickReaction(speed);
  const clickOffset = useRef({ x: 0, y: 0, z: 0, rotX: 0, rotY: 0 });

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (clicked) {
        clickOffset.current.x += velocity.x * delta;
        clickOffset.current.y += velocity.y * delta;
        clickOffset.current.z += velocity.z * delta;
        clickOffset.current.rotX += velocity.rotX * delta;
        clickOffset.current.rotY += velocity.rotY * delta;
        
        setVelocity(prev => ({
          x: prev.x * 0.92,
          y: prev.y * 0.92 - delta * 3,
          z: prev.z * 0.92,
          rotX: prev.rotX * 0.92,
          rotY: prev.rotY * 0.92
        }));
      } else {
        clickOffset.current.x *= 0.93;
        clickOffset.current.y *= 0.93;
        clickOffset.current.z *= 0.93;
        clickOffset.current.rotX *= 0.93;
        clickOffset.current.rotY *= 0.93;
      }

      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.4 + clickOffset.current.rotY;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * speed * 0.6) * 0.3 + clickOffset.current.rotX;
      meshRef.current.position.y =
        initialY + Math.sin(state.clock.elapsedTime * speed) * 0.7 + clickOffset.current.y;
      meshRef.current.position.x =
        initialX + Math.cos(state.clock.elapsedTime * speed * 0.8) * 0.6 + clickOffset.current.x;
      meshRef.current.position.z = position[2] + clickOffset.current.z;
    }
  });

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    if (type === "curly") {
      s.moveTo(0.3, 1);
      s.quadraticCurveTo(0, 1, 0, 0.7);
      s.lineTo(0, 0.4);
      s.quadraticCurveTo(0, 0.2, -0.2, 0);
      s.quadraticCurveTo(0, -0.2, 0, -0.4);
      s.lineTo(0, -0.7);
      s.quadraticCurveTo(0, -1, 0.3, -1);
    } else if (type === "angle") {
      s.moveTo(0.4, 0.6);
      s.lineTo(-0.2, 0);
      s.lineTo(0.4, -0.6);
      s.lineTo(0.5, -0.5);
      s.lineTo(0, 0);
      s.lineTo(0.5, 0.5);
    } else {
      s.moveTo(0.3, 0.8);
      s.lineTo(0, 0.8);
      s.lineTo(0, -0.8);
      s.lineTo(0.3, -0.8);
      s.lineTo(0.3, -0.7);
      s.lineTo(0.1, -0.7);
      s.lineTo(0.1, 0.7);
      s.lineTo(0.3, 0.7);
    }
    return s;
  }, [type]);

  const extrudeSettings = {
    steps: 1,
    depth: 0.15,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 3,
  };

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      rotation={rotation} 
      scale={clicked ? scale * 1.3 : scale}
      onClick={handleClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'default'}
    >
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial
        color={color}
        metalness={0.5}
        roughness={0.3}
        emissive={color}
        emissiveIntensity={clicked ? 0.8 : 0.2}
      />
    </mesh>
  );
};

const CodeParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const particlesCount = 150;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const col = new Float32Array(particlesCount * 3);
    const colorOptions = [
      [0.97, 0.87, 0.12],
      [0.38, 0.85, 0.98],
      [0.2, 0.6, 0.2],
      [0.19, 0.47, 0.78],
      [0.66, 0.33, 0.97],
    ];

    for (let i = 0; i < particlesCount; i++) {
      const side = Math.random() > 0.5 ? 1 : -1;
      pos[i * 3] = side * (5 + Math.random() * 10);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      col[i * 3] = color[0];
      col[i * 3 + 1] = color[1];
      col[i * 3 + 2] = color[2];
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <directionalLight position={[-10, -10, -5]} intensity={0.6} color="#61DAFB" />
      <pointLight position={[-8, 0, 3]} intensity={1} color="#F7DF1E" />
      <pointLight position={[8, 0, 3]} intensity={1} color="#61DAFB" />

      <JSLogo position={[-13, 2, -3]} speed={0.7} scale={1.4} />
      <JSLogo position={[17, -3, -5]} speed={0.5} scale={1.1} />

      <NodeLogo position={[-8, 4, -4]} speed={0.6} scale={1} />
      <NodeLogo position={[2, -12, -6]} speed={0.7} scale={0.8} />
      <NodeLogo position={[-10, -14, -6]} speed={0.7} scale={0.8} />


      <ReactLogo position={[7, -6, -7]} speed={0.6} scale={1} />
      <ReactLogo position={[-19, -3, -15]} speed={0.6} scale={1} />

      <TypeScriptLogo position={[10, -4, -0]} speed={0.5} scale={1} />
      <TypeScriptLogo position={[1, 5, -7]} speed={0.5} scale={0.85} />

      <CodeBracket
        position={[-12, 3, -4]}
        rotation={[0, 0.5, 0]}
        color="#F7DF1E"
        speed={0.8}
        scale={0.9}
        type="curly"
      />
      <CodeBracket
        position={[12, -2, -5]}
        rotation={[0.3, 0, 0.2]}
        color="#61DAFB"
        speed={0.7}
        scale={0.8}
        type="angle"
      />

      <CodeParticles />
    </>
  );
};

const HeroBackground3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        style={{
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%)",
          width: "100%",
          height: "100%",
        }}
        eventSource={document.getElementById("root")!}
        eventPrefix="client"
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default HeroBackground3D;
