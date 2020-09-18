<template>
  <div class="hot-container">
    <h1>Hot Tweet</h1>
    <div v-swiper:mySwiper="swiperOption">
      <div ref="swiperWrapper" class="swiper-wrapper">
        <div v-for="(hotTweet, $index) in hotTweets" :id="'hot-tweet-' + hotTweet.id" :key="$index" class="swiper-slide">
          <div class="hot-tweet-wrapper">
            <div class="hot-tweet-container">
              <div class="author-info-first-hot">
                <a class="author-link-image-hot" :href="'https://twitter.com/' + hotTweet.user_screen_name" target="_blank" title="Twitterで見る">
                  <img :src="hotTweet.user_profile_image" class="author-image-hot">
                </a>
                <div class="author-name-box">
                  <n-link :to="{ name: 'author-userScreenName', params: { userScreenName: hotTweet.user_screen_name} }" class="author-link-hot" style="display: block">
                    <h1>{{ hotTweet.user_name }}</h1>
                    <h2>@{{ hotTweet.user_screen_name }}</h2>
                  </n-link>
                  <div class="author-info-data-hot">
                    <a :href="'https://twitter.com/' + hotTweet.user_screen_name + '/status/' + hotTweet.id" class="time-lag" target="_blank" title="Twitterで見る">
                      <h5>{{ calcTimeLag(hotTweet.timestamp) }}</h5>
                    </a>
                    <a :href="'https://twitter.com/intent/retweet?tweet_id=' + hotTweet.id" class="retweet-btn" target="_blank" title="リツイートする">
                      <retweet-icon />
                      <h5>{{ hotTweet.retweet }}</h5>
                    </a>
                    <a :href="'https://twitter.com/intent/like?tweet_id=' + hotTweet.id" class="favorite-btn" target="_blank" title="いいねする">
                      <favorite-icon />
                      <h5>{{ hotTweet.favorite }}</h5>
                    </a>
                  </div>
                </div>
                <div class="twitter-icon">
                  <twitter-icon />
                </div>
              </div>
              <div class="text-container-hot">
                <!-- eslint-disable vue/no-v-html -->
                <p class="text-hot" v-html="autoLink(hotTweet.text)" />
                <!--eslint-enable-->
              </div>
            </div>
            <a :href="'https://twitter.com/' + hotTweet.user_screen_name + '/status/' + hotTweet.id" target="_blank">
              <div class="hot-image-container">
                <img :src="jsonParseImg(hotTweet.img)" style="width: 100%;">
              </div>
            </a>
          </div>
        </div>
      </div>
      <div slot="pagination" class="swiper-pagination" />
    </div>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import TwitterText from 'twitter-text'
import 'swiper/css/swiper.css'
import TwitterIcon from '~/components/parts/tweet/twitterIcon.vue'
import RetweetIcon from '~/components/parts/tweet/retweetIcon.vue'
import FavoriteIcon from '~/components/parts/tweet/favoriteIcon.vue'

const date = new Date()
const nowUnix = Math.floor(date.getTime() / 1000)

export default {
  name: 'HotTweets',
  components: {
    TwitterIcon,
    RetweetIcon,
    FavoriteIcon
  },
  data () {
    return {
      hotTweets: [],
      nowUnix,
      swiperOption: {
        loop: true,
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
          delay: 8000
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  mounted () {
    this.getRateTweets()
  },
  methods: {
    jsonParseImg (str) {
      const parsed = JSON.parse(str)
      return parsed[0].url
    },
    setGridPosition (index) {
      return ''
    },
    calcTimeLag (timestamp) {
      const timeLagUnix = this.nowUnix - timestamp
      let timeLag = 0
      let timeLagScale = '分前'
      if (timeLagUnix > 86400) {
        timeLag = Math.ceil(timeLagUnix / 86400)
        timeLagScale = '日前'
      } else if (timeLagUnix > 3600) {
        timeLag = Math.ceil(timeLagUnix / 3600)
        timeLagScale = '時間前'
      } else if (timeLagUnix > 60) {
        timeLag = Math.ceil(timeLagUnix / 60)
        timeLagScale = '分前'
      }
      return String(timeLag) + timeLagScale
    },
    autoLink (text) {
      return TwitterText.autoLink(text, { targetBlank: true })
    },
    getRateTweets () {
      const mySwiper = document.getElementsByClassName('swiper-container')[0].swiper
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
          mySwiper.updateAutoHeight(8000)
        })
    }
  }
}
</script>

<style>
.hot-container {
  padding: 0 15px 15px 15px;
}

.hot-container h1{
  color: var(--text-color-main);
}

.swiper-container {
  box-shadow: 5px 5px 20px var(--border-dark), -5px -5px 20px var(--border-dark);
}

.hot-tweet-wrapper {
  position: relative;
}

.hot-tweet-container {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
}

.author-banner-wrapper {
  width: 100%;
  min-height: 200px;
  background-size: cover;
  display: flex;
  align-items: center;
}

.author-banner-container {
  max-width: 900px;
  background-color: rgba(255, 255, 255, 0.6);
}

.author-info-first-hot {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 3px 12px;
}

.author-image-hot{
  width: 50px;
  height: 50px;
  border-radius: 25px;
}

.author-link-hot {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  text-decoration: none;
  margin: 0 5px;
}

.author-link-hot h1 {
  font-size: calc(0.875rem + ((1vw - 3.56px) * 0.7033));
  color: var(--text-color-main);
  width: 15em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.author-link-hot h1:hover {
  color: var(--text-color-main-hover);
}

.author-link-hot h2 {
  font-size: calc(0.875rem + ((1vw - 3.56px) * 0.3836));
  color: var(--text-color-sub);
}

.author-link-hot h2:hover {
  color: var(--text-color-sub-hover);
}

.author-info-data-hot {
  display: flex;
  flex-wrap: nowrap;
  margin-left: 5px;
}

.hot-image-container img {
  max-height: 700px;
  object-fit: contain;
  pointer-events: none !important;
}

.text-container-hot {
  padding: 0 5px;
  background: rgba(0, 0, 0, 0.5);
}

.text-hot {
  color: var(--text-color-p);
  font-size: 0.8em;
}

.text-hot a {
  text-decoration: none;
  color: var(--text-color-p);
}

.text-hot a:hover{
  color: var(--text-color-sub-hover);
}

@media screen and (max-width: 850px) {
  .hot-tweet-container {
    position: static;
  }
  .hot-image-container img {
    max-height: 300px;
    object-fit: cover;
  }
}
</style>
