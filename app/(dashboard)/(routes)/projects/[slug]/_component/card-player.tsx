'use client'
import ReactPlayer from "react-player";

export const CardPlayer = async () => {

  const data = await "https://youtu.be/LFRLPSG4pzE"

  return (
    <ReactPlayer 
      url={data}
      controls={true} 
      width='100%'
      height='100%'
    />
  )
}
