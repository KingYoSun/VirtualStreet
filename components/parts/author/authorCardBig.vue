<template>
  <div class="author-banner-wrapper" :style="{ backgroundImage: 'url(' + author.user_profile_banner + ')' }">
    <div class="author-banner-container">
      <div class="author-info-first">
        <a class="author-link" :href="'https://twitter.com/' + author.user_screen_name" target="_blank" title="Twitterで見る">
          <img :src="author.user_profile_image" class="author-image">
        </a>
        <a class="author-link" :href="'https://twitter.com/' + author.user_screen_name" target="_blank" title="Twitterで見る">
          <div class="author-name-box">
            <h1>{{ author.user_name }}さんのスナップ一覧</h1>
            <h2>@{{ author.user_screen_name }}</h2>
          </div>
        </a>
        <a class="author-follow-btn" :href="'https://twitter.com/intent/follow?screen_name=' + author.user_screen_name" target="_blank">フォロー</a>
      </div>
      <div class="author-count">
        <div class="author-follow-count">
          <h3>
            フォロー: {{ author.user_profile_follow_count }}
          </h3>
        </div>
        <div class="author-follower-count">
          <h3>
            フォロワー: {{ author.user_profile_follower_count }}
          </h3>
        </div>
      </div>
      <div class="author-description">
        <!-- eslint-disable-next-line -->
        <p id="author-description" v-html="autoLink" />
        <a class="author-profile-url" :href="author.user_profile_url" target="_blank">{{ author.user_profile_url }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import TwitterText from 'twitter-text'

export default {
  name: 'AuthorCardBig',
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

.author-info-first {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 3px 12px;
}

.author-image {
  max-width: 100px;
  width: 20vw;
  height: auto;
  border-radius: 50px;
  border: 3px var(--text-color-main) solid;
}

.author-link {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  text-decoration: none;
  padding: 5px;
}

.author-link h1 {
  font-size: calc(1rem + ((1vw - 3.5px) * 1.0191));
  color: var(--text-color-main);
}

.author-link h1:hover {
  color: var(--text-color-main-hover);
}

.author-link h2 {
  font-size: calc(0.75rem + ((1vw - 3.5px) * 0.828));
  color: var(--text-color-sub);
}

.author-link h2:hover {
  color: var(--text-color-sub-hover);
}

.author-count {
  display: flex;
  flex-wrap: nowrap;
  padding: 3px 20px;
}

.author-count div {
  font-size: calc(0.875rem + ((1vw - 3.5px) * 0.3822));
  text-align: center;
  margin: 0px 5px;
}

.author-follow-btn {
  white-space: nowrap;
  font-size: calc(0.375rem + ((1vw - 4.8px) * 0.9722));
  text-decoration: none;
  padding: 5px;
  color: white;
  background-color: var(--twitter-blue);
  border-radius: 15px;
  border: 2px var(--twitter-blue) solid;
}

.author-follow-btn:hover {
  background-color: rgba(255, 255, 255, 0.6);
  color: var(--twitter-blue);
}

.author-description {
  font-size: 0.8em;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--text-color-p);
  padding: 3px 20px;
}

.author-description a {
  text-decoration: none;
  color: var(--text-color-main-hover);
}

.author-description a:hover {
  color: white;
}
</style>
