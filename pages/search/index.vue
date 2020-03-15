<template>
  <div class="container">
    <div class="first-row">
      <div class="result-description">
        <h1>「{{ keyword }}」を含む作者の検索結果</h1>
      </div>
      <div class="select-sortType-author">
        <sort-type-author :keyword="keyword" :sort-type-author="sortTypeAuthor" />
      </div>
    </div>
    <div class="author-list">
      <div v-for="(author, $index) in authors" :id="'authorContainer-' + author.user_screen_name" :key="$index">
        <author-card-small ref="authorCardSmall" :author="author" />
      </div>
    </div>
    <client-only>
      <infinite-loading ref="infiniteLoading" :identifier="infiniteId" @infinite="infiniteHandler" />
    </client-only>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { API, graphqlOperation } from 'aws-amplify'
import AuthorCardSmall from '~/components/parts/author/authorCardSmall.vue'
import SortTypeAuthor from '~/components/parts/author/sortTypeAuthor.vue'

export default {
  name: 'Author',
  layout: 'default',
  components: {
    InfiniteLoading,
    AuthorCardSmall,
    SortTypeAuthor
  },
  data () {
    return {
      page: 1,
      nextToken: null,
      infiniteId: 0,
      title: '',
      authors: [],
      responseObj: {},
      sortTypeAuthor: 'Follower',
      keyword: ''
    }
  },
  mounted () {
    this.sortTypeAuthor = this.$route.query.sort || 'Follower'
    this.keyword = this.$route.query.keyword || ''
    this.title = this.keyword
  },
  beforeRouteUpdate (to, from, next) {
    this.sortTypeAuthor = to.query.sort || 'Follower'
    this.keyword = to.query.keyword || ''
    this.title = this.keyword
    this.authors = []
    this.nextToken = null
    this.page = 0
    this.$refs.infiniteLoading.stateChanger.reset()
    this.infiniteId += 1
    next()
  },
  methods: {
    infiniteHandler ($state) {
      if (this.nextToken) {
        this.nextToken = `"${this.nextToken}"`
      } else if (this.page > 1) {
        $state.complete()
      }
      const AuthorListQuery = `query getUserList {
        listTweet2rekognitionUsers${this.sortTypeAuthor} (user_screen_name: "${this.keyword}", user_name: "${this.keyword}", user_profile_description: "${this.keyword}", limit: 100, nextToken: ${this.nextToken}) {
          items {
            user_screen_name
            user_name
            user_profile_banner
            user_profile_description
            user_profile_follow_count
            user_profile_follower_count
            user_profile_image
            user_profile_url
          }
          nextToken
        }
      }`
      try {
        API.graphql(graphqlOperation(AuthorListQuery))
          .then((response) => {
            this.page += 1
            if (this.sortTypeAuthor === 'Follower') {
              this.responseObj = response.data.listTweet2rekognitionUsersFollower
            } else if (this.sortTypeAuthor === 'Latest') {
              this.responseObj = response.data.listTweet2rekognitionUsersLatest
            }
            for (const item of this.responseObj.items) {
              if (this.authors.find(element => element.user_screen_name === item.user_screen_name) === undefined) {
                this.authors.push(item)
              }
            }
            this.nextToken = this.responseObj.nextToken
            $state.loaded()
          })
      } catch (e) {
        $state.complete()
      }
    }
  },
  head () {
    return {
      title: this.title + 'を含むユーザー | VRCSnap!',
      meta: [
        {
          hid: 'description', name: 'description', content: this.title + 'を含むユーザー | VRCSnap!'
        }
      ]
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  margin-top: 0px !important;
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

.first-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.result-description {
  margin: 0 5px;
}

.result-description h1 {
  white-space: nowrap;
  font-size: calc(1.5rem + ((1vw - 3.5px) * 0.5096));
}

.select-sortType-author {
  margin: 0 5px;
}

.author-list {
  margin-top: 20px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}
</style>
