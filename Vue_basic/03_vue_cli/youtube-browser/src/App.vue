<template>
  <div>
    <!-- step no3 -->
    <SearchBar @inputChange="onInputChange"/>
    <VideoDetail :video="selectedVideo"/>
    <VideoList @selectVideo="onSelectVideo" :videos="videos" />
  </div>
</template>

<script>
import axios from 'axios'

// step no.1
import VideoList from './components/VideoList.vue'
import SearchBar from './components/SearchBar.vue'
import VideoDetail from './components/VideoDetail.vue'

const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY // Youtube
const API_URL = 'https://www.googleapis.com/youtube/v3/search'

// vue
export default {
  name: 'App', // Component 의 이름을 지정
  // step no2
  data() {
    return {
      videos: [],
      selectedVideo: null,
    }
  },

  components: {
    SearchBar: SearchBar,
    VideoList,
    VideoDetail,
  },
  
  methods: {
    // 우리의 inputChange 이벤트가 발생할 때마다
    onInputChange: function(inputValue){
      axios.get(API_URL, {
        params: {
          key: API_KEY,
          type: 'video',
          part: 'snippet',
          q: inputValue,
        }
      })
      .then(response => {
        this.videos = response.data.items
      })
      .catch(error => {
        console.error(error)
      })
    },
    onSelectVideo: function(video) {
      this.selectedVideo = video
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
