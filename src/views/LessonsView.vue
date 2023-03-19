<template>
  <div class="wrapper">
    <Header/>
    <main>
     <Lessons />
     </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Lessons from '@/components/Lessons.vue';

export default {
	name: 'LessonsView',
	components: {
		Header,
		Lessons
	}
};
</script>
<style scoped>
.wrapper {
  margin: 150px auto 0;
  max-width :1100px;
  }
</style>
