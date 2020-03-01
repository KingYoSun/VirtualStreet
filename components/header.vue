<template>
  <div class="header-wrapper">
    <div class="wrapper">
      <a href="/" class="header">
        <main-logo />
        <main-title />
      </a>
      <div class="main-description">
        <h5>VRCSnap!はTwitterからVRChatのスナップっぽい画像を収集するサイトです</h5>
      </div>
    </div>
  </div>
</template>

<script>
import MainLogo from '~/components/parts/header/logo.vue'
import MainTitle from '~/components/parts/header/title.vue'

export default {
  components: {
    MainLogo,
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
