import { PropArray, PropString } from "../utils/Props";
import { hasType } from "../utils/Type";

const getContent = (h, self, long) => self.getList.map(({label, value}, keys) => {
  return h('el-button', {
    key: `ButtonGroup_${keys}`,
    on: {click: function () {self.$emit('change', value)}},
    props: {size: 'mini', type: self.value === value ? 'primary' : ''},
    style: {width: `calc(100% / ${long})`, paddingLeft: '0px', paddingRight: '0px', textAlign: 'center'},
  }, label)
})

export default {
  name: "ButtonGroup",
  model: {prop: 'value', event: 'change'},
  props: {value: PropString(), data: PropArray([])},
  computed: {
    getList () {
      return [...this.data].map(value => {
        if (hasType(value, 'string')) {
          return {label: value, value}
        }
        return value
      })
    }
  },
  render (h) {
    return h('el-button-group', {class: 'formConf__button'}, getContent(h, this, this.getList.length))
  }
}
