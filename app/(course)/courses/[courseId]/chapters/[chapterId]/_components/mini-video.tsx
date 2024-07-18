import ReactPlayer from "react-player/lazy";

interface MiniVideoProps {
    playbackId: string;  // The playback ID from the YouTube API. For example, 'https://www.youtube.com/embed/dQw4w9WgXcQ'  // required
 
}

export const MiniVideo = ( {playbackId} : MiniVideoProps)  => {
  return (
    <ReactPlayer
        url={playbackId}
        controls={true} 
        width='100%'
        height='100%'
    />
  )
}
