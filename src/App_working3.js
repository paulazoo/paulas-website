import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stage, Box, Dodecahedron, Points, PointMaterial, Text } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'


import gsap, { Power3 } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import Scroller, { scrollerConfig } from './Scroller'

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
        <Box
          scale={[0.5, 0.5, 0.5]}
          position={[Math.cos(truckParams.x) * 1.5, -1.5, Math.sin(truckParams.z) * 1.5]}
          rotation={[0, truckParams.rotation, 0]}
        />
      </group>

      <Dodecahedron args={[1, 1, 1]} rotation={[0, dodeRotation, 0]}>
        <meshNormalMaterial wireframe={true} />
      </Dodecahedron>

      <Caption x={-2} start="25%" />
      <FallingBox x={0} start="25%" />
      <FallingBox x={2} start="50%" />
    </>
  )
}

const App = () => {
  return (
    <>
      <Canvas shadows dpr={[1, 2]}
    camera={{ position: [0, 0, -2] }}
    style={{
       backgroundColor: '#111a21',
       width: '100vw',
       height: '100vh',}}>
        <Suspense fallback={null}>
          <Stage intensity={0.3}>
            <Scene />
          </Stage>
        </Suspense>
      </Canvas>
      <Scroller progressBar={false} progressBarColor="hotpink" />
    </>
  )
}

export default App



function Stars(props) {
    const ref = useRef()
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))
  
    useFrame((state, delta) => {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    })
    
    return (
      <group>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
          <PointMaterial transparent color="#ffa0e0" size={0.005} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
    )
  }



  const Captionoo = ({ start = 0, children=children }) => {
    const { width } = useThree((state) => state.viewport)
    const [captionParams] = useState(() => ({ y: 2, rotation: 0 }))
    useEffect(() => {
        gsap.to(captionParams, {
          y: 2,
          rotation: Math.PI * 4,
          ease: Power3.easeInOut,
          scrollTrigger: {
            ...scrollerConfig,
            start: start,
            end: '90%'
          }
        })
      }, [captionParams, start])
  
      
    return (
      <Text
        position={[0, captionParams.y, 0]}
        rotation={[captionParams.rotation, 0, 0]}
        lineHeight={0.8}
        font="/Ki-Medium.ttf"
        fontSize={width / 8}
        material-toneMapped={false}
        anchorX="center"
        anchorY="middle">
        {children}
      </Text>
    )
  }

  const Caption = ({ x = 0, start = 0 }) => {
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