<template>
   <LayoutMain>
        <template slot="left">
			<el-button type="primary" size="mini" @click="onChange">修改</el-button>
			<el-button type="primary" size="mini" @click="onDel">删除</el-button>
			<el-button type="primary" size="mini" @click="onStart">启动</el-button>
        </template>
        <template slot="right">
			<el-input class="el_input_search" v-model="searchForm.yhmc" size="mini" placeholder="请输入项目编号"/>
			<el-input class="el_input_search" v-model="searchForm.dwmc" size="mini" placeholder="请输入项目名称"/>
			<el-tooltip class="item" effect="dark" content="搜索" placement="top">
				<el-button type="default" icon="el-icon-search" circle size="small" @click="getlist"></el-button>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" content="刷新" placement="top">
				<el-button type="default" icon="el-icon-refresh" circle size="small" @click="getlist"></el-button>
			</el-tooltip>
        </template>
        <template >
           <avue-crud ref="crud"
							:option="tableOption"
							:data="data"
							:page="page"
							@on-load="onload"
							@current-change="getlist"
							@row-click="rowClick"
							@search-change="searchChange"
							style="height:100%">
			<template slot="ZLJDSQBM" slot-scope="scope" >
				<div name="abc" class="aaaaabb">{{scope.row.ZLJDSQBM}}</div>
			</template>
		</avue-crud>
        </template>
		<template slot="footer">
            <PageinationPlugin 
            :page="page"
            :render="onload" 
            :options="pageOption"></PageinationPlugin>
        </template>
    </LayoutMain>
</template>

<script>
	import zljdsq from '../common/const/zljdsq.json'
	import website from '@/config/website';
	export default {
		name: "xmcsh",
		data () {
			return {
				page: JSON.parse(JSON.stringify(website.page)),
				pageOption:{
					pageNumber:1,
					currentPage:1,
					pageSize:10
				},
				searchForm:{},
				selectedRow:"",
				tableOption: {
					title: "项目初始化",
					border: true,
					index: true,
					indexLabel: "序号",
					selection: true,
					selectionFixed: true,
					page: true,
					stripe: true,
					menu: false,
					menuBtn: true,
					excelBtn: false,
					menuAlign: "center",
					align: "left",
					size: "mini",
					searchBtn:true,
					searchShow:false,
					column: [
					{
						label: "项目编号",
						prop: "ZLJDSQBM",
						width: 120,
						slot: true,
						sortable: true,
						readonly: true,
						search: true,
						searchslot:false,
						rules: [
							{
								required: true,
								message: "填写项目名称后自动生成",
								trigger: "blur"
							}
						]
					},
					{
						label: "项目名称",
						prop: "XMMC",
						width: 240,
						sortable: true,
						rules: [
							{
								required: true,
								message: "请填写项目名称",
								trigger: "blur"
							}
						]
					},
					{
						label: "投资性质",
						prop: "TZXZ",
						width: "100",
						sortable: true,
						type: "select",
						slot: false,
						dicData: [
							{
								label: "成本",
								value: "成本"
							},
							{
								label: "投资",
								value: "投资"
							}
						]
					},
					{
						label: "投资类别",
						prop: "XMTZLX",
						slot: false,
						type: "select",
						//overHidden: true,
						dicData: [
							{
								label: "一类",
								value: "一类"
							},
							{
								label: "二类",
								value: "二类"
							},
							{
								label: "三类",
								value: "三类"
							},
							{
								label: "四类",
								value: "四类"
							}
						]
						},
						{
							label: "工程地点",
							prop: "GCDD",
							width: "200",
							editDisabled: true,
							formHeight: 200,
							type: "input",
							overHidden: true
						},
						{
							label: "建设单位",
							prop: "JSDW",
							width: "200",
							editDisabled: true,
							formHeight: 200,
							type: "input",
							overHidden: true,
						},
						{
							label: "总投资(万元)",
							prop: "TZE",
							width: "100",
							editDisabled: false,
							formHeight: 200,
							type: "number",
							align: "right",
							overHidden: true
						},
						{
							label: "项目概述",
							prop: "GMJJBGC",
							width: "300",
							//editDisabled: true,
							formHeight: 200,
							type: "textarea",
							span: 24,
							overHidden: true
						}
					]
				},
				data: []
			}
		},
		methods: {
			onload: function(){
				//this.data = zljdsq;
				this.page.total = zljdsq.length;
				this.getlist(this.pageOption.currentPage);
			},
			getlist: function(val){
				let thisdata = new Array;
				this.page.currentPage = val;
				for(let i = 0; i < this.page.pageSize; i++)
				{
					if((this.page.currentPage - 1) * this.page.pageSize + i < zljdsq.length)
					thisdata.push(zljdsq[(this.page.currentPage - 1) * this.page.pageSize + i]);
				}
				//console.log(thisdata);
				this.data = thisdata;
			},
			rowClick: function(row, event, column){
				//console.log(row);
				//console.log(row.$index);
				//console.log(event);
				console.log(column);
				this.selectedRow = row;
				this.$refs.crud.toggleSelection();
				this.$refs.crud.toggleSelection([this.data[row.$index]]);
			},
			onChange: function(){
				//this.$message.success('修改:' + this.selectedRow);
				if(this.selectedRow)
				{
					this.$refs.crud.rowEdit(this.selectedRow);
				}
			},
			onDel: function(){
				this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			},
			searchChange: function(params,done){
				done();
				this.$message.success(JSON.stringify(params))
			},
			
			onStart: function(){
				this.$confirm('请确认是否启动项目?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '启动成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '启动取消。'
					});          
				});
			}
		}
	}
</script>

<style>
	.aaaaabb {
		font-size: 12px;
	}
</style>
