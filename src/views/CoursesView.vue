<template>
  <div class="wrapper">
  <Header/>
  <main>
  <Courses />
  </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Courses from '@/components/Courses.vue';

export default {
	name: 'CoursesView',
	components: {
		Courses,
		Header
	}
};
</script>

<style scoped>
.wrapper {
  margin: 150px auto 0;
  max-width :1100px;
  }

</style>
