<template>
	<avue-data-tabs :option="option"></avue-data-tabs>
</template>

<script>
	export default {
		data(){
			return {
				option: {
					data: [
						{
							click: function (item) {
								alert(JSON.stringify(item));
							},
							title: '分类统计',
							subtitle: '实时',
							count: 7993,
							allcount: 10222,
							text: '当前分类总记录数',
							color: 'rgb(27, 201, 142)',
							key: '类'
						},
					]
				}
			}
		}
	}
</script>

<style>
</style>
