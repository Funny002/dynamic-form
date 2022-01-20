import {PropObject} from '../utils/Props';

const PropsName = ['model', 'size', 'rules', 'disabled', 'labelWidth', 'labelSuffix', 'showMessage', 'statusIcon', 'labelPosition', 'hideRequiredAsterisk'];
export default {
  name: 'FormModels',
  props: {item: PropObject({})},
  computed: {
    getProps () {
      const PropsItem = this.item || {};
      return PropsName.reduce((value, keys) => {
        if (Object.prototype.hasOwnProperty.call(PropsItem, keys)) {
          value[keys] = PropsItem[keys];
        }
        return value;
      }, {});
    }
  },
  render (h) {
    return h('el-form', {props: this.getProps}, this.$slots.default);
  }
};
