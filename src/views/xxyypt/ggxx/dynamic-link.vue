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
			return () => import(`./temp/${this.type}`)
		},
	},
	mounted() {
		this.loader()
				.then(() => {
					this.component = () => this.loader();
					//console.log(this.component);
				})
				.catch(() => {
					console.log("dynamic-link type ERROR!");
				})
	},
	methods:{
		change: function(val){
			console.log(val);
			this.loader()
					.then(() => {
						this.component = () => this.loader();
						//console.log(this.component);
					})
					.catch(() => {
						console.log("dynamic-link type ERROR!");
					})
		},
	}
}
</script>

<style>
</style>
