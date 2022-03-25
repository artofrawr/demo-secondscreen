import { Box } from '@chakra-ui/react'
import Link from 'next/link'
import { node, string } from 'prop-types'

const FooterButton = ({ href, children, ...other }) => {
  const isInternal = href.startsWith('/')

  const rendered = (
    <Box
      as="a"
      href={!isInternal ? href : null}
      fontFamily="Roboto, sans-serif"
      border="2px solid black"
      padding="0 20px"
      fontWeight={500}
      fontSize="16px"
      height="44px"
      display="flex"
      alignItems="center"
      {...other}
      _hover={{
        bg: 'black',
        color: 'white',
      }}
    >
      {children}
    </Box>
  )

  if (isInternal) {
    return (
      <Link href={href} passHref>
        {rendered}
      </Link>
    )
  }

  return rendered
}

FooterButton.propTypes = {
  href: string.isRequired,
  children: node.isRequired,
}

export default FooterButton
