import React, { Suspense, useState, setState, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree} from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Stage, Box, Dodecahedron, Points, PointMaterial, Text } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

import * as random from 'maath/random/dist/maath-random.esm'
import styled, {keyframes} from 'styled-components';
import {Button} from '@mui/material';

import gsap, { Power3 } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import Scroller, { scrollerConfig } from './Scroller'

const Scene = () => {
  const [dodeRotation, setDodeRotation] = useState(0)
  const vec = new THREE.Vector3()

  useFrame(state => {
    state.camera.lookAt(vec.set(state.camera.position.x,state.camera.position.y, state.camera.position.z+10))
     // state.camera.position.lerp(vec.set(0,0,-1), .1)
     state.camera.position.lerp(vec.set(state.mouse.x / 2, state.mouse.y / 2, -1), 0.05)
      state.camera.updateProjectionMatrix()
      return null;
  })

  useEffect(() => {
    new ScrollTrigger({
      ...scrollerConfig,
      onUpdate: (trigger) => {
        const rotation = trigger.progress.toFixed(3) * 10
        setDodeRotation(-rotation)
      }
    })

  }, [])

  return (
    <>
      <Caption start={'5%'} end={'70%'}
      startY={0} endY={2}
      startOpacity={1} endOpacity={0}
      >{`Hi, I'm Paula Zhu\n\nThis is my website`}</Caption>
      <Caption start={'40%'} end={'100%'} 
      startY={-1} endY={0}
      startOpacity={0} endOpacity={1}>{`here's some cool threeJS + gsap :)`}</Caption>
      <Thing/>
        <EffectComposer multisampling={8}>
          <Bloom kernelSize={3} luminanceThreshold={1} luminanceSmoothing={0.4} intensity={0.6} />
          <Bloom kernelSize={2} luminanceThreshold={1} luminanceSmoothing={0} intensity={0.5} />
        </EffectComposer>
    </>
  )
}

const MainMobile = () => {
  const parentRef = useRef()

  return (
    <div id="parentRef" ref={parentRef}>
      <Canvas shadows dpr={[1, 2]}
      camera={{position: [0, 0, -1], fov:100, rotation:[0,0,0]}}
        style={{
       backgroundColor: '#111a21',
       width: '100vw',
       height: '100vh',}}
       eventSource={parentRef}>
       <Stars start={'40%'} end={'90%'}/>
        <Suspense fallback={null}>
          <Stage intensity={0.3}>
            <Scene />
          </Stage>
        </Suspense>
      </Canvas>
        <Warning>{`btw this website's graphics are way better on desktop :)`}</Warning>
      <Scroller progressBar={false} progressBarColor="lightblue" />
    </div>
  )
}

export const Warning = styled.i`
  opacity: 1;
  position: absolute;
  top: 20px;
  left: 20px;
  fontSize: 13px;
  color: white;
}`

export default MainMobile



function Stars({start, end, ...props}) {
    const pointsRef = useRef()
    const [sphere] = useState(() => random.inSphere(new Float32Array(200), { radius: 1.5 }))
    const [pointsParams] = useState(() => ({ z:0, y:0, opacity:1}))
  
    useFrame((state, delta) => {
      pointsRef.current.rotation.x -= delta / 10
      pointsRef.current.rotation.y -= delta / 15
      pointsRef.current.position.z = pointsParams.z
      pointsRef.current.position.y = pointsParams.y
      pointsRef.current.opacity = pointsParams.opacity
    })
    
    useEffect(() => {
        // Example of using ScrollTrigger with GSAP to update properties w/ controlled start/end times
        gsap.to(pointsParams, {
           z:0,
           y:4,
           opacity:0,
          ease: Power3.easeInOut,
          scrollTrigger: {
            ...scrollerConfig,
            start: start,
            end: end
          }
        })
      }, [start, end, pointsParams])

    return (
      <group>
        <Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false}>
          <PointMaterial 
          transparent 
          emissive={"blue"}
          size={0.005} sizeAttenuation={true} depthWrite={false} 
          emissiveIntensity={2} toneMapped={false} />
        </Points>
      </group>
    )
  }



  const Caption = ({ start = '10%', end='50%', startY=1, endY=10, startOpacity=1, endOpacity=1, children }) => {
    const [captionParams, setCaptionParams] = useState(() => ({ x:0, z:0, y: 0, opacity: startOpacity }))
  
    useEffect(() => {
        setCaptionParams({ x:0, z:0, y: startY, opacity: startOpacity })
    }, [])

    useEffect(() => {
      // Example of using ScrollTrigger with GSAP to update properties w/ controlled start/end times
      gsap.to(captionParams, {
        x:0,
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
        position={[captionParams.x, captionParams.y, captionParams.z]}
        rotation={[0,Math.PI,0]}
          size={50}
          height={50}>
          {children}
          <meshBasicMaterial color={[1, 1, 1]} toneMapped={true} attach="material" opacity={captionParams.opacity}/>
        </Text>
    )
  }

  const Thing = ({ start = '80%', end='100%', startY=-2, endY=-1, startOpacity=0, endOpacity=1, ...props }) => {
    const [thingParams, setThingParams] = useState(() => ({ x:0, z:0, y: 0, opacity: 0 }))
    const dodRef = useRef()

    useFrame((state, delta) => {
      dodRef.current.rotation.x -= delta / 3
      dodRef.current.rotation.y -= delta / 1
    })

    useEffect(() => {
        setThingParams({ x:-2, z:2, y: startY, opacity: startOpacity })
    }, [])

    useEffect(() => {
      // Example of using ScrollTrigger with GSAP to update properties w/ controlled start/end times
      gsap.to(thingParams, {
        x:-2,
        y: endY,
        z:2,
        opacity: endOpacity,
        ease: Power3.easeInOut,
        scrollTrigger: {
          ...scrollerConfig,
          start: start,
          end: end
        }
      })
    }, [thingParams, start, end, endY, endOpacity])
  
    return (
      <group >
        <Dodecahedron
      ref={dodRef}
        position={[thingParams.x, thingParams.y, thingParams.z]}>
        <meshStandardMaterial attach="material" 
        transparent={true}
        opacity={thingParams.opacity}
        wireframe={true}
        emissive="cyan" emissiveIntensity={3} toneMapped={false} />
        </Dodecahedron>
        </group>
    )
  }

