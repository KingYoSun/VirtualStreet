<template>
  <div class="author-banner-wrapper-small" :style="{ backgroundImage: 'url(' + author.user_profile_banner + ')' }">
    <div class="author-banner-container-small">
      <div class="author-info-first-small">
        <n-link :to="{ name: 'author-userScreenName', params: { userScreenName: author.user_screen_name} }" class="author-link-image-small">
          <img :src="author.user_profile_image" class="author-image-small">
        </n-link>
        <n-link :to="{ name: 'author-userScreenName', params: { userScreenName: author.user_screen_name} }" class="author-link-small">
          <div class="author-name-box-small">
            <h1>{{ author.user_name }}</h1>
            <h2>@{{ author.user_screen_name }}</h2>
          </div>
        </n-link>
        <a class="author-follow-btn-small" :href="'https://twitter.com/intent/follow?screen_name=' + author.user_screen_name" target="_blank">フォロー</a>
      </div>
      <div class="author-count-small">
        <div class="author-follow-count-small">
          <h3>
            フォロー: {{ author.user_profile_follow_count }}
          </h3>
        </div>
        <div class="author-follower-count-small">
          <h3>
            フォロワー: {{ author.user_profile_follower_count }}
          </h3>
        </div>
      </div>
      <div class="author-description-small">
        <!-- eslint-disable-next-line -->
        <p id="author-description-small" v-html="autoLink" />
      </div>
    </div>
  </div>
</template>

<script>
import TwitterText from 'twitter-text'

export default {
  name: 'AuthorCardSmall',
  props: {
    author: {
      type: Object,
      default () {
        return {
          user_screen_name: '',
          user_name: '',
          user_profile_banner: '',
          user_profile_description: '',
          user_profile_follow_count: 0,
          user_profile_follower_count: 0,
          user_profile_image: '',
          user_profile_url: ''
        }
      }
    }
  },
  data () {
    return {
      styleGridSpan: ''
    }
  },
  computed: {
    autoLink () {
      return TwitterText.autoLink(String(this.author.user_profile_description), {
        targetBlank: true
      })
    }
  }
}
</script>
<style>
.author-banner-wrapper-small {
  margin-top: 5px;
  background-size: cover;
  display: flex;
  align-items: center;
  box-shadow: 3px 3px 10px var(--border-dark), -3px -3px 10px var(--border-dark);
}

.author-banner-container-small {
  width: 100%;
  max-width: 900px;
  background-color: rgba(255, 255, 255, 0.6);
}

.author-info-first-small {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 3px 12px;
}

.author-image-small {
  max-width: 60px;
  width: 20vw;
  height: auto;
  border-radius: 50px;
  border: 3px var(--text-color-main) solid;
}

.author-link-small {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  text-decoration: none;
  padding: 5px;
}

.author-link-small h1 {
  font-size: 1.0em;
  width: 14em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-color-main);
}

.author-link-small h1:hover {
  color: var(--text-color-main-hover);
}

.author-link-small h2 {
  font-size: 0.85em;
  width: 14em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-color-sub);
}

.author-link-small h2:hover {
  color: var(--text-color-sub-hover);
}

.author-count-small {
  display: flex;
  flex-wrap: nowrap;
  padding: 3px 20px;
}

.author-count-small div {
  font-size: 1.0em;
  text-align: center;
  margin: 0px 5px;
}

.author-follow-btn-small {
  white-space: nowrap;
  font-size: 1.0em;
  text-decoration: none;
  padding: 5px;
  color: white;
  background-color: var(--twitter-blue);
  border-radius: 15px;
  border: 2px var(--twitter-blue) solid;
}

.author-follow-btn-small:hover {
  background-color: rgba(255, 255, 255, 0.6);
  color: var(--twitter-blue);
}

.author-description-small {
  font-size: 0.8em;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--text-color-p);
  padding: 3px 20px;
}

.author-description-small a {
  text-decoration: none;
  color: var(--text-color-main-hover);
}

.author-description-small a:hover {
  color: white;
}
</style>
