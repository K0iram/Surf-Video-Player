import React, {Component} from 'react'
import API from '../../API'

import VideoPreview from '../Preview'


import './style.css'

class Body extends Component {

	state = {
    videoInfo: [],
    nextPageToken: '',
    prevPageToken: '',
    maxResults: 20
  }

	componentDidMount() {
		const { maxResults } = this.state
	  API.fetchVideos(maxResults)
	  	.then((res) => {
	  		this.setState({ 
	  			videoInfo: res.data.items,
					nextPageToken: res.data.nextPageToken
	  		})
	  	})
	}

	getNext = () => {
		const {nextPageToken, maxResults} = this.state
		API.paginateVideos(nextPageToken, maxResults)
			.then((res) => {
				this.setState({ 
					videoInfo: res.data.items,
					nextPageToken: res.data.nextPageToken || null,
					prevPageToken: res.data.prevPageToken || null
				})
				window.scrollTo(0, 0);
			})
			.catch((err) => {
				console.error(err)
			})
	}
	
	getPrev = () => {
		const {prevPageToken, maxResults} = this.state
		API.paginateVideos(prevPageToken, maxResults)
			.then((res) => {
				this.setState({ 
					videoInfo: res.data.items,
					nextPageToken: res.data.nextPageToken,
					prevPageToken: res.data.prevPageToken
				})
				window.scrollTo(0, 0);
			})
			.catch((err) => {
				console.error(err)
			})
	}

  render(){
    return(
      <div className="video-container">
      	<div className="preview-container">
      		{this.state.videoInfo.map((video, i) => <VideoPreview {...video} key={i}/>)}
      	</div>
      	<div className="btn-container">
		      	<button className='prev-btn' onClick={this.getPrev}>Prev</button>
		      	<button onClick={this.getNext}>Next</button>
      	</div>
    	</div>
    );
  }

}

export default Body;