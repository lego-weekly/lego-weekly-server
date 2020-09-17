<template>
  <div>
    <a-layout class="layout-container">
      <a-layout-header>
        <nuxt-link to="/" class="title">GT Weekly! 前端小报</nuxt-link>
      </a-layout-header>
      <Nuxt />
      <a-layout-footer class="layout-footer">
        <p>Copyright © 2018-2019 By Gt Team</p>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.layout-container {
  margin: 0 auto;
  min-height: 100vh;
}

.layout-footer {
  background-color: #2e3033;
  text-align: center;
  color: #fff;
}

.title {
  display: block;
  font-weight: 300;
  font-size: 20px;
  color: #fff;
  letter-spacing: 1px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
