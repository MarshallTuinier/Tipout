import { keyframes } from 'styled-components'

const SlideLeft = keyframes`
  from {
    left: 100%;
  }

  to {
    left: 0%;
    opacity: 1;
  }
`

const SlideRight = keyframes`
  from {
    right: 100%;
  }

  to {
    right: 0%;
  }
`

const FadeIn = keyframes`
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
`

export { SlideLeft, SlideRight, FadeIn }
