<template>
  <div class="hot-container">
    <div v-for="(hotTweet, $index) in hotTweets" :id="'hot-tweet-' + hotTweet.id" :key="$index">
      <div>unchi</div>
    </div>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'

const date = new Date()
const nowUnix = Math.floor(date.getTime() / 1000)

export default {
  name: 'HotTweets',
  data () {
    return {
      hotTweets: [],
      nowUnix
    }
  },
  mounted () {
    this.getRateTweets()
  },
  methods: {
    getRateTweets () {
      const TweetsListQuery = `query getRateRanking {
        queryTweet2rekognitionRankingsByDivRateIndex(div: 1, limit: 5, nextToken: null){
          items {
            id
            user_name
            user_screen_name
            user_profile_image
            timestamp
            retweet
            favorite
            text
            img
            d_RT
            d_fav
            rate
          }
          nextToken
        }
      }`
      API.graphql(graphqlOperation(TweetsListQuery))
        .then((response) => {
          for (const item of response.data.queryTweet2rekognitionRankingsByDivRateIndex.items) {
            if (this.hotTweets.find(element => element.id === item.id) === undefined) {
              this.hotTweets.push(item)
            }
          }
        })
    }
  }
}
</script>
