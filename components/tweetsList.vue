<template>
  <div>
    <div class="select-sortType">
      <sort-type-tweets :sort-type="sortType" />
    </div>
    <div class="tweet-list">
      <div v-for="(tweet, $index) in tweets" :id="'tweet-container-' + tweet.id" :key="$index">
        <embed-tweet :tweet="tweet" :now-unix="nowUnix" />
      </div>
    </div>
    <client-only>
      <infinite-loading ref="infiniteLoading" :identifier="infiniteId" @infinite="infiniteHandler" />
    </client-only>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { API, graphqlOperation } from 'aws-amplify'
import EmbedTweet from '~/components/parts/tweet.vue'
import SortTypeTweets from '~/components/parts/sortTypeTweets.vue'

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
    SortTypeTweets,
    InfiniteLoading
  },
  data () {
    return {
      page: 1,
      tweets: [],
      nextToken: null,
      searchDay: todayUnix,
      nowUnix,
      infiniteId: 0,
      sortType: 'Latest'
    }
  },
  mounted () {
    this.infiniteId += 1
  },
  methods: {
    updateSortType (sortType) {
      this.sortType = sortType
      this.tweets = []
      this.nextToken = null
      this.page = 0
      this.$refs.infiniteLoading.stateChanger.reset()
      this.infiniteId += 1
    },
    infiniteHandler ($state) {
      switch (this.sortType) {
        case 'dRT':
          this.getDRTTweets($state)
          break
        case 'dFav':
          this.getDFavTweets($state)
          break
        case 'Latest':
          this.getLatestTweets($state)
          break
        default:
          this.getLatestTweets($state)
          break
      }
      // this.getRateTweets($state)
    },
    getLatestTweets ($state) {
      try {
        if (this.nextToken) {
          this.nextToken = `"${this.nextToken}"`
        } else if (this.page > 1) {
          this.searchDay -= 86400
        } else if (this.searchDay <= lastMonthUnix) {
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
            if (this.tweets.length >= 100) {
              $state.complete()
            } else {
              $state.loaded()
            }
          })
      } catch (e) {
        $state.complete()
      }
    },
    getDRTTweets ($state) {
      try {
        if (this.nextToken) {
          this.nextToken = `"${this.nextToken}"`
        }
        const TweetsListQuery = `query getRTRanking {
          queryTweet2rekognitionRankingsByDivDRTIndex(div: 1, limit: 10, nextToken: ${this.nextToken}){
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
            this.page += 1
            for (const item of response.data.queryTweet2rekognitionRankingsByDivDRTIndex.items) {
              if (this.tweets.find(element => element.id === item.id) === undefined) {
                this.tweets.push(item)
              }
            }
            this.nextToken = response.data.queryTweet2rekognitionRankingsByDivDRTIndex.nextToken
            if (this.tweets[this.tweets.length - 1].d_RT === 0 || this.tweets.length >= 100) {
              $state.complete()
            } else {
              $state.loaded()
            }
          })
      } catch (e) {
        $state.complete()
      }
    },
    getDFavTweets ($state) {
      try {
        if (this.nextToken) {
          this.nextToken = `"${this.nextToken}"`
        }
        const TweetsListQuery = `query getFavRanking {
          queryTweet2rekognitionRankingsByDivDFavIndex(div: 1, limit: 10, nextToken: ${this.nextToken}){
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
            this.page += 1
            for (const item of response.data.queryTweet2rekognitionRankingsByDivDFavIndex.items) {
              if (this.tweets.find(element => element.id === item.id) === undefined) {
                this.tweets.push(item)
              }
            }
            this.nextToken = response.data.queryTweet2rekognitionRankingsByDivDFavIndex.nextToken
            if (this.tweets[this.tweets.length - 1].d_Fav === 0 || this.tweets.length >= 100) {
              $state.complete()
            } else {
              $state.loaded()
            }
          })
      } catch (e) {
        $state.complete()
      }
    },
    getRateTweets ($state) {
      try {
        if (this.nextToken) {
          this.nextToken = `"${this.nextToken}"`
        }
        const TweetsListQuery = `query getRateRanking {
          queryTweet2rekognitionRankingsByDivRateIndex(div: 1, limit: 10, nextToken: ${this.nextToken}){
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
            this.page += 1
            for (const item of response.data.queryTweet2rekognitionRankingsByDivRateIndex.items) {
              if (this.tweets.find(element => element.id === item.id) === undefined) {
                this.tweets.push(item)
              }
            }
            this.nextToken = response.data.queryTweet2rekognitionRankingsByDivRateIndex.nextToken
            if (this.tweets[this.tweets.length - 1].rate === 0 || this.tweets.length >= 100) {
              $state.complete()
            } else {
              $state.loaded()
            }
          })
      } catch (e) {
        $state.complete()
      }
    }
  }
}
</script>

<style>
.select-sortType {
  border-bottom: 1px solid var(--border-color);
}

.tweet-list {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 80px;
}
</style>
