import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import styled, {keyframes} from 'styled-components';
import {Button} from '@mui/material';
import {isMobile} from 'react-device-detect';

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const scrollerConfig = {
  scroller: '.scroll-container',
  trigger: '.scroll-height',
  start: 'top top',
  end: `100%`,
  scrub: true
}

export default function Scroller({ height = 10, progressBar = false, progressBarColor = '#fbf5ef' }) {
  const navigate = useNavigate();

  const scrollContainerRef = useRef()
  const scrollHeightRef = useRef()
  const [progress, setProgress] = useState(0)
  const multiplier = 1000

  const [scrolledYet, setScrolledYet] = useState(false)

  useEffect(() => {
    new ScrollTrigger({
      scroller: scrollContainerRef.current,
      trigger: scrollContainerRef.current,
      start: 'top top',
      end: () => `+=${height * multiplier - window.innerHeight}px`,
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress.toFixed(3) * 100)
        setScrolledYet(true)
      }
    })
  }, [height])
  
  if (isMobile) {
    return (
      <ScrollContainer className="scroll-container" ref={scrollContainerRef}>
        <ScrollTracker style={{ display: progressBar ? 'block' : 'none' }} $color={progressBarColor}>
          <ScrollProgress style={{ width: `${progress}%` }} $color={progressBarColor}></ScrollProgress>
        </ScrollTracker>
        <ScrollHeight className="scroll-height" ref={scrollHeightRef} $height={height * multiplier} />
        <Button
          onClick={() => navigate('/about')}
          variant='outlined'
          style={{position:'absolute', bottom:'50px',
          float:'right', right:'50px'}}
        >
          About
        </Button>
      </ScrollContainer>
      )
  } else {
    return (
      <ScrollContainer className="scroll-container" ref={scrollContainerRef}>
        {scrolledYet?null:<ScrollDown>Scroll Down</ScrollDown>}
        <ScrollTracker style={{ display: progressBar ? 'block' : 'none' }} $color={progressBarColor}>
          <ScrollProgress style={{ width: `${progress}%` }} $color={progressBarColor}></ScrollProgress>
        </ScrollTracker>
        <ScrollHeight className="scroll-height" ref={scrollHeightRef} $height={height * multiplier} />
        <Button
          onClick={() => navigate('/about')}
          variant='outlined'
          style={{bottom: '50px',
          float:'right', right:'50px'}}
        >
          About
        </Button>
      </ScrollContainer>
      )
  }
}

export const scrollDownAnimation = keyframes`
  0% { opacity: 0 }
  50% { opacity: 1 }
  100% { opacity: 0 }
`

export const ScrollDown = styled.b`
  opacity: 1;
  position: absolute;
  left: 50%;
  bottom: 30px;
  fontSize: 13px;
  color: white;
  animation-name: ${scrollDownAnimation};
  animation-duration: 4s;
  animation-iteration-count: infinite;
}
`

export const ScrollContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: calc(100% + 20px);
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 1;
  top: 0;
  left: 0;
`

export const ScrollTracker = styled.div`
  pointer-events: none;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  width: calc(80% - 50px);
  height: 15px;
  border-radius: 45px;
  border: 1px solid ${(props) => props.$color};
  overflow: hidden;
  opacity: 0.8;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
`

export const ScrollProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 10%;
  background: ${(props) => props.$color};
`

export const ScrollHeight = styled.div`
  background: transparent;
  height: ${(props) => props.$height}px;
  width: 0;
`
