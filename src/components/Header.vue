<template>
  <header class="header">
    <div>
      <a class="logo" href="/courses">COURSES</a>
    </div>
  </header>
</template>

<script>
export default {
	name: 'header-component'
};
</script>

<style scoped>
.header {
  height: 100px;
  position: fixed;
  top: 0;
  left: 50%;
  width: 100%;
  border-bottom: 2px solid #008000;
  background-color: #ffffff;
  transform: translateX(-50%);
  z-index: 100;
}
.header div {
  width: 1100px;
  height: 100%;
  padding: 0 10px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.header .logo {
  font-size: 36px;
  line-height: 42px;
  color: #008000;
  display: block;
  font-weight: 700;
  letter-spacing: 1px;
}

@media all and (max-width: 768px){
  .header div {
  padding: 0 20px;
}
}
</style>
