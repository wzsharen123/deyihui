<template>
  <div class="allzong">
    <div class="caozuo">
      <span class="rightCaozuo">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="dialogFormVisible = true"
        >添加助理</el-button>
        <el-button icon="el-icon-upload">保存</el-button>
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
          <el-table-column label="姓名(归属医生)" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="部门" width="120" />
          <el-table-column
            prop="address"
            label="患者数量"
            show-overflow-tooltip
          />
          <el-table-column
            prop="address"
            label="分配时间"
            show-overflow-tooltip
          />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="qiyongfenpei()">{{
                fenpei ? "启用分配" : "停止分配"
              }}</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="open"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div style="margin-top: 20px">
      <div class="block">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
    </div>

    <!-- 添加助理弹出框 -->
    <el-dialog title="添加助理" :visible.sync="dialogFormVisible" center>
      <tianjiazhuli />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tianjiazhuli from './tianjiazhuli/tianjiazhuli'

export default {
  components: { tianjiazhuli },
  data() {
    return {
      textarea: '',
      showWordLimit: true,
      adddialogVisible: false,
      remnant: 0,
      textInputMaxLength: 50,
      dialogFormVisible: false,
      fenpei: false,

      name: '',
      jiancheng: '',
      jianjie: '',
      formInline: {
        user: '',
        region: ''
      },
      currentPage4: 1, // 分页
      tableData: [
        {
          date: '1',
          name: '1',
          address: '1'
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
          { required: true, message: '请输入医院名称', trigger: 'blur' },
          { min: 1, max: 30, message: '最多30个字', trigger: 'blur' }
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
    descInput() {
      var txtVal = this.ruleForm.name.length
      if (txtVal > 30) {
        this.remnant = 30
      } else {
        this.remnant = txtVal
      }
    },

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
    },
    qiyongfenpei() {
      this.fenpei = !this.fenpei
    }
  }
}
</script>

<style lang="scss" scoped>
.allzong {
  background: #fff;
  width: 97%;
  margin: 20px auto;
  padding: 15px 0 20px 0;
  border-radius: 10px;
}
.rightCaozuo {
  margin-left: 15px;
}
.pagebefor {
  margin: 10px auto 0 auto;
  padding-bottom: 10px;
  border: 1px #f3f3f3 solid;
  width: 98%;
}
.block {
  text-align: center;
}
.shuoming {
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
