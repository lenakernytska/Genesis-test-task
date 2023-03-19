<template>
  <div>
    <Spinner :is-loading="isLoading"></Spinner>

    <div class="lesson-wrapper" v-if="!isLoading">
      <div class="lesson-description" v-if="contentLoaded">
        <h1>{{ items.title }}</h1>
        <p>{{ items.description }}</p>
        <ul class="skills-list">
          <li class="skills-item" v-for="skill in skills" :key="skill">
            {{ skill }}
          </li>
        </ul>
        <div class="raiting-wrapper" v-if="contentLoaded">
          <p>{{ items.rating }}</p>
          <img :src="require('@/assets/rating-star.png')" alt="star-icon" />
        </div>
      </div>
      <VideoPlayer
        class="video-player"
        :video-src="videoLink"
        v-if="contentLoaded && videoLink"
      />
      <ul class="lessons-list">
        <li
          class="lesson-item"
          v-for="lesson in items.lessons"
          :key="lesson.id"
        >
          <div class="image-wrapper">
            <img
              v-on:error="handleImageError"
              :src="
                lesson.previewImageLink + '/lesson-' + lesson.order + '.webp'
              "
              :alt="lesson.title"
            />
          </div>
          <div>
            <p>Lesson: {{ lesson.order }}</p>
            <h2>{{ lesson.title }}</h2>
            <button
              v-bind:disabled="lesson.status === 'locked' || !lesson.link"
              @click="showPopupForLesson(lesson)"
            >
              Watch
            </button>
            <img
              class="lesson-locked"
              v-if="lesson.status === 'locked' || !lesson.link"
              :src="require('@/assets/icon-locked.png')"
              alt="locked-icon"
            />
          </div>
        </li>
      </ul>
      <Popup
        :show-popup="showPopup"
        @close="closePopup"
        :title="popupTitle"
        :lesson-number="lessonNumber"
        :lesson-link="lessonLink"
        :video-id="lessonId"
      />
    </div>
  </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer.vue';
import Popup from '@/components/Popup.vue';
import Spinner from '@/components/Spinner.vue';

export default {
	name: 'lesson-component',
	components: {
		VideoPlayer,
		Popup,
		Spinner
	},
	data() {
		return {
			items: [],
			contentLoaded: false,
			showPopup: false,
			popupTitle: 'Lesson name',
			lessonNumber: 1,
			lessonLink: '',
			lessonId: '',
			noImageUrl: require('@/assets/no-image-available-icon.jpg'),
			isLoading: true
		};
	},

	mounted() {
		const courseId = this.$route.params.courseId;

		fetch(`https://api.wisey.app/api/v1/core/preview-courses/${courseId}`, {
			headers: {
				Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNDVmMTRiYi0yZTMzLTQ5MzUtODU1Mi01YTIxZDhmNWNmNjUiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg4MjM0NzMsImV4cCI6MTY3OTcyMzQ3M30.lHBQx5uGQXji1NbqK1c6ARTX7JLlhhGzzlAbfhFJoio'
			}
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.items = data;
				this.contentLoaded = true;
				this.isLoading = false;
			})
			.catch((error) => {
				console.error('Error fetching items:', error);
			});
	},
	methods: {
		closePopup() {
			this.showPopup = false;
			this.popupTitle = '';
		},
		handleImageError(event) {
			event.target.src = this.noImageUrl;
			event.target.classList.add('error-image');
		},

		showPopupForLesson(lesson) {
			this.showPopup = true;
			this.popupTitle = lesson.title;
			this.lessonNumber = lesson.order;
			this.lessonLink = lesson.link;
			this.lessonId = lesson.id;
		}
	},
	computed: {
		skills() {
			const skills = this.items.meta.skills;

			return skills;
		},
		videoLink() {
			if (this.items.meta.courseVideoPreview) {
				const videoLink = this.items.meta.courseVideoPreview.link;

				return videoLink;
			}

			return false;
		}
	}
};
</script>

<style scoped>
.lesson-wrapper {
  display: flex;
  box-shadow: 0px 23px 77px 0px rgba(69, 36, 165, 0.15);
  position: relative;
  flex-wrap: wrap;
  padding: 40px 50px;
  align-items: flex-start;
  justify-content: space-between;
  background: #ffffff;
}
.lesson-wrapper .lesson-description {
  flex: 0 0 48%;
}

.lesson-wrapper h1 {
  color: #008000;
}

.lesson-wrapper .skills-list {
  list-style: circle;
}

.lesson-wrapper .video-player {
  flex: 0 0 48%;
}

.lessons-list {
  flex: 0 0 100%;
  list-style: none;
  padding: 0;
}

.lesson-item {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: nowrap;
  position: relative;
  padding: 0 0 30px;
}

.lesson-item:not(:last-child) {
  margin: 30px 0 30px;
  border-bottom: 1px solid #ff4500;
}

.lesson-item div img {
  width: 100%;
  display: block;
  height: 100%;
}

.lesson-item div img.error-image {
  width: 60%;
  margin: 0 auto;
}

.lesson-item .image-wrapper {
  flex: 0 0 24%;
  margin: 0 20px 0 0;
  height: 120px;
}
.lesson-item div {
  flex: 0 0 78%;
}

.lesson-item p {
  color: #ff4500;
}

.lesson-item button {
  background: #008000;
  outline: none;
  color: #ffffff;
  border: none;
  padding: 3px 50px;
  border-radius: 8px;
}

.lesson-item button:disabled {
  opacity: 0.4;
}

.lesson-item .lesson-locked {
  position: absolute;
  width: 30px;
  top: 0;
  right: 0;
  height: auto;
}

@media all and (max-width: 991px) {
 .lesson-item .image-wrapper img {
  width: 200px;
 }
}

@media all and (max-width: 768px) {
  .lesson-wrapper .lesson-description,
  .lesson-wrapper .video-player {
  flex: 0 0 100%;
  margin: 0 0 20px;
}

.lesson-wrapper {
    padding: 30px 20px;
  }

 .lesson-item .image-wrapper {
  display: none;
 }

 .lesson-item div{
    flex: 0 0 100%;

}


}
</style>
