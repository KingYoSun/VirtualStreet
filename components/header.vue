<template>
  <div class="header-wrapper">
    <div class="wrapper">
      <div class="header">
        <n-link to="/" class="header-top-link">
          <main-title />
        </n-link>
        <div class="search-form">
          <search-form />
        </div>
      </div>
      <div class="main-description">
        <h5>VRCSnap!はTwitterからVRChatのスナップっぽい画像を収集するサイトです</h5>
      </div>
    </div>
  </div>
</template>

<script>
import MainTitle from '~/components/parts/header/title.vue'
import SearchForm from '~/components/parts/searchForm.vue'

export default {
  components: {
    MainTitle,
    SearchForm
  }
}
</script>

<style>
.header-wrapper{
  background-color: transparent;
}

.main-description {
  color: var(--text-color-main);
  margin-left: 8px;
}

.header {
  color: var(--text-color-main);
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
}

.header-top-link {
  height: 50px;
}

.search-form {
  margin-left: auto;
}

.header h1{
  width: auto;
  padding-right: 6px;
}

.main-logo {
  height: 100%;
}

.main-title {
  height: 100%;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li {
  display: inline-block;
  padding: 5px;
}
</style>
