<template>
  <div :id="'tweet-box-' + tweet.id" class="tweet-box">
    <div ref="authorBox" class="author-box">
      <div class="author-table">
        <div class="author-icon">
          <a :href="'https://twitter.com/' + tweet.user_screen_name" target="_blank">
            <img class="profile-image" :src="tweet.user_profile_image">
          </a>
        </div>
        <div class="author-info">
          <a :href="'https://twitter.com/' + tweet.user_screen_name" class="author-link" target="_blank" title="Twitterでユーザーを見る">
            <h3 class="author-name">{{ tweet.user_name }}</h3>
            <h5 class="author-screen-name">@{{ tweet.user_screen_name }}</h5>
          </a>
          <div class="author-info-data">
            <a :href="'https://twitter.com/' + tweet.user_screen_name + '/status/' + tweet.id" class="time-lag" target="_blank" title="Twitterで見る">
              <h5>{{ timeLag }}{{ timeLagScale }}</h5>
            </a>
            <a :href="'https://twitter.com/intent/retweet?tweet_id=' + tweet.id" class="retweet-btn" target="_blank" title="リツイートする">
              <retweet-icon />
              <h5>{{ tweet.retweet }}</h5>
            </a>
            <a :href="'https://twitter.com/intent/like?tweet_id=' + tweet.id" class="favorite-btn" target="_blank" title="いいねする">
              <favorite-icon />
              <h5>{{ tweet.favorite }}</h5>
            </a>
          </div>
        </div>
      </div>
      <div class="twitter-icon">
        <twitter-icon />
      </div>
    </div>
    <div ref="imagesContainer" class="images-container">
      <a :href="'https://twitter.com/' + tweet.user_screen_name + '/status/' + tweet.id" target="_blank">
        <div v-for="image in images" :key="image.id" class="each-image">
          <img-canvas :image="image" @sendHeight="recieveHeight" />
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import TwitterIcon from '~/components/parts/twitterIcon.vue'
import RetweetIcon from '~/components/parts/retweetIcon.vue'
import FavoriteIcon from '~/components/parts/favoriteIcon.vue'
import ImgCanvas from '~/components/parts/imgCanvas.vue'

export default {
  name: 'EmbedTweet',
  components: {
    TwitterIcon,
    RetweetIcon,
    FavoriteIcon,
    ImgCanvas
  },
  props: {
    tweet: {
      type: Object,
      default () {
        return {
          id: '0',
          img: '',
          timestamp: 0,
          user_name: '',
          user_screen_name: '',
          user_profile_image: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
          retweet: 0,
          favorite: 0,
          text: ''
        }
      }
    },
    nowUnix: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      images: {},
      timeLag: 0,
      timeLagScale: '分前'
    }
  },
  mounted () {
    this.images = JSON.parse(this.tweet.img)
    this.calcTimeLag()
    window.addEventListener('resize', this.setGridSpanResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setGridSpanResize)
  },
  methods: {
    calcTimeLag () {
      const timeLagUnix = this.nowUnix - this.tweet.timestamp
      if (timeLagUnix > 86400) {
        this.timeLag = Math.ceil(timeLagUnix / 86400)
        this.timeLagScale = '日前'
      } else if (timeLagUnix > 3600) {
        this.timeLag = Math.ceil(timeLagUnix / 3600)
        this.timeLagScale = '時間前'
      } else if (timeLagUnix > 60) {
        this.timeLag = Math.ceil(timeLagUnix / 60)
        this.timeLagScale = '分前'
      }
    },
    recieveHeight () {
      this.setGridSpanResize()
    },
    setGridSpanResize () {
      const tweetBoxHeight = this.$refs.authorBox.offsetHeight + this.$refs.imagesContainer.offsetHeight
      const tweetContainer = document.getElementById('tweet-container-' + String(this.tweet.id))
      tweetContainer.setAttribute('style', `height: ${tweetBoxHeight}px;grid-row: span ${Math.ceil(((tweetBoxHeight + 10) / (20 + 10)) + 1)};`)
    }
  }
}
</script>

<style>
.tweet-box {
  padding: 10px;
  border-radius: 15px;
  margin: 20px 20px;
  background: var(--background-color);
  box-shadow: 10px 10px 20px #0d416e, -10px -10px 20px #115794;
}

.profile-image {
  width: 44px;
  height: 44px;
  border-radius: 22px;
}

.author-box {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
}

.author-table {
  display: table;
  border-collapse: separate;
  border-spacing: 4px 0;
  margin: 5px 0;
}

.author-icon {
  display: table-cell;
}

.author-info {
  display: table-cell;
  vertical-align: middle;
}

.author-link {
  text-decoration: none;
  line-height: 1;
}

.author-name {
  width: 12em;
  white-space: nowrap;
  overflow: hidden;
  color: var(--text-color-main);
  text-overflow: ellipsis;
}

.author-name:hover {
  color: var(--text-color-main-hover);
}

.author-screen-name {
  color: var(--text-color-sub);
}

.author-screen-name:hover {
  color: var(--text-color-sub-hover);
}

.author-info-data {
  display: flex;
  flex-wrap: nowrap;
}

.time-lag {
  text-decoration: none;
  color: var(--text-color-sub);
  margin-right: 6px;
}

.time-lag:hover h5 {
  color: var(--text-color-sub-hover);
}

.retweet-btn {
  text-decoration: none;
  color: var(--text-color-sub);
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
}

.retweet-btn:hover h5 {
  color: var(--retweet-color);
}

.retweet-btn:hover .st0 {
  fill: var(--retweet-color);
}

.retweet-btn h5 {
  margin-top: 2px;
}

.retweet-icon {
  margin: 2px;
  width: 17px;
  height: 17px;
}

.favorite-btn {
  margin-left: 6px;
  text-decoration: none;
  color: var(--text-color-sub);
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
}

.favorite-btn:hover h5 {
  color: var(--favorite-color);
}

.favorite-btn:hover .st0 {
  fill: var(--favorite-color);
}

.favorite-btn h5 {
  margin-top: 2px;
}

.favorite-icon {
  margin: 4px 2px 4px 2px;
  width: 13px;
  height: 13px;
}

.twitter-icon {
  margin-left: auto;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  min-width: 30px;
  min-height: 30px;
}
</style>
