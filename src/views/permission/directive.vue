<template>
  <div class="">

    <inputs :list="options" @childByValue="childByValue" />

    <performance />

  </div>
</template>

<script>

import inputs from '@/components/input/input'

import performance from './performance/performance.vue'

export default {
  components: {
    performance,
    inputs

  },
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  },
  methods: {
    childByValue: function(childValue) {
      // childValue就是子组件传过来的值
      this.name = childValue

      console.log('我是父组件接收的值', this.name)
    }
  }

}

</script>

<style lang="scss" scoped>

</style>

