import React, {Component} from 'react'
import { searchVideos } from '../../api/youtube'

import VideoPreview from '../Preview'

import Autocomplete from 'react-google-autocomplete';


import './style.css'

class Body extends Component {

  state = {
    videoInfo: [],
    pageInfo: [],
    nextPageToken: '',
    prevPageToken: '',
    maxResults: 20,
    pageNumber: 1,
    query: ''
  }


  getVideos = (results, place) => {
    const { maxResults, query } = this.state
    let q = "surfing in " + query

    searchVideos({ maxResults, q })
      .then(this.receiveVideos)
      .then(
        this.setState({
          pageNumber: 1,
          query: ''
        })
      )
  }

  receiveVideos = ({ data }) => {
    const { nextPageToken, prevPageToken, pageInfo, items } = data

    this.setState({
      videoInfo: data.items,
      pageInfo: data.pageInfo.totalResults,
      nextPageToken: data.nextPageToken || null,
      prevPageToken: data.prevPageToken || null
    })
  }

  inputChange = (place) => {
    this.setState({
      query: place,
    })
  }

  nextPage = () => {
    const { maxResults, query, nextPageToken} = this.state
    let pageToken = nextPageToken
    let q = "surfing in " + query

    searchVideos({pageToken, q, maxResults})
      .then(this.receiveVideos)
      .then(this.setState({ pageNumber: this.state.pageNumber + 1 }))
      .then(window.scrollTo(0, 0))
  }

  lastPage = () => {
    const { maxResults, query, prevPageToken} = this.state
    let pageToken = prevPageToken
    let q = "surfing in " + query

    searchVideos({pageToken, query, maxResults})
      .then(this.receiveVideos)
      .then(this.setState({ pageNumber: this.state.pageNumber - 1 }))
      .then(window.scrollTo(0, 0))
  }

  pageAmount = () => {
    let totalResults = this.state.pageInfo
    let pageTotal = totalResults/this.state.maxResults
    return Math.floor(pageTotal)
  }

  onSelectMax = event => {
    this.setState({maxResults: event.target.value})
    this.getVideos()
  }

  render(){
    const {query, videoInfo, pageNumber, prevPageToken, nextPageToken, maxResults} = this.state
    return(
      <div className="container">
        <p>Pick a place to check out the surf videos!</p>
        <Autocomplete
          className="effect-1"
          placeholder="Surf Destination"
          types={['(regions)']}
          onPlaceSelected={(place) => {
            this.inputChange(place.name)
            console.log(place)
          }}
        />
        <button onClick={this.getVideos} disabled={!query}>Submit</button>
        <div className="video-container">
          <div className="preview-container">
            {videoInfo.map((video, i) => <VideoPreview {...video} key={i}/>)}
          </div>
          {!!videoInfo.length &&
            <div className="btn-container">
                <button onClick={this.lastPage} disabled={!prevPageToken}>Previous</button>
                <div className="page-info">
                  <p>Page: {pageNumber} / {this.pageAmount()}</p>
                  <div className="page-info__select">
                    <p>Videos Per Page:</p>
                    <select value={maxResults} onChange={this.onSelectMax}>
                      <option value="20" default>20</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                </div>
                <button onClick={this.nextPage} disabled={!nextPageToken}>Next</button>
            </div>
          }
        </div>
      </div>
    );
  }

}

export default Body;