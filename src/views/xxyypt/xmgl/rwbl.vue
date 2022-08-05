<template>
	<el-container>
		<el-container>
			<el-header>
				<el-row>
					<el-col :span="4">
							项目编号：
					</el-col>
					<el-col :span="8">
							XM-TLMYTYWZYXQQXMJ-2019-001
					</el-col>
					<el-col :span="4">
							项目名称：
					</el-col>
					<el-col :span="8">
							乙烯工程建设测试项目
					</el-col>
				</el-row>
			</el-header>
			<el-container>
				<el-main>
					<el-row class="myrow">
						<el-col :span="24" >
							<div align="left">
								项目要件：
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2" >
							<div align="left">
								模板：
							</div>
						</el-col>
						<el-col :span="20" >
							<div align="left">
								<el-button type="text">防洪评价评估报告模板.doc</el-button>
							</div>
						</el-col>
						<el-col :span="2" >
							<div align="left">
								<el-button type="primary" size='mini'>下载</el-button>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2" >
							<div align="left">
								Word：
							</div>
						</el-col>
						<el-col :span="20" >
							<div align="left">
								<el-button type="text">乙烯工程建设测试项目产能建设_防洪评价评估报告_V1.0（20190901）.docx</el-button>
							</div>
						</el-col>
						<el-col :span="2" >
							<div align="left">
								<el-button type="danger" size='mini'>删除</el-button>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2" >
							<div align="left">
								PDF：
							</div>
						</el-col>
						<el-col :span="20" >
							<div align="left">
								<el-button type="text"></el-button>
							</div>
						</el-col>
						<el-col :span="2" >
							<div align="left">
								<el-button type="primary" size='mini'>上传</el-button>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2" >
							<div align="left">
								模板：
							</div>
						</el-col>
						<el-col :span="20" >
							<div align="left">
								<el-button type="text">XXXXXX报告模板.doc</el-button>
							</div>
						</el-col>
						<el-col :span="2" >
							<div align="left">
								<el-button type="primary" size='mini'>下载</el-button>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2" >
							<div align="left">
								Word：
							</div>
						</el-col>
						<el-col :span="20" >
							<div align="left">
								<el-button type="text">乙烯工程建设测试项目产能建设_XXXXX报告_V1.0（20190901）.docx</el-button>
							</div>
						</el-col>
						<el-col :span="2" >
							<div align="left">
								<el-button type="danger" size='mini'>删除</el-button>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2" >
							<div align="left">
								PDF：
							</div>
						</el-col>
						<el-col :span="20" >
							<div align="left">
								<el-button type="text">乙烯工程建设测试项目产能建设_XXXXX报告_V1.0（20190901）.pdf</el-button>
							</div>
						</el-col>
						<el-col :span="2" >
							<div align="left">
								<el-button type="danger" size='mini'>删除</el-button>
							</div>
						</el-col>
					</el-row>
					<el-row class="myrow">
						<el-col :span="24" >
							<div align="left">
								项目合同：
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="3" >
							<div align="left">
								勘察合同：
							</div>
						</el-col>
						<el-col :span="15" >
							<div align="left">
								<el-button type="text">20012739001 乙烯工程建设测试项目勘察合同</el-button>
							</div>
						</el-col>
						<el-col :span="4" >
							<div align="left">
								<el-button type="text" size='mini'>库尔勒地质研究所</el-button>
							</div>
						</el-col>
						<el-col :span="2" >
							<div align="left">
								<el-button type="text" size='mini'>103万元</el-button>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="3" >
							<div align="left">
								设计合同：
							</div>
						</el-col>
						<el-col :span="15" >
							<div align="left">
								<el-button type="text">20012739003 乙烯工程建设测试项目施工图设计合同</el-button>
							</div>
						</el-col>
						<el-col :span="4" >
							<div align="left">
								<el-button type="text" size='mini'>大庆勘察设计院</el-button>
							</div>
						</el-col>
						<el-col :span="2" >
							<div align="left">
								<el-button type="text" size='mini'>1460万元</el-button>
							</div>
						</el-col>
					</el-row><el-row>
						<el-col :span="3" >
							<div align="left">
								施工合同：
							</div>
						</el-col>
						<el-col :span="15" >
							<div align="left">
								<el-button type="text">20012739003 乙烯工程建设测试项目电力工程建设合同</el-button>
							</div>
						</el-col>
						<el-col :span="4" >
							<div align="left">
								<el-button type="text" size='mini'>XX油建公司</el-button>
							</div>
						</el-col>
						<el-col :span="2" >
							<div align="left">
								<el-button type="text" size='mini'>2203万元</el-button>
							</div>
						</el-col>
					</el-row><el-row>
						<el-col :span="3" >
							<div align="left">
								施工合同：
							</div>
						</el-col>
						<el-col :span="15" >
							<div align="left">
								<el-button type="text">20012739001 乙烯工程建设测试项目勘察合同</el-button>
							</div>
						</el-col>
						<el-col :span="4" >
							<div align="left">
								<el-button type="text" size='mini'>库尔勒地质研究所</el-button>
							</div>
						</el-col>
						<el-col :span="2" >
							<div align="left">
								<el-button type="text" size='mini'>103万元</el-button>
							</div>
						</el-col>
					</el-row>
					<el-row class="myrow">
						<el-col :span="24" >
							<div align="left">
								规章制度：
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24" >
							<div align="left">
								<el-button type="text" size='mini'>塔里木油田公司地面建设工程项目管理办法</el-button>
							</div>
						</el-col>
					</el-row>
					
					<el-row>
						<el-col :span="24" >
							<div align="left">
								<el-button type="text" size='mini'>GB 50201-2014防洪标准</el-button>
							</div>
						</el-col>
					</el-row>
					<el-row class="myrow">
						<el-col :span="24" >
							<div align="left">
								任务历史：
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2" >
							<div align="left">
								任务启动：
							</div>
						</el-col>
						<el-col :span="12" >
							<div align="left">
								由XXX启动防洪评价的委托与合同签订、评估报告
							</div>
						</el-col>
						<el-col :span="2" >
							<div align="left">
								2019/12/12
							</div>
						</el-col>
						<el-col :span="2" >
							<div align="left">
								张强
							</div>
						</el-col>
					</el-row>
				</el-main>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		name: "rwqd",
		data () {
			return {
				
			}
		}
	}
</script>

<style scoped>
	.el-header, .el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		font-weight: bolder;
		line-height: 60px;
	}
	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}
	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		/* line-height: 160px; */
	}
	.myrow {
		background-color: #C5D9F1;
		color: #333;
		font-weight: bolder;
		/* line-height: 160px; */
	}
</style>
