<template>
  <div class="yisheng">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="hang">
        <el-form-item label="医生姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="手机号码" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
      </div>

      <div class="hang">
        <el-form-item label="医院" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="职称" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="李医生" value="shanghai" />
            <el-option label="王医生" value="beijing" />
          </el-select>
        </el-form-item>
      </div>

      <el-form-item label="科室" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="李医生" value="shanghai" />
          <el-option label="王医生" value="beijing" />
        </el-select>
      </el-form-item>

      <el-form-item label="资格证书" prop="delivery">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="1"
          width="300"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="医生证" prop="delivery">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="1"
          width="300"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="工作照片" prop="delivery">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="1"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="简介" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>

      <el-form-item label="学术任职" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>

      <el-form-item label="荣誉称号" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>

      <el-form-item label="专业特长" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="微信" prop="desc">
        <el-row class="weixintu">
          <el-card>
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              width="100%"
              class="image"
            >
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix" />
            </div>
          </el-card>
        </el-row>
      </el-form-item>

      <el-form-item label="特殊资源">
        <el-radio-group v-model="ruleForm.region">
          <el-radio label="待审核" />
          <el-radio label="审核通过" />
          <el-radio label="驳回" />
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.hang{
  z-index: -1;
  .el-form-item--medium{
    width: 50%;
    float: left;
  }
}
.el-input{
  width: 200px;
  z-index: 1000;
}
.el-form-item__content{
  z-index: 1000;
}
.el-select{
    z-index: 1000;
}
.yisheng {
  width: 97%;
  height: 100%;
  clear: both;

  margin: 20px auto;
  background: #fff;
  padding: 15px 20px;
  border-radius: 10px;
  .demo-ruleForm {
  }
}
.weixintu {
  width: 200px;
  height: 300px;
}
</style>

