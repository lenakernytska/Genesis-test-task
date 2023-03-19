<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Josefin-Sans-Regular, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: #f5f5f5 !important;
  padding: 0 20px 100px;
}

/* Pagination custom styles */

.VuePagination__count.VuePagination__count {
  display: none !important;
}

.VuePagination {
  display: flex;
  justify-content: center;
}

.VuePagination__pagination-item .page-link,
.VuePagination__pagination-item.disabled > .page-link {
  border: 1px solid #008000;
  color: #008000;
  font-weight: 700;
}

.VuePagination__pagination-item .page-link.active {
  background: #008000;
  border: 1px solid #008000;
  font-weight: 700;
}

.VuePagination__pagination-item .page-link:hover {
  background: #008000;
  color: #ffffff;
  border: 1px solid #008000;
}
</style>
