import { useRef, useEffect, useState } from 'react'
import styled, {keyframes} from 'styled-components';
import { gsap } from 'gsap'

export default function AboutText() {


  return (
    <AboutContainer>
      <TextContent>Hi, I'm Paula and this is the about page.</TextContent>
      <br/>
      <br/>
      <TextContent>This website is about using React with Three JS, a library for animated 3D computer graphics using WebGL. I'm going to put cool stuff that I've found/built on here.</TextContent>
    </AboutContainer>
  )
}

export const TextContent = styled.b`
  opacity: 1;
  position: absolute;
  fontSize: 20px;
  color: white;
}
`

export const AboutContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 100px;
  transform: translate(-50%, -50%);
  width: 50vw;
}
`