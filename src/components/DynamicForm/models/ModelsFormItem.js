const getProps = item => {
  console.log(item)
  return {}
}

export default {
  name: 'ModelsFormItem',
  render (h) {
    return h('el-from-item', {props: getProps(this.item)}, this.$slots.default)
  }
}
