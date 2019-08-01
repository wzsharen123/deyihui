<template>
  <div>
    <el-button
      icon="el-icon-circle-plus-outline"
      style="margin:10px 0 20px 40px"
      @click="bianjichang"
    >新增常用语</el-button>

    <div class="biaoge">
      <el-table
        :data="
          tableData.filter(
            data =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width:95%;margin:0 auto"
        :header-cell-style="{
          'background-color': '#fafafa',
          color: 'rgb(0, 0, 0)'
        }"
        border
      >
        <el-table-column label="用语内容" prop="date" />

        <el-table-column>
          <template slot="header" slot-scope="scope">
            操作
          </template>
          <template>
            <el-button size="mini" @click="bianjichang">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增常用用语弹出框 -->
    </div>

    <el-dialog :visible.sync="dialogFormVisible">
      <el-input
        v-model="textarea"
        type="textarea"
        placeholder="请输入内容"
        maxlength="30"
        show-word-limit
      />

      <div class="anniu">
        <el-button>取消</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      textarea: '',
      tableData: [
        {
          date: '你好呀'
        },
        {
          date: '请问需要什么帮助'
        },
        {
          date: '医生在忙请您稍后再来'
        },
        {
          date: '我们尽快跟您回复的'
        }
      ],
      search: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    bianjichang() {
      this.dialogFormVisible = !this.dialogFormVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.biaoge {
  margin: 0 auto;
}
.el-table_1_column_2.is-right {
  text-align: left;
}
.anniu {
  text-align: right;
  padding-top: 20px;
}
</style>
