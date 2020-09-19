<template>
  <div class="container">
    <div v-if="!$device.isMobile">
      <hot-tweets ref="hotTweets" />
    </div>
    <div>
      <tweets-list ref="tweetsList" />
    </div>
  </div>
</template>

<script>
import TweetsList from '~/components/tweetsList.vue'
import HotTweets from '~/components/hot.vue'

export default {
  layout: 'default',
  components: {
    TweetsList,
    HotTweets
  },
  data () {
    return {
      title: 'TOP'
    }
  },
  head () {
    return {
      title: 'VRCSnap! - VRChatの自撮りツイート収集サイト',
      meta: [
        { hid: 'description', name: 'description', content: 'VRCSnap!はTwitterからVRChatの自撮りっぽい画像を収集するサイトです' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:title', property: 'og:title', content: 'VRCSnap!' },
        { hid: 'og:description', property: 'og:description', content: 'VRCSnap!はTwitterからVRChatの自撮りっぽい画像を収集するサイトです' },
        { hid: 'og:url', property: 'og:url', content: 'https://vrcsnap.com' },
        { hid: 'og:image', property: 'og:image', content: 'https://vrcsnap.com/ogp/mainLogo.jpg' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'VRCSnap!' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'VRCSnap!はTwitterからVRChatの自撮りっぽい画像を収集するサイトです' },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https://vrcsnap.com/ogp/mainLogo.jpg' },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'VRCSnap' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' }
      ]
    }
  },
  beforeRouteUpdate (to, from, next) {
    const sortType = to.query.sort || 'Latest'
    this.$refs.tweetsList.updateSortType(sortType)
    next()
  }
}
</script>

<style>
.container {
  min-height: 100vh;
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
