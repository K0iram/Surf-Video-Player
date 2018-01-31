import React, {Component} from 'react'
import API from '../../API'

import VideoPreview from '../Preview'


import './style.css'

class Body extends Component {

	state = {
    videoInfo: [],
    nextPageToken: '',
    prevPageToken: '',
    maxResults: 20,
    pageNumber: 1
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
					prevPageToken: res.data.prevPageToken || null,
					pageNumber: this.state.pageNumber + 1
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
					prevPageToken: res.data.prevPageToken,
					pageNumber: this.state.pageNumber - 1
				})
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
		      	<button onClick={this.getPrev} disabled={!this.state.prevPageToken}>Previous</button>
		      	<p>Page: {this.state.pageNumber}</p>
		      	<button onClick={this.getNext} disabled={!this.state.nextPageToken}>Next</button>
      	</div>
    	</div>
    );
  }

}

export default Body;