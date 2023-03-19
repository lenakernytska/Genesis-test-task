<template>
  <div v-if="showPopup" class="popup-overlay">
    <div class="popup"  >
      <div class="popup-header">
        <P>Lesson: {{ lessonNumber }}</P>
        <h2>{{ title }}</h2>
        <div class="button-wrapper">
        <button class="popup-close" @click="$emit('close')">&times;</button>
        </div>
      </div>
      <div class="popup-body" >
        <VideoPlayer
          class="video-player"
          :video-src="lessonLink"
          :video-id="videoId"
          :muted="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from './VideoPlayer.vue';


export default {
	name: 'popup-component',
	components: {
		VideoPlayer

	},
	data() {
		return {
			isLoading: true
		};
	},
	props: {
		title: {
			type: String,
			required: true
		},
		lessonNumber: {
			type: Number,
			required: true
		},
		showPopup: {
			type: Boolean,
			required: true
		},
		lessonLink: {
			type: String,
			required: true
		},
		videoId: {
			type: String,
			required: true
		}
	}
};
</script>

<style>
.popup {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  height: fit-content;
  overflow: hidden;
}

.popup-close {
  font-size: 35px;
  color: #999;
  cursor: pointer;
  background: transparent;
  border: none;
  display: block;
  position: absolute;
  top: 10px;
  right: 20px;
}


.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9998;
}

.popup .video-player {
  width: 100%;
  height: 100%;
}

@media all and (max-width: 768px){
.popup {
  width: 100%;
  height: fit-content;
}
}
</style>
