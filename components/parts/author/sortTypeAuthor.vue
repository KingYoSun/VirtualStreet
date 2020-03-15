<template>
  <div class="sortbtn-container-author">
    <n-link :to="{ name: 'search', query: {keyword: keyword, sort: 'Follower'}}" class="sortType-btn-author follower" :class="[ sortType === 'Follower' ? 'is-disabled-author' : '' ]">
      <h3>フォロワー数</h3>
    </n-link>
    <n-link :to="{ name: 'search', query: {keyword: keyword, sort: 'Latest'}}" class="sortType-btn-author author-latest" :class="[ sortType === 'Latest' ? 'is-disabled-author' : '' ]">
      <h3>更新日</h3>
    </n-link>
  </div>
</template>

<script>
export default {
  name: 'SortTypeAuthor',
  props: {
    keyword: {
      type: String,
      default: ''
    },
    sortType: {
      type: String,
      default: 'Follower'
    }
  },
  data () {
    return {
      disableFlagFollower: false,
      disableFlagLatest: false
    }
  },
  mounted () {
    this.keyword = this.$route.query.keyword || ''
    this.sortType = this.$route.query.sortType || 'Follower'
    this.disableFlag()
  },
  methods: {
    disableFlag () {
      if (this.sortType === 'Follower') {
        this.disableFlagFollower = true
        this.disableFlagLatest = false
      } else if (this.sortType === 'Latest') {
        this.disableFlagFollower = false
        this.disableFlagLatest = true
      }
    }
  }
}
</script>

<style>
.sortbtn-container-author {
  display: flex;
  justify-content: flex-end;
}

.sortbtn-container-author a {
  text-decoration: none;
}

.sortType-btn-author {
  color: var(--text-color-sub);
  border: solid 1px var(--border-color);
  padding: 10px;
}

.sortType-btn-author:hover {
  color: var(--text-color-sub-hover);
  background-color: rgba(0, 0, 0, 0.7);
}

.is-disabled-author {
  pointer-events: none;
  color: var(--text-color-sub-hover);
  background-color: rgba(0, 0, 0, 0.7);
}

.follower {
  border-radius: 10px 0 0 10px;
}

.author-latest {
  border-radius: 0 10px 10px 0;
}
</style>
