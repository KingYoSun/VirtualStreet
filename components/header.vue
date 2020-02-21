<template>
  <div class="header-wrapper">
    <div class="wrapper">
      <div class="header">
        <h1>Sample Header!</h1>
        <ul class="menu">
          <li>メニュー1</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.header-wrapper{
  background-color: transparent;
}
.header {
  color: white;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
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
