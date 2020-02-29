<template>
  <div class="footer">
    <nuxt-link to="/terms">
      利用規約
    </nuxt-link>
  </div>
</template>

<style>
.footer {
  box-shadow: 0px 15px 30px var(--border-dark);
  color: var(--text-color-main);
  text-align: center;
  background-color: var(--background-color);
  position: fixed;
  bottom: 0;
  width: 100%;
}

.footer a {
  font-size: 0.85em;
  text-decoration: none;
  color: var(--text-color-main);
}

.footer a:hover{
  text-decoration: underline;
}
</style>
