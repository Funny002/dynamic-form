import {PropArray, PropString} from '../../utils/Props';
import {hasType} from '../../utils/Type';

const getContent = (h, self, long) => self.getList.map(({label, value}, keys) => {
  return h('el-button', {
    key: `ButtonGroup_${keys}`,
    on: {click: function () {self.$emit('change', value);}},
    props: {size: 'mini', type: self.value === value ? 'primary' : ''},
    style: `width: calc(100% / ${long}); padding-left: 0; padding-right: 0; text-align: center;`
  }, label);
});

export default {
  name: 'ButtonGroup',
  model: {prop: 'value', event: 'change'},
  props: {value: PropString(), data: PropArray([])},
  computed: {
    getList () {
      return [...this.data].map(value => {
        if (hasType(value, 'string')) {
          return {label: value, value};
        }
        return value;
      });
    }
  },
  render (h) {
    return h('el-button-group', {style: 'width: 100%', props: {size: 'mini'}}, getContent(h, this, this.getList.length));
  }
};
