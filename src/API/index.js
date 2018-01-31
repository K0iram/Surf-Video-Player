import axios from 'axios'
const API = {}

const apiKey = 'AIzaSyBeimXtjgzfQcogY-fP8_CHPybmLpFaieo'
const channelID = 'UCEUdKX-Okq_HhKV--7uuZnA'


API.fetchVideos = (maxResults) => {
  return axios.get(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${maxResults}`)
}

API.paginateVideos = (pageToken, maxResults) => {
  return axios.get(`https://www.googleapis.com/youtube/v3/search?pageToken=${pageToken}&key=${apiKey}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${maxResults}`)
}

export default API