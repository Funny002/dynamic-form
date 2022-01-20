import {PropObject} from '../utils/Props';

const PropsName = ['prop', 'label', 'labelWidth', 'required', 'rules', 'showMessage', 'size'];
export default {
  name: 'FormItemModels',
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
    return h('el-form-item', {props: this.getProps}, this.$slots.default);
  }
};
