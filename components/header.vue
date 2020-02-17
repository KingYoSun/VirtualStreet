<template>
  <div class="header-wrapper">
    <div class="header">
      <h1>Sample Header!</h1>
      <ul class="menu">
        <li>メニュー1</li>
      </ul>
    </div>
  </div>
</template>

<style>
.header-wrapper{
  background-color: #EEE;
}
.header {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  max-width: 1340px;
  margin: 0 auto;
}
.header h1{
  width: auto;
  padding: 0 6px;
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
