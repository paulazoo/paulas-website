
import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Text } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

import gsap, { Power3 } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'




// HIHIHIHIHI




export default function App() {

  return (
    <div id='viewport'>
        <div id='content'>
    <Canvas shadows 
    camera={{ position: [0, 0, 1] }}
    style={{
       backgroundColor: '#111a21',
       width: '100vw',
       height: '200vh',
    }}>
      <Stars />
      <Caption>{`Hi, I'm Paula.\n\nThis is my website.`}</Caption>
    </Canvas>
    </div>
    </div>
  )
}




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





const Caption = ({ x = 0, start = 0, children=children }) => {
  const { width } = useThree((state) => state.viewport)
  const [captionParams] = useState(() => ({ y: 2, rotation: 0 }))

  return (
    <Text
      position={[x, captionParams.y, -5]}
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
