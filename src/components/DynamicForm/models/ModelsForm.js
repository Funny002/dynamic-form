import { createProp, PropBoolean, PropObject, PropString } from "../utils/Props";
import { hasType } from "../utils/Type";

export default {
  name: 'ModelsForm',
  props: {
    model: PropObject({}),
    item: {
      labelSuffix: PropString(),
      statusIcon: PropBoolean(false),
      showMessage: PropBoolean(true),
      labelPosition: PropString('left'),
      labelWidth: createProp([String, Number]),
      hideRequiredAsterisk: PropString(false),
    },
  },
  computed: {
    props_ () {
      const {model, item} = this
      const props = {model, ...item}
      if (props.labelWidth && hasType(props.labelWidth, 'number')) {
        props.labelWidth += 'px'
      }
      return props
    }
  },
  render (h) {
    return h('el-form', {props: this.props_}, this.$slots.default)
  }
}
