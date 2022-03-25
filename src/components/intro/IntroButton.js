import Link from 'next/link'
import { Box } from '@chakra-ui/react'
import { string, node } from 'prop-types'
import styled from '@emotion/styled'

const StyledBox = styled(Box)`
  box-sizing: border-box;
  padding: 5%;
  color: black;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);

  svg {
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    width: 100%;
    transform: scale(0.9);

    .st0 {
      transition: stroke 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      fill: none;
      stroke: black;
      stroke-width: 4;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-miterlimit: 10;
    }

    .st1 {
      transition: fill 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      fill: black;
    }
  }

  span {
    display: block;
    text-align: center;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.01em;
    line-height: 1.2;
    transform: translateY(30%);
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &:hover {
    background: black;
    color: white;
    svg {
      transform: scale(1);
      .st0 {
        stroke: white;
      }
      .st1 {
        fill: white;
      }
    }
    span {
      transform: translateY(0%);
    }
  }
`

const IntroButton = ({ href, label, children, ...other }) => (
  <Link href={href} passHref>
    <StyledBox as="a" {...other}>
      {children}
      <span>{label}</span>
    </StyledBox>
  </Link>
)

IntroButton.propTypes = {
  href: string.isRequired,
  label: string.isRequired,
  children: node.isRequired,
}

export default IntroButton
