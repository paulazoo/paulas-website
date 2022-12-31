import { useRef, useEffect, useState } from 'react'
import styled, {keyframes} from 'styled-components';
import { gsap } from 'gsap'

export default function AboutText() {


  return (
    <AboutContainer>
      <TextContent>Hi, I'm Paula Zhu and I like to code random stuff sometimes.</TextContent>
      <br/>
      <br/>
      <TextContent>This is going to be the about page for this website. I'm going to put cool stuff I've found/built on here.</TextContent>
      <br/>
      <br/>
      <br/>
      <TextContent>
        I decided to learn about Three JS yesterday, so for now, this website is mainly about that. Three JS is a library for animated 3D computer graphics using WebGL.</TextContent>
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