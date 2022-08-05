<template>
	<component :is="component" :data="data" v-if="component"/>
</template>

<script>
export default {
	name: 'dynamic-link',
	props: ['data', 'type'],
	data() {
		return {
			component: null,
		}
	},
	computed: {
		loader() {
			if (!this.type) {
				return null
			}
			return () => import(`./tools/${this.type}`)
		},
	},
	mounted() {
		this.loader()
				.then(() => {
					this.component = () => this.loader();
					//console.log(this.component);
				})
				.catch(() => {
					this.component = () => import('./tools/default');
				})
	},
	methods:{
		change: function(val){
			console.log("change:" + val);
			this.loader()
					.then(() => {
						this.component = () => this.loader();
						//console.log(this.component);
					})
					.catch(() => {
						this.component = () => import('./tools/default');
					})
		},
	}
}
</script>

<style>
</style>
