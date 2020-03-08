<template>
  <div class="user-search-form">
    <input v-model="keyword" type="text" placeholder="ユーザー検索" class="search-input-form" @keydown.enter="updateQuery">
    <n-link :to="{ name: 'search', query: {keyword: keyword}}" class="submit-keyword">
      <search-icon />
    </n-link>
  </div>
</template>

<script>
import SearchIcon from '~/components/parts/searchForm/searchIcon.vue'

export default {
  name: 'SearchForm',
  components: {
    SearchIcon
  },
  data () {
    return {
      keyword: ''
    }
  },
  mounted () {
    this.keyword = this.$route.query.keyword || ''
  },
  methods: {
    updateQuery () {
      this.$router.push({ name: 'search', query: { keyword: this.keyword } })
    }
  }
}
</script>

<style>
.user-search-form {
  position: relative;
}

.search-input-form {
  width: 100%;
  height: 2em;
  border: solid 1px var(--border-color);
  border-radius: 16px;
  outline: none;
  padding: 2px 28px 2px 10px;
}

.search-input-form:focus {
  border: solid 1px var(--text-color-main);
  box-shadow: 1px 1px 5px var(--border-dark), -1px -1px 5px var(--border-dark);
}

.submit-keyword {
  position: absolute;
  top: 3px;
  right: 10px;
}

#search-icon {
  width: 15px;
  height: 15px;
}
</style>
