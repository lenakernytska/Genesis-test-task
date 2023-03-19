<template>
  <div>
    <spinner :is-loading="isLoading"></spinner>
    <div v-if="!isLoading">
      <h1>{{ title }}</h1>
      <ul class="courses-list">
        <li class="courses-item" v-for="item in displayedItems" :key="item.id">
          <router-link :to="{ name: 'lessons', params: { courseId: item.id } }">
            <div>
              <h2>{{ item.title }}</h2>
              <img
                :src="item.previewImageLink + '/cover.webp'"
                :alt="item.title"
              />
              <div class="course-info-wrapper">
                <ul class="skills-list">
                  <li
                    class="skills-item"
                    v-for="skill in item.meta.skills"
                    :key="skill"
                  >
                    {{ skill }}
                  </li>
                </ul>
                <p class="item-lessons">{{ item.lessonsCount }} lessons</p>
                <div class="raiting-wrapper">
                  <p>{{ item.rating }}</p>
                  <img :src="require('@/assets/rating-star.png')" alt="Image" />
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <pagination v-model="page" :records="items.length" :per-page="10" />
    </div>
  </div>
</template>

<script>
import Pagination from 'vue-pagination-2';
import Spinner from '@/components/Spinner.vue';

export default {
	name: 'courses-component',
	components: {
		Pagination,
		Spinner
	},
	props: {
		title: {
			type: String,
			default: 'Our courses catalog'
		}
	},
	data() {
		return {
			items: [],
			page: 1,
			isLoading: true
		};
	},
	mounted() {
		fetch('https://api.wisey.app/api/v1/core/preview-courses', {
			headers: {
				Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNDVmMTRiYi0yZTMzLTQ5MzUtODU1Mi01YTIxZDhmNWNmNjUiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg4MjM0NzMsImV4cCI6MTY3OTcyMzQ3M30.lHBQx5uGQXji1NbqK1c6ARTX7JLlhhGzzlAbfhFJoio'
			}
		})
			.then((response) => response.json())
			.then((data) => {
				this.items = data.courses;
				this.isLoading = false;
			})
			.catch((error) => {
				console.error('Error fetching items:', error);
			});
	},
	computed: {
		displayedItems() {
			const start = (this.page - 1) * 10;
			const end = start + 10;

			return this.items.slice(start, end);
		}
	},
	watch: {
		currentPage() {
			this.page = Number(this.page);
		}
	}
};
</script>

<style>
.courses-list {
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 50px 0 20px;
}

.courses-item {
  flex: 0 0 46%;
  position: relative;
  box-shadow: 0px 23px 77px 0px rgba(69, 36, 165, 0.15);
  margin-bottom: 50px;
  background: #ffffff;
  padding: 10px 15px;
}

.courses-item a {
  text-decoration: none;
}

.courses-item img {
  width: 100%;
  height: auto;
}

.courses-item h2 {
  margin: 15px auto;
  text-align: center;
  max-width: 85%;
  height: 70px;
  color: #008000;
  font-size: 24px;
  font-weight: 700;
}

.raiting-wrapper {
  position: absolute;
  top: -29px;
  right: -15px;
  background-color: #ffffff;
  color: #008000;
  font-size: 20px;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 62px;
  height: 60px;
  padding: 10px;
  border: 1px solid #008000;
}

.raiting-wrapper img {
  width: 16px;
  margin: 0 0 2px 2px;
}
.raiting-wrapper p {
  margin: 0;
}

.course-info-wrapper {
  color: #000000;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px;
  font-size: 16px;
}

.skills-list{
  margin: 0 5px 0 0;
}
.skills-item::marker {
  color: #ff4500;
}

.item-lessons {
  color: #ff4500;
  font-size: 22px;
  font-weight: 700;
  margin: 0 20px 0 0;
}

@media all and (max-width: 768px) {
  .courses-item {
  flex: 0 0 100%;
}

.skills-list {
   padding: 0 0 0 5px;
}
}
</style>
