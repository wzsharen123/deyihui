<template>
  <div>
    <el-tabs :tab-position="tabPosition" style="">
      <el-tab-pane label="医生找药">
        <Yishengzhaoyao />
      </el-tab-pane>
      <el-tab-pane label="科室找药">
        <keshizhaoyao />
      </el-tab-pane>
      <el-tab-pane label="医生推荐">
        <yishengtuijian />
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
import Yishengzhaoyao from './medComents/Yishengzhaoyao'
import keshizhaoyao from './medComents/keshizhaoyao'
import yishengtuijian from './medComents/yishengtuijian'
export default {
  components: {
    Yishengzhaoyao,
    keshizhaoyao,
    yishengtuijian
  },
  data() {
    return {
      tabPosition: 'left'
    }
  }
}
</script>
