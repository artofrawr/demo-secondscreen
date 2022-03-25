import { Text } from '@chakra-ui/react'
import { node, string } from 'prop-types'

const FeatureBlock = ({ label, children }) => (
  <li>
    <Text
      as="h3"
      textAlign="left"
      fontWeight={500}
      fontSize="16px"
      lineHeight="1.2"
      pt="20px"
    >
      {label}
    </Text>
    <p>{children}</p>
  </li>
)

FeatureBlock.propTypes = {
  label: string.isRequired,
  children: node.isRequired,
}

export default FeatureBlock
