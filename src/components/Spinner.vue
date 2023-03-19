<template>
  <div ref="spinnerTarget" v-if="isLoading" class="spinner-container">
    <i class="fa fa-spinner spinner"></i>
  </div>
</template>

<script>
import { Spinner } from 'spin.js';

export default {
	name: 'spinner-component',
	props: {
		isLoading: {
			type: Boolean,
			default: false
		}

	},


	mounted() {
		this.spinner = new Spinner({
			lines: 10,
			length: 8,
			width: 4,
			radius: 10,
			color: '#008000'
		}).spin(this.$refs.spinnerTarget);
		this.$on('metadata-loaded', () => {
			this.spinner.stop();
		});
	},
	beforeDestroy() {
		this.spinner.stop();
	}
};
</script>

<style>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.spinner {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
