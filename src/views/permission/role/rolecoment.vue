<template>
  <div class="allzong">
    <div class="chresh">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="厂家名称">
          <el-input v-model="formInline.user" placeholder="" />
        </el-form-item>
        <el-form-item label="地址" prop="desc">
          <diqu />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="caozuo">

      <span class="rightCaozuo">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
        >新建</el-button>

        <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
        <el-button type="success" icon="el-icon-download" class="daochu">导出</el-button>
      </span>
    </div>

    <div class="pagebefor">
      <template>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="{
            'background-color': '#fafafa',
            color: 'rgb(0, 0, 0)'
          }"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="厂家名称" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="厂家介绍" width="120" />
          <el-table-column
            prop="address"
            label="厂家地址"
            show-overflow-tooltip
          />

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleUpdate()">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="open"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <div class="block">
            <el-pagination background layout="prev, pager, next" :total="1000" />
          </div>
        </div>
      </template>
      <el-dialog :visible.sync="dialogFormVisible">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="厂家名称" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>

          <el-form-item label="厂家介绍" hide-required-asterisk="false">
            <el-input v-model="ruleForm.desc" type="textarea" />
          </el-form-item>

          <el-form-item label="选择地区">
            <diqu />
          </el-form-item>

          <el-form-item label="详细地址">
            <el-input v-model="ruleForm.desc" type="textarea" />
          </el-form-item>
          <el-form-item style="text-align:right">
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >保存</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
          <p class="shuoming">
            创建者：张三 创建时间：2019-01-01 最后修改人：张三
            最后修改时间：2019-02-01 20:30
          </p>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import diqu from '../directive/diqu.vue'

export default {
  components: {
    diqu
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      currentPage4: 1, // 分页
      tableData: [
        {
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面'
        },
        {
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面'
        },
        {
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面'
        },
        {
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面'
        },
        {
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面'
        },
        {
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面'
        },
        {
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面'
        },
        {
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面'
        }

      ],
      multipleSelection: [],
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogStatus: '',
      dialogFormVisible: false,
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
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleUpdate() {
      this.dialogFormVisible = !this.dialogFormVisible
    },
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
    onSubmit() {
      console.log('submit!')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    open() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.allzong {

  background: #fff;
  width:100%;
  margin: 0 auto;
  padding: 15px 0 20px 0;
  border-radius: 10px;
}

.caozuo{
.rightCaozuo {

  margin-left: 15px;
  .daochu{
    float: right;
    margin-right: 15px
  }
}
}

.pagebefor {
  margin: 10px auto 0 auto;
  padding-bottom: 10px;
  border: 1px #f3f3f3 solid;
  width: 98%;
}
.block {
  margin: 0 auto;
  width: 70%;
}
.shuoming{
  padding-left: 100px;
  padding-top: 30px;
    color: #ccc;
  font-size: 12px;
}
.chresh {
  width: 98%;
  margin: 15px auto 0 auto;
}
</style>
