import React, { Suspense, useEffect
 } from 'react'
import { Canvas, useFrame} from '@react-three/fiber'
import RedCityObject from './RedCityObject'
import styled, { createGlobalStyle } from 'styled-components'
import * as THREE from 'three'
import AboutText from './AboutText'

export const Page = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  & > h1 {
    font-family: 'Roboto', sans-serif;
    font-weight: 900;
    font-size: 8em;
    margin: 0;
    color: white;
    line-height: 0.59em;
    letter-spacing: -2px;
  }
  @media only screen and (max-width: 1000px) {
    & > h1 {
      font-size: 5em;
      letter-spacing: -1px;
    }
  }
  & > a {
    margin: 0;
    color: white;
    text-decoration: none;
  }
`

export const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
  }
  #root {
    overflow: auto;
  }
  body {
    position: fixed;
    overflow: hidden;
    overscroll-behavior-y: none;
    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
    color: black;
    background: #171717;
  }
`

export default function CityAbout() {

  return (
    <>
      <Global />
      <Canvas style={{ background: '#cc7b32' }} camera={{ position: [0, 75, -100], fov: 20, rotation:[0,0,0] }}>
        <Scene>
        </Scene>
      </Canvas>
      <AboutText/>
    </>
  )
}

const Scene = () => {
  const vec = new THREE.Vector3()

  useFrame((state, delta) => {
      state.camera.lookAt(vec.set(state.camera.position.x,state.camera.position.y, state.camera.position.z+10))
      state.camera.position.lerp(vec.set(0, 0, -100), 0.005)
      state.camera.updateProjectionMatrix()
      return null;
  })

  return (
    <>
      <fog attach="fog" args={['#cc7b32', 0, 500]} />
      <Suspense fallback={null}>
        <RedCityObject />
      </Suspense>
    </>
  )
}