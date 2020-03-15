<template>
  <div class="footer">
    <a href="/terms" target="_blank">
      利用規約
    </a>
    <a href="/privacypolicy" target="_blank">
      プライバシーポリシー
    </a>
    <a href="https://twitter.com/knotted221" target="_blank">
      運営@KingYoSun
    </a>
  </div>
</template>

<style>
.footer {
  box-shadow: 5px 5px 20px var(--footer-background);
  color: white;
  text-align: center;
  background-color: var(--footer-background);
  position: fixed;
  bottom: 0;
  width: 100%;
}

.footer a {
  margin: 0 5px;
  font-size: 0.85em;
  text-decoration: none;
  color: white;
}

.footer a:hover{
  text-decoration: underline;
}
</style>
