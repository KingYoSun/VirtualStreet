<template>
  <div class="header-wrapper">
    <div class="wrapper">
      <n-link to="/" class="header">
        <main-title />
      </n-link>
      <div class="main-description">
        <h5>VRCSnap!はTwitterからVRChatのスナップっぽい画像を収集するサイトです</h5>
      </div>
    </div>
  </div>
</template>

<script>
import MainTitle from '~/components/parts/header/title.vue'

export default {
  components: {
    MainTitle
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
  align-items: center;
  height: 50px;
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
