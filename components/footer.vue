<template>
  <div class="footer">
    <a href="/terms" target="_blank">
      利用規約
    </a>
    <a href="/privacypolicy" target="_blank">
      プライバシーポリシー
    </a>
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
  margin: 0 5px;
  font-size: 0.85em;
  text-decoration: none;
  color: var(--text-color-main);
}

.footer a:hover{
  text-decoration: underline;
}
</style>
