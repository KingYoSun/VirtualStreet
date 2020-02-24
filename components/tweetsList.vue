<template>
  <div>
    <div class="main-description">
      <h5>VRCSnap!はTwitterからVRChatのスナップっぽい画像を収集するサイトです</h5>
    </div>
    <div class="tweet-list">
      <div v-for="(tweet, $index) in tweets" :id="'tweet-container-' + tweet.id" :key="$index">
        <embed-tweet :tweet="tweet" :now-unix="nowUnix" />
      </div>
    </div>
    <client-only>
      <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler">
        <div slot="no-result">
          No result!
        </div>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script type="text/javascript" src="https://platform.twitter.com/widgets.js"></script>
<script>
import InfiniteLoading from 'vue-infinite-loading'
import { API, graphqlOperation } from 'aws-amplify'
import EmbedTweet from '~/components/parts/tweet.vue'

const date = new Date()
const nowUnix = Math.floor(date.getTime() / 1000)
const year = date.getUTCFullYear()
const month = date.getUTCMonth() + 1
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
      nowUnix: nowUnix,
      infiniteId: 0
    }
  },
  mounted () {
    this.infiniteId += 1
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
          listTweet2rekognitions(updated_at_date: ${this.searchDay}, limit: 10, nextToken: ${this.nextToken}) {
            items {
              id
              user_name
              user_screen_name
              user_profile_image
              timestamp
              retweet
              favorite
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

<style>
.main-description {
  color: var(--text-color-main);
}

.tweet-list {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 20px;
}
</style>
