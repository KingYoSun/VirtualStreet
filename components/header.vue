<template>
  <div class="header-wrapper">
    <div class="wrapper">
      <a href="/" class="header">
        <div class="main-icon">
          <main-logo />
        </div>
        <main-title />
      </a>
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

.header {
  color: var(--text-color-main);
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}

.header h1{
  width: auto;
  padding-right: 6px;
}

.main-icon {
  width: 50px;
  height: 50px;
}

.main-title {
  margin-top: 3px;
  width: 245px;
  height: 50px;
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
