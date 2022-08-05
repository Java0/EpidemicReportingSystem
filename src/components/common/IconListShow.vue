<template>
<div class="ui-fas">
<el-tabs >
    <el-tab-pane 
    v-for="(items, index) in iconList"
     :key="index"
     :label="items.label"
     :name="index+''">
        <ul class="fas-icon-list">
            <li v-for="(item, index) in items.list" :key="index" @click="selectedIcon(item)">
            <span>
                <i class="fas" :class="item" />
                <span>{{item}}</span>
            </span>
            </li>
        </ul>
    </el-tab-pane>
</el-tabs>
</div>
</template>
<script>
import iconList from '@/config/iconList' 
 export default {
    name: "IconListShow",
    components: {
        iconList
    },
    data() {
      return {
        iconList:iconList
      };
    },
    computed: {
     
    },
    created() {
    },
    methods: {
        selectedIcon(){

        }
    }
  };
</script>

<style>
.ui-fas .fas-icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0!important;
    border: 1px solid #eaeefb;
    border-radius: 4px;
}
.fas-icon-list li {
    float: left;
    width: 16.66%;
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;
}

.fas-icon-list li span {
    line-height: normal;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    color: #99a9bf;
    transition: color .15s linear;
}


.fas-icon-list li:after, .fas-icon-list li span {
    display: inline-block;
    vertical-align: middle;
}
.fas-icon-list li i {
    display: block;
    font-size: 32px;
    margin-bottom: 15px;
    color: #606266;
    transition: color .15s linear;
}
</style>