<template>
  <div class="video-container">
    <video ref="video" :muted="muted" controls autoplay></video>
  </div>
</template>

<script>
import Hls from 'hls.js';

export default {
	name: 'video-component',
	props: {
		videoSrc: {
			type: String,
			required: true
		},
		videoId: {
			type: String,
			default: 'preview-video'
		},
		muted: {
			type: Boolean,
			default: true
		}
	},
	created() {
		this.loadVideoProgress();
		console.log('created');
	},
	mounted() {
		const video = this.$refs.video;

		video.addEventListener('timeupdate', this.handleTimeUpdate);

		if (Hls.isSupported()) {
			const hls = new Hls();

			hls.loadSource(this.videoSrc);
			hls.attachMedia(video);
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				video.currentTime = this.loadVideoProgress();
				video.play();
			});
		} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = this.videoSrc;
			video.currentTime = this.loadVideoProgress();
			video.addEventListener('loadedmetadata', () => {
				video.play();
			});
		}
	},
	beforeDestroy() {
		this.saveVideoProgress();
	},
	methods: {
		handleTimeUpdate() {
			const videoPlayer = this.$refs.video;

			if (videoPlayer !== undefined && this.videoId !== 'preview-video') {
				const currentTime = videoPlayer.currentTime;

				this.saveVideoProgress(this.videoId, currentTime);
			}
		},

		saveVideoProgress(videoId, progress) {
			const progressData =
        JSON.parse(localStorage.getItem('videoProgress')) || {};

			progressData[videoId] = progress;
			localStorage.setItem('videoProgress', JSON.stringify(progressData));
		},

		loadVideoProgress() {
			const progressData =
            JSON.parse(localStorage.getItem('videoProgress')) || {};

			console.log(progressData[this.videoId]);

			return progressData[this.videoId] || 0;
		}
	}
};
</script>

<style scoped>
.video-container {
  width: 100%;
  height: 100%;
}
.video-container video {
  width: 100%;
  height: 100%;
  aspect-ratio: 16/9;
}
</style>
