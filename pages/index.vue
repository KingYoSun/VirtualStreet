<template>
  <div class="container">
    <div>
      <tweets-list />
    </div>
  </div>
</template>

<script>
import TweetsList from '~/components/tweetsList.vue'

export default {
  layout: 'default',
  components: {
    TweetsList
  },
  data () {
    return {
      title: 'TOP'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description', name: 'description', content: 'This is Top Page'
        }
      ]
    }
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
