<template>
	<table style="width: 100%; height: 100%; border: #000000;" >
		<tr height="50%">
			<td width="50%">
				<div class="thisdiv" ref="div1" id="div1" @click.self="divclick">
					<dynamiclink data="123" :type="selectedtool1" ref="window1"/>
				</div>
			</td>
			<td width="50%">
				<div class="thisdiv" ref="div2" id="div2" @click.self="divclick">
					<dynamiclink data="123" :type="selectedtool2" ref="window2"/>
				</div>
			</td>
		</tr>
		<tr height="50%">
			<td width="50%">
				<div class="thisdiv" ref="div3" id="div3" @click.self="divclick">
					<dynamiclink data="123" :type="selectedtool3" ref="window3"/>
				</div>
			</td>
			<td width="50%">
				<div class="thisdiv" ref="div4" id="div4" @click.self="divclick">
					<dynamiclink data="123" :type="selectedtool4" ref="window4"/>
				</div>
			</td>
		</tr>
	</table>
</template>

<script>
	import dynamiclink from "./dynamic-link.vue"
	
	export default {
		name: "xmxxk",
		data () {
			return {
				selecteddiv : "",
				windowIndex : -1,
				selectedtool1 : "default",
				selectedtool2 : "default",
				selectedtool3 : "default",
				selectedtool4 : "default",
			}
		},
		methods:{
			divclick:function(e){
				//e.target.className = "selecteddiv";
				
				var div1 = this.$refs.div1;
				var div2 = this.$refs.div2;
				var div3 = this.$refs.div3;
				var div4 = this.$refs.div4;
				var divs = [div1, div2, div3, div4];
				//console.log(divs.length)
				for(let i = 0 ; i < divs.length; i++){
					divs[i].className = "thisdiv";
					if(divs[i].id === e.target.id)
					{
						console.log("divs[i].id === e.target.id:" + e.target.id);
						e.target.className = "selecteddiv";
						if(i == 0)
						{
							this.selecteddiv = this.$refs.window1;
						}else if(i == 1)
						{
							this.selecteddiv = this.$refs.window2;
						}else if(i == 2)
						{
							this.selecteddiv = this.$refs.window3;
						}else if(i == 3)
						{
							this.selecteddiv = this.$refs.window4;
						}
						this.windowIndex = i;
					}
				}
				console.log(this.selecteddiv);
				this.$emit("divSelect",e.target.id);
			},
			toolchange: function (val){
				console.log("toolchange:" + this.selecteddiv);
				if(this.selecteddiv)
				{
					console.log("toolchangeIndex:" + this.windowIndex);
					if(this.windowIndex == 0)
					{
						this.selectedtool1 = val;
					}else if(this.windowIndex == 1)
					{
						this.selectedtool2 = val;
					}else if(this.windowIndex == 2)
					{
						this.selectedtool3 = val;
					}else if(this.windowIndex == 3)
					{
						this.selectedtool4 = val;
					}
					//console.log("toolchangeIndex:" + this.selectedtool4);
					this.selecteddiv.change(val);
				}
			},
		},
		components:{
			"dynamiclink": dynamiclink
		},
	}
</script>

<style>
	.thisdiv{
		border:1px dashed #ff0000;
		height: 99%;
		width: 99%;
	}
	.selecteddiv{
		border:1px dashed #00ff00;
		height: 99%;
		width: 99%;
	}
</style>
