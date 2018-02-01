import React, {Component} from 'react'
import API from '../../API'

import VideoPreview from '../Preview'


import './style.css'

class Body extends Component {

	state = {
    videoInfo: [],
    pageInfo: [],
    nextPageToken: '',
    prevPageToken: '',
    maxResults: 20,
    pageNumber: 1
  }

	componentDidMount() {
		this.fetchVideos()
	}

	fetchVideos = () => {
		const { maxResults } = this.state
	  API.fetchVideos(maxResults)
	  	.then((res) => {
	  		this.setState({ 
	  			videoInfo: res.data.items,
	  			pageInfo: res.data.pageInfo.totalResults,
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

	pageAmount = () => {
		let totalResults = this.state.pageInfo
		let pageTotal = totalResults/this.state.maxResults
		return Math.floor(pageTotal)
	}

	onSelectMax = event => {
		this.setState({maxResults: event.target.value})
		this.fetchVideos()
	}

  render(){
    return(
      <div className="video-container">
      	<div className="preview-container">
      		{this.state.videoInfo.map((video, i) => <VideoPreview {...video} key={i}/>)}
      	</div>
      	<div className="btn-container">
		      	<button onClick={this.getPrev} disabled={!this.state.prevPageToken}>Previous</button>
		      	<div className="page-info">
			      	<p>Page: {this.state.pageNumber} / {this.pageAmount()}</p> 
			      	<div className="page-info__select">
				      	<p>Videos Per Page:</p>
				      	<select value={this.state.maxResults} onChange={this.onSelectMax}>
				      	  <option value="20" default>20</option>
				      	  <option value="30">30</option>
				      	  <option value="40">40</option>
				      	  <option value="50">50</option>
				      	</select>
			      	</div>
		      	</div>
		      	<button onClick={this.getNext} disabled={!this.state.nextPageToken}>Next</button>
      	</div>
    	</div>
    );
  }

}

export default Body;