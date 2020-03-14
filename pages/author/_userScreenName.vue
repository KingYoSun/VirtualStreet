<template>
  <div class="container">
    <div class="author-card-big-container" :style="'display:' + cssDisplay + ';'">
      <author-card-big ref="authorCardBig" :author="author" />
    </div>
    <div>
      <tweets-list-user :user-screen-name="$route.params.userScreenName" />
    </div>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import AuthorCardBig from '~/components/parts/author/authorCardBig.vue'
import TweetsListUser from '~/components/tweetsListUser.vue'

export default {
  name: 'Author',
  layout: 'default',
  components: {
    AuthorCardBig,
    TweetsListUser
  },
  data () {
    return {
      title: '',
      cssDisplay: 'none',
      author: {
        type: Object,
        default () {
          return {
            user_screen_name: '',
            user_name: '',
            user_profile_banner: '',
            user_profile_description: '',
            user_profile_follow_count: 0,
            user_profile_follower_count: 0,
            user_profile_image: '',
            user_profile_url: ''
          }
        }
      }
    }
  },
  mounted () {
    this.loadAuthorData()
  },
  methods: {
    loadAuthorData () {
      const AuthorQuery = `query getUser {
        getTweet2rekognitionUser(user_screen_name: "${this.$route.params.userScreenName}"){
          user_screen_name
          user_name
          user_profile_banner
          user_profile_description
          user_profile_follow_count
          user_profile_follower_count
          user_profile_image
          user_profile_url
        }
      }`
      API.graphql(graphqlOperation(AuthorQuery))
        .then((response) => {
          this.author = response.data.getTweet2rekognitionUser
          this.title = response.data.getTweet2rekognitionUser.user_name
          this.cssDisplay = 'block'
        })
    }
  },
  head () {
    return {
      title: this.title + 'さんのスナップ一覧 | VRCSnap!',
      meta: [
        {
          hid: 'description', name: 'description', content: this.title + 'さんのスナップ一覧 | VRCSnap!'
        }
      ]
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  margin-top: 20px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
