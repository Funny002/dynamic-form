import {PropObject} from '../utils/Props';
import {reArray} from '../utils/Object';

const PropsName = ['size', 'disabled', 'labelWidth', 'labelSuffix', 'showMessage', 'statusIcon', 'labelPosition', 'hideRequiredAsterisk'];

export default {
  name: 'FormModels',
  inject: ['dragGable'],
  props: {
    item: PropObject({}),
    model: PropObject({}),
    rules: PropObject({})
  },
  computed: {
    getProps () {
      const props = reArray(PropsName, this.item || {});
      props['model'] = this.model;
      props['rules'] = this.rules;
      /** 当为编辑模式的时候禁用 */
      if (this.dragGable) props.disabled = true;
      return props;
    }
  },
  render (h) {
    return h('el-form', {props: this.getProps}, this.$slots.default);
  }
};
