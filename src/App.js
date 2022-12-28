import './App.css';
import Box from './Box'
import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <Canvas
       camera={{ position: [2, 0, 12.25], fov: 15 }}
       style={{
          backgroundColor: '#111a21',
          width: '100vw',
          height: '100vh',
       }}
    >
      <ambientLight intensity={1.25} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Suspense>
        <OrbitControls />
    </Canvas>
  );
}

export default App