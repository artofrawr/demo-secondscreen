import { useCallback, useRef, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import useSocket from 'components/socket/useSocket'
import Credits from 'components/demo/Credits'
import Instructions from 'components/demo/Instructions'

const DesktopPage = () => {
  const player = useRef()
  const [playing, setPlaying] = useState(false)
  const onMessage = useCallback((data) => {
    switch (data.type) {
      case 'play':
        if (data.value === true) {
          setPlaying(true)
        } else {
          setPlaying(false)
        }
        break
      case 'bassline':
        player.current.seekTo(33, 'seconds')
        setPlaying(true)
        break
      default:
        break
    }
  }, [])
  const { handshake, sendMessage, id } = useSocket('desktop', onMessage)

  const onProgress = useCallback(
    (state) => {
      if (handshake) {
        sendMessage({ type: 'time', value: state.playedSeconds })
      }
    },
    [handshake, sendMessage]
  )

  return (
    <>
      <Credits />
      <ReactPlayer
        ref={player}
        url="https://www.youtube.com/watch?v=kLZJ-0IP9bY"
        onProgress={onProgress}
        playing={playing}
        loop
        config={{
          youtube: {
            playerVars: { modestbranding: 1, controls: 0 },
          },
        }}
      />
      <Instructions handshake={handshake} id={id} />
    </>
  )
}

export default DesktopPage
