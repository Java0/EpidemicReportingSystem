<template>
	<el-container style="height: 100%; border: 1px solid #eee">
		<el-header style="height: 400px; background-color: #B3C0D1">
			<el-row style="height:100%">
				<el-col style="height:100%" :span="18">
					<dynamiclink data="123" :type="inputValue" ref="main"/>
				</el-col>
				<el-col :span="6">
					<dynamiclink data="123" type="test2" />
				</el-col>
			</el-row>
		</el-header>
		<el-main>
			<el-row>
				<el-col :span="6" style="background: ##409EFF;">
					<dynamiclink data="123" type="test1" />
				</el-col>
				<el-col :span="6" style="background: ##409EFF;">
					<dynamiclink data="123" type="test4" />
				</el-col>
				<el-col :span="6" style="background: ##409EFF;">
					<dynamiclink data="123" type="test4" />
				</el-col>
				<el-col :span="6" style="background: ##409EFF;">
					<dynamiclink data="123" type="test4" />
				</el-col>
			</el-row>
		</el-main>
		<el-footer>
			<!--<div v-for="item in divs">
				<dynamiclink :data="item.sdata" :type="item.name" />
			</div>-->
			<el-select v-model="inputValue" placeholder="请选择" @change="inputChange">
					<el-option
						v-for="item in selectDiv"
						:key="item.value"
						:label="item.name"
						:value="item.value">
					</el-option>
				</el-select>
		</el-footer>
	</el-container>
</template>

<script>
	import dynamiclink from './dynamic-link.vue'
	
	export default {
		name: "flfg",
		data () {
			return {
				someData:"11",
				type:"test1",
				
				divs: [{
						name:"test1",
						sdata:"111"
					},
					{
						name:"test1",
						sdata:"222"
					},
					{
						name:"test1",
						sdata:"333"
					},
				],
				selectDiv: [
					{
						name:"test1",
						value:"test1"
					},
					{
						name:"test2",
						value:"test2"
					},
					{
						name:"test3",
						value:"test3"
					},
					{
						name:"test4",
						value:"test4"
					},
					{
						name:"myEchart",
						value:"echart"
					},
				],
				inputValue:"echart"
			}
		},
		components:{
			"dynamiclink": dynamiclink
		},
		methods:{
			inputChange : function (val) {
				this.$refs.main.change(val);
				//console.log(this.inputValue + " : " + val);
			},
		}
	}
</script>

<style>
</style>
