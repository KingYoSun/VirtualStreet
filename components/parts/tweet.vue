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
          <a :href="'https://twitter.com/' + tweet.user_screen_name" class="author-link" target="_blank">
            <h3 class="author-name">{{ tweet.user_name }}</h3>
            <h5 class="author-screen-name">@{{ tweet.user_screen_name }}</h5>
          </a>
          </h3>
        </div>
      </div>
      <div class="twitter-icon">
        <twitter-icon />
      </div>
    </div>
    <div ref="imagesContainer" class="images-container">
      <a :href="'https://twitter.com/' + tweet.user_screen_name + '/status/' + tweet.id" target="_blank">
        <div v-for="image in images" :key="image.id" class="each-image">
          <img :id="'image-' + image.id" :src="image.url" @load="imageTrimming(image);setGridSpan(image.id)">
          <div>{{ mergedBox }}</div>
        </div>
      </a>
    </div>
    <div ref="imgView" class="imgView">
      <span>{{ imgView }}</span>
    </div>
  </div>
</template>

<script>
import TwitterIcon from '~/components/parts/twitterIcon.vue'

export default {
  name: 'EmbedTweet',
  components: {
    TwitterIcon
  },
  props: {
    tweet: Object
  },
  data () {
    return {
      images: {},
      imgView: {},
      boxHeight: 0,
      mergedBox: {
        Top: 0,
        Left: 0,
        Width: 0,
        Height: 0
      }
    }
  },
  mounted () {
    if (!this.tweet.user_profile_image) {
      this.tweet.user_profile_image = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
    }
    this.images = JSON.parse(this.tweet.img)
    this.imgView = JSON.parse(this.tweet.img)
    this.boxHeight = this.$refs.authorBox.offsetHeight + this.$refs.imgView.offsetHeight
    window.addEventListener('resize', this.setGridSpanResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setGridSpanResize)
  },
  methods: {
    setGridSpan ($id) {
      const image = document.getElementById('image-' + String($id))
      this.boxHeight += image.offsetHeight
      const tweetContainer = document.getElementById('tweet-container-' + String(this.tweet.id))
      tweetContainer.setAttribute('style', `height: ${this.boxHeight}px;grid-row: span ${Math.ceil(((this.boxHeight + 10) / (20 + 10)) + 1)};`)
    },
    setGridSpanResize () {
      const tweetBoxHeight = this.boxHeight + this.$refs.imagesContainer.offsetHeight
      const tweetContainer = document.getElementById('tweet-container-' + String(this.tweet.id))
      tweetContainer.setAttribute('style', `height: ${tweetBoxHeight}px;grid-row: span ${Math.ceil(((tweetBoxHeight + 10) / (20 + 10)) + 1)};`)
    },
    imageTrimming (img) {
      const size = this.getImageSize(img.url)
      const boundingBox = this.mergeBoundingBox(img)
      const left = Math.ceil(size.width * boundingBox.Left)
      const top = Math.ceil(size.height * boundingBox.Top)
      const width = Math.ceil(size.width * boundingBox.Width)
      const height = Math.ceil(size.height * boundingBox.Height)
      // const elemImage = document.getElementById('image-' + String(img.id))
      this.mergedBox = {
        Top: top,
        Left: left,
        Width: width,
        Height: height
      }
    },
    getImageSize (img) {
      const size = {
        width: 0,
        height: 0
      }
      const element = new Image()
      element.src = img
      size.width = element.width
      size.height = element.height
      return size
    },
    mergeBoundingBox (img) {
      const mergedBox = img.bounding_box[0]
      for (const box of img.bounding_box) {
        const boxRight = box.Left + box.Width
        const mergedBoxRight = mergedBox.Left + mergedBox.Width
        const boxBottom = box.Top + box.Height
        const mergedBoxBottom = mergedBox.Top + mergedBox.Height
        if (mergedBox.Left > box.Left) {
          mergedBox.Left = box.Left
          mergedBox.Width = (mergedBoxRight < boxRight) ? box.Width : mergedBox.Width + (mergedBox.Left - box.Left)
        } else {
          // mergedBox.Left = mergedBox.Left
          mergedBox.Width = (mergedBoxRight < boxRight) ? box.Width + (box.Left - mergedBox.Left) : mergedBox.Width
        }
        if (mergedBox.Top > box.Top) {
          mergedBox.Top = box.Top
          mergedBox.Height = (mergedBoxBottom < boxBottom) ? box.Height : mergedBox.Height + (mergedBox.Top - box.Top)
        } else {
          // mergedBox.Top = mergedBox.Top
          mergedBox.Height = (mergedBoxBottom < boxBottom) ? box.Height + (box.Top - mergedBox.Top) : mergedBox.Height
        }
      }
      return mergedBox
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
}

.author-name {
  width: 20em;
  white-space: nowrap;
  overflow: hidden;
  color: var(--text-color-main);
  text-overflow: ellipsis;
}

.author-screen-name {
  color: var(--text-color-sub);
}

.twitter-icon {
  margin-left: auto;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  min-width: 30px;
  min-height: 30px;
}

.images-container {
  display: inline-block;
}

.each-image {
  display: inline;
}

.each-image img {
  width: 100%;
}
</style>
