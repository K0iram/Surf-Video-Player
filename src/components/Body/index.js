import React, {Component} from 'react'
import { searchVideos } from '../../api/youtube'

import VideoPreview from '../Preview'
import VideoModal from '../Modal'

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
    query: '',
    modalOpen: false
  }

  toggleModal = () => {
    debugger
    this.setState({modalOpen: !this.state.modalOpen})
  }


  getVideos = (results, place) => {
    const { maxResults, query } = this.state
    let q = "surfing in " + query

    searchVideos({ maxResults, q })
      .then(this.receiveVideos)
      .then(
        this.setState({
          pageNumber: 1
        })
      )
  }

  receiveVideos = ({ data }) => {
    const { nextPageToken, prevPageToken, pageInfo, items } = data

    this.setState({
      videoInfo: items,
      pageInfo: pageInfo.totalResults,
      nextPageToken: nextPageToken || null,
      prevPageToken: prevPageToken || null
    })
  }

  selectPlace = (place) => {
    this.setState({
      query: place,
    })
  }

  inputChange = (e) => {
      this.setState({
        query: e.target.value,
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

    searchVideos({pageToken, q, maxResults})
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
    const {query, videoInfo, pageNumber, prevPageToken, nextPageToken, maxResults, modalOpen} = this.state
    return(
      <div className="container">
        <p>Pick a place to check out the surf videos!</p>
        <Autocomplete
          className="effect-1"
          placeholder="Surf Destination"
          onPlaceSelected={(place) => {
            this.selectPlace(place.name)
            console.log(place)
          }}
          types={'geocode'}
          onChange={this.inputChange}
        />
        <button onClick={this.getVideos} disabled={!query}>Submit</button>
        <div className="video-container">
          <div className="preview-container">
            {videoInfo.map((video, i) => <VideoPreview toggleModal={this.toggleModal} {...video} key={i} modalOpen={modalOpen}/>)}
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