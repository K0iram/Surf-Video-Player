import React, {Component} from 'react'
import moment from 'moment'


import './style.css'

const API = 'AIzaSyBeimXtjgzfQcogY-fP8_CHPybmLpFaieo'
const channelID = 'UCEUdKX-Okq_HhKV--7uuZnA'
const maxResults = 50

let URL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${maxResults}`

class Body extends Component {

	state = {
    videoInfo: [],
    videoUrl: []
  }

	componentDidMount() {
	  fetch(URL)
	    .then((response) => response.json())
	    .then((responseJson) => {
	      const info = responseJson.items.map(obj => obj.snippet);
	      const urls = responseJson.items.map(obj => "https://www.youtube.com/watch?v="+obj.id.videoId);
	      	this.setState({
	      	videoInfo: info,
	      	videoUrl: urls
	      	})
	      	console.log(info)
	    })
	    .catch((error) => {
	      console.error(error);
	    })
	}


  render(){
    return(
      <div className="video-container">
        {
          this.state.videoInfo.map((video, i) => {
            let videoImg = video.thumbnails.medium.url
            let videoName = video.title
            let videoDate = moment(video.publishedAt).startOf('day').fromNow(); 
            let videoLink = this.state.videoUrl.map((url) => {
            	return url
            })

            let youtubeVideo = 
              <div className="youtube-container" key={i}>
            		<a href={videoLink} target="_blank">
              		<img src={videoImg} alt="video thumbnail" className="youtube"/>
              		<div className="description">
                		<p className='youtube-title'>{videoName}</p>
                		<p className='youtube-date'>{videoDate}</p>
              		</div>
            		</a>
              </div>

            return youtubeVideo;
          })
        }
      	{this.youtubeVideo}
    	</div>
    );
  }

}

export default Body;