<template>
	<LayoutMain>
        <template>
			<el-tabs type="border-card">
				<el-tab-pane label="项目列表" ref="tabxmlb">
					<avue-crud ref="crud"
										:option="tableOption"
										:data="data"
										:page="page"
										@on-load="onload"
										@current-change="getlist"
										@row-click="rowClick"
										@row-dblclick="rowDbClick">
					</avue-crud>
				</el-tab-pane>
				
				<el-tab-pane label="任务清单" ref="tabrwqd">
					<el-table :data="tableData" ref="abc"
							size="mini"
										style="width: 100%"
										border
										:height="tableHeight"
										:span-method="arraySpanMethod"
										:row-class-name="tableRowClassName"
										>
						<el-table-column prop="index"
															label="序号"
															align="left"
															header-align="center"
															fixed="left"
															width="50">
						</el-table-column>
						<el-table-column prop="jd"
															label="阶段"
															align="left"
															header-align="center"
															width="200">
						</el-table-column>
						<el-table-column prop="rw"
															align="left"
															header-align="center"
															label="任务"
															width="220">
						</el-table-column>
						<el-table-column prop="rw2"
															label=""
															align="left"
															header-align="center"
															width="200">
						</el-table-column>
						<el-table-column prop="rw3"
															label=""
															align="left"
															header-align="center"
															width="200">
						</el-table-column>
						<el-table-column prop="rw4"
															label=""
															align="left"
															header-align="center"
															width="200">
						</el-table-column>
						<el-table-column prop="yj"
															label="任务要件"
															align="left"
															header-align="center"
															width="200">
						</el-table-column>
						<el-table-column
															label="关键任务"
															align="center"
															header-align="center"
															width="100">
							<template slot-scope="scope">
								<input type="checkbox" v-model="scope.row.flag1"/>
							</template>
						</el-table-column>
						<el-table-column
															label="跳过"
															align="center"
															header-align="center"
															width="100">
							<template slot-scope="scope">
								<input type="checkbox" v-model="scope.row.flag2" v-if="!scope.row.flag1"/>
							</template>
						</el-table-column>
						<el-table-column
															label="档案归档"
															align="center"
															header-align="center"
															width="100">
							<template slot-scope="scope">
								<input type="checkbox" v-model="scope.row.flag3"/>
							</template>
						</el-table-column>
						<el-table-column
															label="完成状态"
															align="center"
															header-align="center"
															width="200">
							<template slot-scope="scope">
								<el-button :type="scope.row.buttonType" @click="openDialog" size="mini" :disabled="scope.row.flag2">
									{{scope.row.flag4}}
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
			<el-dialog title="任务办理" width="80%" height="90%" :visible.sync="dialogFormVisible">
				<rwbl></rwbl>
			</el-dialog>
        </template>
    </LayoutMain>
</template>

<script>
	import zljdsq from '../common/const/zljdsq.json'
	import xmrwData from '../common/const/xmrw.json'
	import rwbl from './rwbl.vue'
	
	export default {
		name: "rwqd",
		data () {
			return {
				dialogFormVisible: false,
				selectedRow:"",
				selectXmmc:"",
				selectXmbh:"",
				page: {
					currentPage: 1,
					total: 0,
					pageSize: 10
				},
				tableOption: {
					border: true,
					index: true,
					indexLabel: "序号",
					selection: false,
					selectionFixed: true,
					page: true,
					stripe: true,
					menu: false,
					menuBtn: false,
					excelBtn: false,
					height: 600,
					addBtn: false,
					columnBtn: false,
					refreshBtn:false,
					menuAlign: "center",
					align: "left",
					size: "mini",
					column: [
					{
						label: "项目编号",
						prop: "ZLJDSQBM",
						width: 120,
						slot: false,
						sortable: true,
						readonly: true,
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
				data: [],
				tableData:[],
				tableHeight:200
			}
		},
		mounted: function() {
			this.init();
			console.log(this.tableHeight);
			setTimeout(()=>{
			this.tableHeight = window.innerHeight - this.$refs.abc.$el.offsetHeight - 200
			,100});
			console.log(this.tableHeight);
		},
		components:{
			"rwbl": rwbl
		},
		methods: {
			init: function(){
				this.tableData = xmrwData;
				this.tableData[0].flag1 = true;
				for(let i = 0; i < this.tableData.length; i++)
				{
					//this.tableData[i].rws = this.tableData[i].rw + this.tableData[i].rw
					this.tableData[i].flag4 = "未完成";
					this.tableData[i].buttonType = "primary";
					if(i == 0)
					{
						this.tableData[i].flag4 = "已完成";
						this.tableData[i].buttonType = "success";
					}
					if(i == 3)
					{
						this.tableData[i].flag4 = "已完成";
						this.tableData[i].buttonType = "success";
					}
					if(i == 4)
					{
						this.tableData[i].flag4 = "已完成";
						this.tableData[i].buttonType = "success";
					}
					// console.log('for ' + i);
				}
				console.log('init finish');
			},
			onload: function(){
				//this.data = zljdsq;
				this.page.total = zljdsq.length;
				this.getlist(this.page.currentPage);
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
				// console.log(row);
				// this.selectedRow = row;
				// this.$refs.crud.toggleSelection();
				// this.$refs.crud.toggleSelection([this.data[row.$index]]);
				this.selectXmbh = row.ZLJDSQBM;
				this.selectXmmc = row.XMMC;
				
			},
			rowDbClick: function(row, event, column){
				this.selectXmbh = row.ZLJDSQBM;
				this.selectXmmc = row.XMMC;
				//this.$refs.tabrw.click();
				console.log(this.$refs);
				this.$refs.tabrwqd.tab.click();
			},
			onChange: function(){
				this.$message.success('修改:');
				this.$refs.crud.rowEdit(this.selectedRow);
				
			},
			onDel: function(){
				this.$message.success('删除:');
			},
			arraySpanMethod: function (row){
				
				//console.log(row);
				if(row.row.jd != "" && row.columnIndex == 1)
				{
					// let jd = row.row.jd;
					let i = 0;
					// console.log(row.rowIndex, row.columnIndex);
					// console.log(this.tableData[row.rowIndex + (i + 1)].jd == "");
					// console.log(this.tableData.length >= row.rowIndex + i);
					while(this.tableData.length > row.rowIndex + (i + 1) && this.tableData[row.rowIndex + (i + 1)].jd == "")
					{
						i++;
					}
					i++;
					// console.log("i:" + i, this.tableData.length, row.rowIndex + i);
					return {rowspan: i,colspan: 1};
				}else if(row.row.jd == "" && row.columnIndex == 1){
					return {rowspan: 0,colspan: 0};
				}
				if(row.row.rw != "" && row.columnIndex == 2)
				{
					let i = 0;
					// console.log(row.rowIndex, row.columnIndex);
					// console.log(this.tableData[row.rowIndex + (i + 1)].jd == "");
					// console.log(this.tableData.length >= row.rowIndex + i);
					while(this.tableData.length > row.rowIndex + (i + 1) && this.tableData[row.rowIndex + (i + 1)].rw == "")
					{
						i++;
					}
					//console.log("i:" + i, this.tableData.length, row.rowIndex + i);
					i++;
					return {rowspan: i,colspan: 1};
				}else if(row.row.rw == "" && row.columnIndex == 2){
					return {rowspan: 0,colspan: 0};
				}
			},
			tableRowClassName: function (row){
				//console.log(rowIndex);
				if(row.row.flag2 == true)
				{
					//console.log(row);
					return 'sikp-row';
				}
				if(row.row.flag1 == true)
				{
					//console.log(row);
					return 'key-row';
				}
			},
			openDialog:function(){
				//console.log("openDialog!");
				this.dialogFormVisible = true;
			}
		}
	}
</script>

<style>
	.el-table .sikp-row {
			background: #909399;
		}
	
	.el-table .finish-row {
		background: #67C23A;
	}
		
	.el-table .key-row {
		/* background: #67C23A; */
		font-weight: bolder;
	}
	
	.el-table .file-row {
		/* background: #67C23A; */
	}
</style>
