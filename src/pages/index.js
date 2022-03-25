import { Box, Text } from '@chakra-ui/react'
import { IconDesktop, IconMobile } from 'components/icons'
import FeatureBlock from 'components/intro/FeatureBlock'
import IntroButton from 'components/intro/IntroButton'

const Home = () => (
  <>
    {/* Headline */}
    <Text as="h2" fontWeight={700} fontSize="34px" pt="50px" pb="30px">
      Second Screen Demo
    </Text>

    {/* Desktop vs Mobile Selection */}
    <Box display="flex" width="100%">
      <IntroButton label="Click To Open On Desktop" href="/desktop" width="50%">
        <IconDesktop />
      </IntroButton>
      <IntroButton label="Click To Open On Mobile" href="/mobile" width="50%">
        <IconMobile />
      </IntroButton>
    </Box>

    {/* Copy Block */}
    <Box>
      <Text
        as="h2"
        textAlign="center"
        fontWeight={700}
        fontSize="34px"
        pt="60px"
        pb="30px"
        lineHeight="1.2"
      >
        The Concept Of <br />
        Second Screen Experiences
      </Text>
      <Text
        as="p"
        textAlign="left"
        fontWeight={400}
        fontSize="16px"
        lineHeight="1.2"
      >
        This demo showcases the concept of a second screen experience,
        implemented with Next.js and socket.io. After opening the demo
        simultaneously on two separate devices, the devices can connect and
        exchange information in realtime. There&apos;s a wide spectrum of
        different use cases for second screen applications, including, but not
        limited to:
      </Text>
      <Text
        as="ul"
        textAlign="left"
        fontWeight={400}
        fontSize="16px"
        lineHeight="1.2"
      >
        <FeatureBlock label="Example: Makeshift Input Device">
          Multiple users in an airport lobby can use their mobile devices to
          connect to a website that is displayed on a big screen. They can then
          use their mobile devices as game controllers and play a game against
          each other on the big screen, while they wait for their flight.
        </FeatureBlock>
        <FeatureBlock label="Example: Displaying Additional Information">
          While playing a computer game, the second screen displays a realtime
          map to the player, helping with navigation inside the game.
        </FeatureBlock>
        <FeatureBlock label="Example: Access To Social Content">
          While watching the presidential debate, the second screen displays
          relevant social media streams and allows the user to participate in a
          conversation about the debate (e.g. posting to twitter, participating
          in real time voting, etc.)
        </FeatureBlock>
      </Text>
    </Box>
  </>
)

export default Home
