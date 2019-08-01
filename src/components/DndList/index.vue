<template>
  <div class="dndList">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="姓名" width="180" />
      <el-table-column prop="name" label="性别" width="180" />
      <el-table-column prop="address" label="年龄" />
      <el-table-column prop="address" label="电话" />
      <el-table-column prop="address" label="经销商" />
      <el-table-column prop="address" label="状态" />
      <el-table-column prop="address" label="添加时间" />
    </el-table>

    <div class="fenye">
      <el-pagination background layout="prev, pager, next" :total="1000" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2',
          name: '2',
          address: '3'
        }

      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.dndList {
  width: 97%;
  margin: 15px auto;
  background: #fff;
  border-radius: 10px;
  padding: 15px;
}
.fenye {
  height: 50px;
  line-height: 50px;
  text-align: center;
  padding-top: 20px;
}
</style>

