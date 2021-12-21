<template>
  <el-tabs>
    <el-tab-pane label="text">
      <drag-gable></drag-gable>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'TabsModels',
  model: {prop: 'value', event: 'change'},
  props: {
    value: {},
    item: {}
  },
  computed: {
    _value: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('change', value)
      }
    },
    props_ () {
      return {}
      // return getProps(this.item)
    }
  }
}
</script>
