<template>
	<div id="myChart" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
	import echarts from 'echarts'
	
	export default {
		name: 'hello',
		data () {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		mounted(){
			this.drawLine();
		},
		methods: {
			drawLine(){
					// 基于准备好的dom，初始化echarts实例
					let myChart = echarts.init(document.getElementById('myChart'))
					// 绘制图表
					myChart.setOption({
							title: { text: '项目单位分布图' },
							tooltip: {},
							xAxis: {
									data: ["克拉","迪那","英买","塔中","东河","轮南"]
							},
							yAxis: {},
							series: [{
									name: '项目数',
									type: 'bar',
									data: [5, 20, 36, 10, 10, 20]
							}]
					});
			}
		}
	}
</script>

<style>
</style>
