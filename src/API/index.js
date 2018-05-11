import axios from 'axios'
import { API_BASE, API_KEY } from '../constants'

const DEFAULT_OPTIONS = {
  key: API_KEY
}

export const YouTubeAPI = axios.create({
  baseURL: API_BASE,
  params: DEFAULT_OPTIONS
})