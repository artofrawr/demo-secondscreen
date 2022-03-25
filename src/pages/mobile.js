import { useState, useCallback } from 'react'
import { Box, Text, Input } from '@chakra-ui/react'
import useSocket from 'components/socket/useSocket'
import Button from 'components/demo/Button'

const MobilePage = () => {
  const [inputValue, setInputValue] = useState('')
  const [time, setTime] = useState('0:00')
  const secondsToTime = useCallback((sec) => {
    const mins = Math.floor(sec / 60)
    const secs = Math.floor(sec - mins * 60)
    setTime(`${mins}:${secs < 10 ? '0' : ''}${secs}`)
  }, [])
  const onMessage = useCallback(
    (data) => {
      switch (data.type) {
        case 'time':
          secondsToTime(data.value)
          break
        default:
          break
      }
    },
    [secondsToTime]
  )
  const {
    connected,
    handshake,
    handshakeDenied,
    sendMessage,
    requestHandshake,
    disconnect,
    connect,
  } = useSocket('mobile', onMessage)

  return (
    <Box pt="50px" maxWidth="300px">
      {!connected && (
        <>
          <Text fontSize="24px" fontWeight={700} pb="15px">
            Disconnected
          </Text>
          <Button m="10px" w="130px" justifyContent="center" onClick={connect}>
            CONNECT
          </Button>
        </>
      )}
      {connected && !handshake && (
        <Box textAlign="center">
          {!handshakeDenied && (
            <Text fontSize="16px">
              To connect to the other device, enter its unique id:
            </Text>
          )}
          {handshakeDenied && (
            <>
              <Text fontSize="24px" fontWeight={700} pb="15px">
                Connection failed.
              </Text>
              <Text fontSize="16px" lineHeight="1.2">
                Please make sure you entered the correct id of a device that is
                waiting to be paired.
              </Text>
            </>
          )}
          <Input
            placeholder="XXXXX"
            size="lg"
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
            fontFamily="Roboto"
            fontSize="24px"
            textAlign="center"
            mt="30px"
            mb="10px"
            border="2px solid"
            borderRadius="0"
            value={inputValue}
            _hover={{
              borderColor: 'black',
            }}
          />

          <Button
            width="100%"
            justifyContent="center"
            onClick={() => requestHandshake(inputValue)}
          >
            Connect
          </Button>
        </Box>
      )}

      {connected && handshake && (
        <Box textAlign="center">
          <Text fontSize="24px" fontWeight={700} pb="15px">
            You&apos;re connected!
          </Text>
          <Text py="15px" fontSize="16px">
            {time}
          </Text>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <Button
              m="10px"
              w="130px"
              justifyContent="center"
              onClick={() => sendMessage({ type: 'play', value: true })}
            >
              PLAY
            </Button>
            <Button
              m="10px"
              w="130px"
              justifyContent="center"
              onClick={() => sendMessage({ type: 'play', value: false })}
            >
              PAUSE
            </Button>
            <Button
              m="10px"
              w="130px"
              justifyContent="center"
              onClick={() => sendMessage({ type: 'bassline' })}
            >
              GOTO BASS
            </Button>
            <Button
              m="10px"
              w="130px"
              justifyContent="center"
              onClick={disconnect}
            >
              DISCONNECT
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default MobilePage
