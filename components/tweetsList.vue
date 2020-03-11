<template>
  <div>
    <div class="tweet-list">
      <div v-for="(tweet, $index) in tweets" :id="'tweet-container-' + tweet.id" :key="$index">
        <embed-tweet :tweet="tweet" :now-unix="nowUnix" />
      </div>
    </div>
    <client-only>
      <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler" />
    </client-only>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { API, graphqlOperation } from 'aws-amplify'
import EmbedTweet from '~/components/parts/tweet.vue'

const date = new Date()
const nowUnix = Math.floor(date.getTime() / 1000)
const year = date.getUTCFullYear()
const month = date.getUTCMonth() + 1
const lastMonth = year + '-' + date.getUTCMonth() + '-00 00:00:00 UTC'
const lastMonthUnix = Date.parse(lastMonth) / 1000
const day = date.getUTCDate()
const today = year + '-' + month + '-' + day + ' 00:00:00 UTC'
const todayUnix = Date.parse(today) / 1000

export default {
  name: 'TweetsList',
  components: {
    EmbedTweet,
    InfiniteLoading
  },
  data () {
    return {
      page: 1,
      tweets: [],
      nextToken: null,
      searchDay: todayUnix,
      nowUnix,
      infiniteId: 0
    }
  },
  mounted () {
    this.infiniteId += 1
  },
  methods: {
    infiniteHandler ($state) {
      try {
        if (this.nextToken) {
          this.nextToken = `"${this.nextToken}"`
        } else if (this.page > 1) {
          this.searchDay -= 86400
        } else if (this.searchDay <= lastMonthUnix) {
          $state.complete()
        }
        if (this.tweets.length > 20) {
          $state.complete()
        }
        const TweetsListQuery = `query list {
          listTweet2rekognitions(updated_at_date: ${this.searchDay}, limit: 10, nextToken: ${this.nextToken}) {
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
            }
            nextToken
          }
        }`
        API.graphql(graphqlOperation(TweetsListQuery))
          .then((response) => {
            this.page += 1
            for (const item of response.data.listTweet2rekognitions.items) {
              if (this.tweets.find(element => element.id === item.id) === undefined) {
                this.tweets.push(item)
              }
            }
            this.nextToken = response.data.listTweet2rekognitions.nextToken
            $state.loaded()
          })
      } catch (e) {
        $state.complete()
      }
    }
  }
}
</script>

<style>
.tweet-list {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 20px;
}
</style>
