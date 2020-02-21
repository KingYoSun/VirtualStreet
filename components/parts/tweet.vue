<template>
  <div :id="'tweet-container-' + id"></div>
</template>

<script>
export default {
  name: 'EmbedTweet',
  props: {
    id: String
  },
  mounted () {
    twttr.widgets.createTweet(
      this.id,
      document.getElementById('tweet-container-' + this.id),
      {
        theme: ''
      }
    )
  }
}
</script>
