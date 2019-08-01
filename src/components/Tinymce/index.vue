<template>
  <div class="allzong">
    <div class="chresh clear">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="医院">
          <el-input v-model="formInline.user" placeholder="" />
        </el-form-item>
        <el-form-item label="科室">
          <el-input v-model="formInline.user" placeholder="" />
        </el-form-item>
        <el-form-item label="医生">
          <el-input v-model="formInline.user" placeholder="" />
        </el-form-item>
        <el-form-item label="微信昵称">
          <el-input v-model="formInline.user" placeholder="" />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="formInline.user" placeholder="" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="caozuo">
      <span class="rightCaozuo">
        <el-button
          type="success"
          icon="el-icon-download"
          style="float:right;margin-right:44px"
        >导出</el-button>
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
          <el-table-column type="selection" />
          <el-table-column label="医生姓名">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="pros" label="医院" width="120" />
          <el-table-column prop="keshi" label="科室" show-overflow-tooltip />
          <el-table-column prop="phone" label="手机号码" show-overflow-tooltip />
          <el-table-column prop="name" label="微信昵称" show-overflow-tooltip />
          <el-table-column prop="stact" label="状态" show-overflow-tooltip />
          <el-table-column prop="jinbi" label="金币余额" show-overflow-tooltip />
          <el-table-column label="操作" width="550">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleUpdate()">编辑</el-button>
              <el-button
                size="mini"
                @click="representative()"
              >医药代表</el-button>
              <el-button size="mini" @click="zhuli()">分配助理</el-button>
              <el-button
                size="mini"
                @click="dialogFormVisible = true"
              >患者二维码</el-button>
              <el-button
                size="mini"
                @click="dialoghaoyou= true"
              >好友二维码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <div class="block">
            <el-pagination background layout="prev, pager, next" :total="1000" />
          </div>
        </div>
      </template>
      <el-dialog
        :visible.sync="dialogFormVisible"
        width="30%"
        title="患者二维码"
        center
      >
        <div class="erweima">
          <p>医院:南方医院</p>
          <p>科室:眼鼻喉科</p>
          <p>医生:甜甜</p>
          <p class="tupian">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564565069326&di=5bbb815eae4a37d43714644521109328&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FF0ia7S03R9rBxzF51Uj2rBxS5czVyTRYia2Y018uIsmqsfzAmNJz5w1Z7flQsWjZVdf9z0zoIFOic8j9uR5hxgNQw%2F640%3Fwx_fmt%3Dpng"
              alt=""
            >
          </p>
          <p>扫码二维码随时与医生反馈病情</p>
        </div>
      </el-dialog>

      <el-dialog
        :visible.sync="dialoghaoyou"
        width="30%"
        title="邀请好友二维码"
        center
      >
        <div class="erweima">
          <p>医院:南方医院</p>
          <p>科室:眼鼻喉科</p>
          <p>医生:甜甜</p>
          <p class="tupian">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564565069326&di=5bbb815eae4a37d43714644521109328&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FF0ia7S03R9rBxzF51Uj2rBxS5czVyTRYia2Y018uIsmqsfzAmNJz5w1Z7flQsWjZVdf9z0zoIFOic8j9uR5hxgNQw%2F640%3Fwx_fmt%3Dpng"
              alt=""
            >
          </p>
          <p>扫码二维码随时与医生反馈病情</p>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '待审核',
          label: '待审核'
        },
        {
          value: '审核通过',
          label: '审核通过'
        },
        {
          value: '驳回',
          label: '驳回'
        },
        {
          value: '启用',
          label: '启用'
        },
        {
          value: '禁用',
          label: '禁用'
        }
      ],
      value: '',
      textarea: '',
      dialogFormVisible: false,
      dialoghaoyou: false,
      showWordLimit: true,
      adddialogVisible: false,
      remnant: 0,
      textInputMaxLength: 50,

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
          date: '德医汇',
          name: '德',
          address: '广东省广州市天河区人民医院对面',
          jinbi: 0,
          stact: '开启',
          pros: '南方医院',
          keshi: '泌尿科',
          phone: '13526545623'
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
    // 点击医药代表
    representative() {
      this.$router.push({
        name: 'DndListDemo',
        query: { id: 1 }
      })
    },
    // 点击助理
    zhuli() {
      this.$router.push({
        name: 'DragSelectDemo',
        query: { id: 1 }
      })
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleUpdate() {
      this.$router.push({
        name: 'DragKanbanDemo',
        query: { id: 1 }
      })
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
  width: 97%;
  margin: 20px auto;
  padding: 15px 0 20px 0;
  border-radius: 10px;
}
.caozuo {
  height: 26px;
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
text-align: center

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
.components-container {
  margin: 0px 0px;
  position: relative;
}
.erweima {
  text-align: center;
  .tupian {
    width: 90%;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
}
</style>
