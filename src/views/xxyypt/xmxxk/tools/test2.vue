<template>
	<avue-crud :data="tdata" :option="option" v-model="obj" @on-load="init"></avue-crud>
</template>

<script>
	import tzgg from "../common/const/tzgg.json"
	export default {
		name: "xmxxk",
		data () {
			return {
				tdata:[],
				obj:"",
				option:{
					title:'通知公告',
					page:false,
					menu: false,
					align:'center',
					menuAlign:'center',
					column:[
						{
							label:'通知类型',
							prop:'type'
						},
						{
							label:'标题',
							prop:'title'
						},{
							label: "日期",
							prop: "date",
							type: "date",
							format: "yyyy-MM-dd",
							valueFormat: "yyyy-MM-dd",
						}
					]
				}
			}
		},
		methods:{
			init: function(){
				console.log(this.tdata);
				this.tdata = tzgg;
				console.log(this.tdata);
			}
		}
		
	}
</script>

<style>
</style>
