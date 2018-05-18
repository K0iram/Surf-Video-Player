import React from 'react'


import './style.css'


const VideoPreview  = ({ snippet, id}) => {
  const { title, thumbnails, description } = snippet
  const { videoId } = id

  return (
    <div className="youtube-container">
      <figure className="youtube-container__image">
        <img src={thumbnails.medium.url} alt={description}/>
      </figure>
      <div className="youtube-container__description">
        <p>{title}</p>
      </div>
    </div>
  )
}


export default VideoPreview