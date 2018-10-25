<template>
  <div class="footer">
    <router-link to="/home">首页</router-link>
    <router-link to="/list">列表</router-link>
    <router-link to="/add">添加</router-link>
    <router-link to="/collect">收藏</router-link>
  </div>
</template>

<style scoped lang="less">

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
    border: 2px solid #cccccc;
    a {
      display: flex;
      color: #e4a3d0;
      flex-direction: column;
      flex: 1;
      align-items: center;
      justify-content: center;
    }
  }
</style>
