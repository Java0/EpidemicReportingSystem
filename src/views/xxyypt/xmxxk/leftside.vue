<template>
	<div>
	<el-col>
		<el-row span="12" v-for="item in mytools" :key="item.id">
			<div class="thisdiv" @click="toolselect" :ref="item.id" :id="item.id">
				<el-image style="width: 50px; height: 50px" :src = "require('./common/pic/' + item.icon)" v-show="item.icon" @error="errorImg"></el-image>
				<p>{{item.title}}</p>
			</div>
		</el-row>
	</el-col>
	</div>
</template>

<script>
	import tools from "./common/const/toollist.json";
	
	export default {
		name: "leftside",
		data () {
			return {
				mytools : {},
				
			}
		},
		mounted: function() {
			this.init();
		},
		methods:{
			toolselect:function(e){
				//console.log(e)
				e.target.className="selecteddiv";
				this.$emit("leftSelect",e.target.id);
			},
			init:function(){
				//console.log(tools);
				this.mytools = tools;
				for(let i = 0; i < this.mytools.length; i++)
				{
					//this.mytools[i].icon = "./common/pic/" + tools[i].icon;
					//console.log(this.mytools[i].icon)
				}
			},
			errorImg:function(e){
				console.log(e);
			}
		}
	}
</script>

<style>
	.thisdiv{
		border:1px dashed #ff0000;
		height: 98%;
		width: 98%;
	}
	.selecteddiv{
		border:1px dashed #00ff00;
		height: 98%;
		width: 98%;
	}
</style>
