import React from 'react'
import VideoModal from '../Modal'

import './style.css'


const VideoPreview  = ({ snippet, id, toggleModal, modalOpen}) => {
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
      <VideoModal vidUrl={`https://www.youtube.com/embed/${videoId}`} videoTitle={title} description={description} closeModal={toggleModal} modalOpen={modalOpen}/>
    </div>
  )
}


export default VideoPreview