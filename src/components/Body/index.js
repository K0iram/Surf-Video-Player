import React, {Component} from 'react'
import { searchVideos } from '../../api/youtube'
// Preview component for show results
import VideoPreview from '../Preview'
// Google maps api autocomplete component
import Autocomplete from 'react-google-autocomplete'
import VideoModal from '../Modal'

import './style.css'

class Body extends Component {

  state = {
    videoInfo: [],
    nextPageToken: '',
    prevPageToken: '',
    maxResults: 20,
    query: '',
    modalOpen: false,
    currentVideoId: '',
    currentVideoTitle: ''
  }

  getVideos = (results, place) => {
    const { maxResults, query } = this.state
    let q = "surfing in " + query

    searchVideos({ maxResults, q })
    .then(this.receiveVideos)
  }

  receiveVideos = ({ data }) => {
    const { nextPageToken, prevPageToken, items } = data

    this.setState({
      videoInfo: items,
      nextPageToken: nextPageToken || null,
      prevPageToken: prevPageToken || null
    })
  }

  nextPage = () => {
    const { maxResults, query, nextPageToken} = this.state
    let pageToken = nextPageToken
    let q = "surfing in " + query

    searchVideos({pageToken, q, maxResults})
    .then(this.receiveVideos)
    .then(window.scrollTo(0, 0))
  }

  lastPage = () => {
    const { maxResults, query, prevPageToken} = this.state
    let pageToken = prevPageToken
    let q = "surfing in " + query

    searchVideos({pageToken, q, maxResults})
    .then(this.receiveVideos)
    .then(window.scrollTo(0, 0))
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

  openModal = ({ snippet, id }) => {
    const { title } = snippet
    const { videoId } = id
    this.setState({
      modalOpen: true,
      currentVideoId: videoId,
      currentVideoTitle: title
    })
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  onSelectMax = event => {
    this.setState({maxResults: event.target.value}, this.getVideos())
  }

  render(){
    const {
      query,
      videoInfo,
      prevPageToken,
      nextPageToken,
      maxResults,
      modalOpen,
      currentVideoTitle,
      currentVideoId
    } = this.state
    return(
      <div className="container">
        <p>Pick a place to check out the surf videos!</p>
        <Autocomplete
          className="autocomplete-effect"
          placeholder="Surf Destination"
          onPlaceSelected={(place) => {
            this.selectPlace(place.name)
          }}
          types={['geocode']}
          onChange={this.inputChange}
        />
        <button onClick={this.getVideos} disabled={!query}>Submit</button>
        <div className="video-container">
          <div className="preview-container">
            {videoInfo.map((video, i) =>
              <div classname="preview-container__preview" onClick={() => this.openModal(video)} key={i}>
                <VideoPreview {...video}/>
              </div>
            )}
          </div>
          {!!videoInfo.length &&
            <div className="btn-container">
                <button onClick={this.lastPage} disabled={!prevPageToken}>Previous</button>
                  <div className="page-info__select">
                    <p>Videos Per Page:</p>
                    <select value={maxResults} onChange={this.onSelectMax}>
                      <option value="20" default>20</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                <button onClick={this.nextPage} disabled={!nextPageToken}>Next</button>
            </div>
          }
        </div>
        <VideoModal vidUrl={`https://www.youtube.com/embed/${currentVideoId}`} videoTitle={currentVideoTitle} closeModal={this.closeModal} modalOpen={modalOpen}/>
      </div>
    );
  }

}

export default Body;