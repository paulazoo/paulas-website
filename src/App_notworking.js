import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stage, Box, Dodecahedron } from '@react-three/drei'
import gsap, { Power3 } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import Scroller, { scrollerConfig } from './Scroller'
import Truck from './Truck'

const FallingBox = ({ x = 0, start = 0 }) => {
  const [boxParams] = useState(() => ({ y: 6, rotation: 0 }))

  useEffect(() => {
    // Example of using ScrollTrigger with GSAP to update properties w/ controlled start/end times
    gsap.to(boxParams, {
      y: 2,
      rotation: Math.PI * 4,
      ease: Power3.easeInOut,
      scrollTrigger: {
        ...scrollerConfig,
        start: start,
        end: '90%'
      }
    })
  }, [boxParams, start])

  return (
    <Box position={[x, boxParams.y, 0]} rotation={[boxParams.rotation, 0, 0]}>
      <meshNormalMaterial />
    </Box>
  )
}

const Scene = () => {
  const [dodeRotation, setDodeRotation] = useState(0)
  const [truckParams] = useState(() => ({ x: 0, z: 0, rotation: 0 }))

  useEffect(() => {
    // Example of using ScrollTrigger with the main scroll progress
    new ScrollTrigger({
      ...scrollerConfig,
      onUpdate: (trigger) => {
        const rotation = trigger.progress.toFixed(3) * 10
        setDodeRotation(-rotation)
      }
    })

    // Example of adjusting the start / end timing
    gsap.to(truckParams, {
      x: -Math.PI * 2,
      z: -Math.PI * 2,
      rotation: Math.PI * 2,
      repeat: 2,
      scrollTrigger: {
        ...scrollerConfig
      }
    })
  }, [truckParams])

  return (
    <>
      <group rotation={[0, Math.PI, 0]}>
        <Truck
          scale={[0.5, 0.5, 0.5]}
          position={[Math.cos(truckParams.x) * 1.5, -1.5, Math.sin(truckParams.z) * 1.5]}
          rotation={[0, truckParams.rotation, 0]}
        />
      </group>

      <Dodecahedron args={[1, 1, 1]} rotation={[0, dodeRotation, 0]}>
        <meshNormalMaterial wireframe={true} />
      </Dodecahedron>

      <FallingBox x={-2} start="0" />
      <FallingBox x={0} start="25%" />
      <FallingBox x={2} start="50%" />
    </>
  )
}

const App = () => {
  return (
    <>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 65 }}>
        <Suspense fallback={null}>
          <Stage intensity={0.3}>
            <Scene />
          </Stage>
        </Suspense>
      </Canvas>
      <Scroller progressBar={true} progressBarColor="hotpink" />
    </>
  )
}

export default App
