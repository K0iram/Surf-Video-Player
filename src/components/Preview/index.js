import React from 'react'

import './style.css'


const VideoPreview  = ({ snippet, id }) => {
  const { title, thumbnails, description } = snippet
  const { videoId } = id

  if(videoId === undefined) {
    return null
  } else {
    return (
      <div className="youtube-container">
        <figure className="youtube-container__image">
          <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank">
            <img src={thumbnails.medium.url} alt={description}/>
          </a>
        </figure>
        <div className="youtube-container__description">
          <p>{title}</p>
        </div>
      </div>
    )
  }
}


export default VideoPreview;
