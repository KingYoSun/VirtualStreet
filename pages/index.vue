<template>
  <div class="wrapper">
    <div class="container">
      <div>
        <logo />
        <h1 class="title">
          Top Page
        </h1>
        <h2 class="subtitle">
          Virtual Street Nuxt.js project
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  layout: 'default',
  components: {
    Logo
  },
  data () {
    return {
      title: 'TOP'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description', name: 'description', content: 'This is Top Page'
        }
      ]
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
</style>
