<template>
  <div class="chact">
    <el-tabs :tab-position="tabPosition" style="">
      <el-tab-pane label="日常问候用语">
        <Jbingwenzhen />
      </el-tab-pane>
      <el-tab-pane label="疾病问诊用语">
        <jibinghuifu />
      </el-tab-pane>
      <el-tab-pane label="疾病回复用语">
        <Richang />
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import Jbingwenzhen from './chart/Jbingwenzhen'
import jibinghuifu from './chart/jibinghuifu'
import Richang from './chart/Richang'
export default {
  components: {
    Jbingwenzhen,
    jibinghuifu,
    Richang

  },
  data() {
    return {
      tabPosition: 'left'
    }
  }

}
</script>

<style lang="scss" scoped>

.chact{
  width: 97%;
  margin: 15px auto;

}

</style>

