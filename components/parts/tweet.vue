<template>
  <div :id="'tweet-container-' + tweet.id" class="tweet-box">
    <div class="author-box">
      <div class="author-icon">
        <a :href="'https://twitter.com/' + tweet.user_screen_name" target="_blank">
          <img class="profile-image" :src="tweet.user_profile_image">
        </a>
      </div>
      <div class="author-info">
          <a :href="'https://twitter.com/' + tweet.user_screen_name" class="author-link">
            <h3 class="author-name">{{ tweet.user_name }}</h3>
            <h5 class="author-screen-name">@{{ tweet.user_screen_name }}</h5>
          </a>
        </h3>
      </div>
      <div class="twitter-icon">
        <twitter-icon />
      </div>
    </div>
  </div>
</template>

<script>
import TwitterIcon from '~/components/parts/twitterIcon.vue'

export default {
  name: 'EmbedTweet',
  props: {
    tweet: Object
  },
  components: {
    TwitterIcon
  },
  mounted () {
    if (!this.tweet.user_profile_image) {
      this.tweet.user_profile_image = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
    }
  }
}
</script>

<style>
.tweet-box {
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
  color: white;
  text-overflow: ellipsis;
}

.author-screen-name {
  color: gray;
}

.twitter-icon {
  width: 40px;
  height: 40px;
}
</style>
