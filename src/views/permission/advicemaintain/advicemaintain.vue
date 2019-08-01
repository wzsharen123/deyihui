<template>
  <div>
    <div class="zuobian">
      <div style="margin-bottom: 20px;">
        <el-button size="small" @click="addTab(editableTabsValue)">
          添加医嘱
        </el-button>
      </div>
      <el-tabs
        v-model="editableTabsValue"
        type="card"
        closable
        :tab-position="tabPosition"
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="index"
          :label="item.title"
          :name="item.name"
        >
          {{ item.content }}
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="youbiande">
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
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase())
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabPosition: 'left',
      editableTabsValue: '2',
      editableTabs: [
        {
          title: '主要医嘱',
          name: '1'
        }
      ],
      tabIndex: 2,

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
    addTab(targetName) {
      const newTabName = ++this.tabIndex + ''

      // 提示框开始
      this.$prompt('请输入内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          this.editableTabs.push({
            title: value,
            name: newTabName
          })

          this.editableTabsValue = newTabName
          this.$message({
            type: 'success',
            message: '您添加的是' + value
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })

      // 提示框结束

      // this.editableTabs.push({
      //   title: 'New Tab',
      //   name: newTabName,
      //   content: 'New Tab content'
      // });
    },
    removeTab(targetName) {
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    },
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
.zuobian{
	float: left;
	width: 130px;
}
.el-tabs--left.el-tabs--card .el-tabs__item.is-left.is-active {
  border: 1px solid #dfe4ed;
  border-right-color: green;
  border-left: none;
  border-bottom: none;
}
.youbiande {
  width: calc(100% - 140px);
  float: right;
}
</style>

