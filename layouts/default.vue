<template>
  <div>
    <ex-header />
    <nuxt />
    <ex-footer />
  </div>
</template>

<script>
import ExHeader from '~/components/header.vue'
import ExFooter from '~/components/footer.vue'

export default {
  components: {
    ExHeader,
    ExFooter
  }
}
</script>

<style>
:root {
  --background-color: #0F4C81;
  --text-color-main: white;
  --text-color-main-hover: #bdbdbd;
  --text-color-sub: gray;
  --text-color-sub-hover: #bdbdbd;
  --retweet-color: #1dba65;
  --favorite-color: #d72a61;
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', '游ゴシック', YuGothic, 'メイリオ', Meiryo, 'ヒラギノ角ゴ ProN W3',
    'Hiragino Kaku Gothic ProN', 'ＭＳ Ｐゴシック', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: var(--background-color);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.wrapper{
  max-width: 1340px;
  margin: 0 auto;
}

h3 {
  font-size: 0.85em;
}

img:hover {
  opacity: 0.7;
}
</style>
