<template>
  <div>
    <div>VRCSnap!</div>
    <div v-for="(tweet, $index) in tweets" :key="$index">
      <p :id="tweet.id">tweetID: {{ tweet.id }}</p>
    </div>
    <client-only>
      <infinite-loading @infinite="infiniteHandler">
        <div slot="no-result">No result!</div>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import InfiniteLoading from 'vue-infinite-loading'

const date = new Date()
const year = date.getUTCFullYear()
const month = date.getUTCMonth() + 1
const day = date.getUTCDate()
const today = year + '-' + month + '-' + day + ' 00:00:00 UTC'
const todayUnix = Date.parse(today) / 1000

export default {
  name: 'TweetsList',
  component: {
    InfiniteLoading
  },
  data () {
    return {
      page: 1,
      loading: false,
      tweets: [],
      nextToken: null,
      searchDay: todayUnix
    }
  },
  methods: {
    infiniteHandler ($state) {
      try {
        if (!this.nextToken && this.page > 1) {
          this.searchDay -= 86400
        }
        if (this.nextToken) {
          this.nextToken = `"${this.nextToken}"`
        }
        const TweetsListQuery = `query list {
          listTweet2rekognitions(updated_at_date: ${this.searchDay}, limit: 20, nextToken: ${this.nextToken}) {
            items {
              id
              user_screen_name
              img
            }
            nextToken
          }
        }`
        API.graphql(graphqlOperation(TweetsListQuery))
          .then((response) => {
            this.page += 1
            for (const item of response.data.listTweet2rekognitions.items) {
              this.tweets.push(item)
            }
            this.nextToken = response.data.listTweet2rekognitions.nextToken
            $state.loaded()
          })
      } catch (e) {
        console.log(e)
        $state.complete()
      }
    }
  }
}
</script>
