<template>
  <div>
  <Pagination></Pagination>
  </div>
</template>

<script>
import Pagination from 'vue-pagination-2';

export default {
	name: 'pagination-component',
	components: {
		Pagination
	},
	props: {
		currentPage: {
			type: Number,
			required: true
		},
		perPage: {
			type: Number,
			required: true
		},
		totalItems: {
			type: Number,
			required: true
		}
	},
	methods: {
		loadData() {
			// Load data for the current page
			const startIndex = (this.currentPage - 1) * this.perPage;
			const endIndex = startIndex + this.perPage;

			this.items = this.allItems.slice(startIndex, endIndex);
		}
	}
};
</script>
