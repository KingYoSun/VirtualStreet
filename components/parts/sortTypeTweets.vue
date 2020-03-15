<template>
  <div class="sortbtn-container-tweet">
    <n-link :to="{ name: '', query: {sort: 'Latest'}}" class="sortType-btn-tweet tweet-latest" :class="[ sortType === 'Latest' ? 'is-disabled-tweet' : '' ]">
      <h3>新着</h3>
    </n-link>
    <n-link :to="{ name: '', query: {sort: 'dRT'}}" class="sortType-btn-tweet dRT" :class="[ sortType === 'dRT' ? 'is-disabled-tweet' : '' ]">
      <h3>毎時RT数順</h3>
    </n-link>
    <n-link :to="{ name: '', query: {sort: 'dFav'}}" class="sortType-btn-tweet dFav" :class="[ sortType === 'dFav' ? 'is-disabled-tweet' : '' ]">
      <h3>毎時Fav数順</h3>
    </n-link>
  </div>
</template>

<script>
export default {
  name: 'SortTypeAuthor',
  props: {
    sortType: {
      type: String,
      default: 'Latest'
    }
  },
  data () {
    return {
      disableFlagDRT: false,
      disableFlagDFav: false,
      disableFlagLatest: false
    }
  },
  mounted () {
    this.sortType = this.$route.query.sortType || 'dRT'
    this.disableFlag()
  },
  methods: {
    disableFlag () {
      if (this.sortType === 'dRT') {
        this.disableFlagDRT = true
        this.disableFlagDFav = false
        this.disableFlagLatest = false
      } else if (this.sortType === 'dFav') {
        this.disableFlagDRT = false
        this.disableFlagDFav = true
        this.disableFlagLatest = false
      } else if (this.sortType === 'Latest') {
        this.disableFlagDRT = false
        this.disableFlagDFav = false
        this.disableFlagLatest = true
      }
    }
  }
}
</script>

<style>
.sortbtn-container-tweet {
  display: flex;
  justify-content: flex-start;
}

.sortbtn-container-tweet a {
  text-decoration: none;
}

.sortType-btn-tweet {
  color: var(--text-color-main);
  padding: 10px;
}

.sortType-btn-tweet:hover {
  color: var(--text-color-sub-hover);
}

.is-disabled-tweet {
  pointer-events: none;
  color: var(--text-color-main-hover);
}
</style>
