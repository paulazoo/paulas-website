import React, { Suspense, useState, setState, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Stage, Box, Dodecahedron, Points, PointMaterial, Text } from '@react-three/drei'
import * as THREE from 'three'

import * as random from 'maath/random/dist/maath-random.esm'

import gsap, { Power3 } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import Scroller, { scrollerConfig } from './Scroller'

const Scene = () => {
  const [dodeRotation, setDodeRotation] = useState(0)
  const [truckParams] = useState(() => ({ x: 0, z: 0, rotation: 0 }))
  const vec = new THREE.Vector3()

  useFrame(state => {
      state.camera.lookAt(vec.set(0,0,10))
      state.camera.position.lerp(vec.set(0,0,-1), .1)
      state.camera.updateProjectionMatrix()
      return null;
  })

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
      <Caption start={'5%'} end={'50%'}
      startY={1} endY={5}
      startOpacity={1} endOpacity={0}
      >{`Hi, I'm Paula\n\nThis is my website`}</Caption>
      <Caption start={'50%'} end={'100%'} 
      startY={0} endY={1}
      startOpacity={0} endOpacity={1}>{`here's some threejs+gsap :)`}</Caption>
    </>
  )
}

const App = () => {
  return (
    <>
      <Canvas shadows dpr={[1, 2]}
      camera={{position: [0, 0, -1], fov:100, rotation:[0,0,0]}}
        style={{
       backgroundColor: '#111a21',
       width: '100vw',
       height: '100vh',}}>
       <Stars/>
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
          <PointMaterial transparent color="#ffffff" size={0.005} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
    )
  }



  const Caption = ({ start = '10%', end='50%', startY=1, endY=10, startOpacity=1, endOpacity=1, children }) => {
    const [captionParams, setCaptionParams] = useState(() => ({ z:0, y: startY, opacity: startOpacity }))
  
    useEffect(() => {
        setCaptionParams({ z:0, y: startY, opacity: startOpacity })
    }, [])

    useEffect(() => {
      // Example of using ScrollTrigger with GSAP to update properties w/ controlled start/end times
      gsap.to(captionParams, {
        y: endY,
        z:0,
        opacity: endOpacity,
        ease: Power3.easeInOut,
        scrollTrigger: {
          ...scrollerConfig,
          start: start,
          end: end
        }
      })
    }, [captionParams, start, end, endY, endOpacity])
  
    return (
        <Text
        position={[0, captionParams.y, captionParams.z]}
        rotation={[0,Math.PI,0]}
          size={50}
          height={50}
          material-toneMapped={false}>
          {children}
          <meshStandardMaterial attach="material" opacity={captionParams.opacity}/>
        </Text>
    )
  }

