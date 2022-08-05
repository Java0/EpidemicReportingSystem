<template>
  <el-dialog :center="dialogOp.center" title="收货地址"  :visible.sync="dialogFormVisible"  @close="$emit('update:show', false)">
    <!--from model 和v-model　验证的数据来源 需要和内部的一样 -->
    <el-form ref="elform"  :model="formData" :rules="rules">
      <el-form-item label="用户名称：" :label-width="formLabelWidth" prop="name">
        <el-input v-model="formData.yhmc" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="单位名称：" :label-width="formLabelWidth">
          <el-input v-model="formData.dwmc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doOk">确 定</el-button>
      <el-button @click="doClose">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import api from 'npm-pansoft-base/lib/router/axios' // 改成对应的路径
  export default {
    data() {
      return {
        dialogFormVisible: this.show,
        dialogOp: {
          center : false
        },
        formLabelWidth: '120px',
        rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
        }
      }
    },
    created() {
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        formData:Object
    },
    watch: {
        show () {
            this.dialogFormVisible = this.show;
        }
    },
    methods: {
        doClose(){
          this.dialogFormVisible=false;
          //重置数据无效 this.$refs.elform.resetFields();
        },
        doOk(){
          this.$refs.elform.validate((valid) => {
            if (valid) {
              alert('submit!');
              this.dialogFormVisible=false;
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
    }
  }
</script>