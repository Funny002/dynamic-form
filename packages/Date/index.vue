<template>
  <form-item-models :item="item">
    <date-picker v-model="value_[item.prop]" v-bind="getProp"/>
  </form-item-models>
</template>

<script>
import {DatePicker} from 'element-ui';
import {reArray} from '../../utils/Object';
import {PropObject} from '../../utils/Props';
import FormItemModels from '../../lib/FormItemModels';

export default {
  name: 'Date',
  inject: ['formValue'],
  components: {DatePicker, FormItemModels},
  props: {item: PropObject({})},
  computed: {
    value_: {
      get () {
        return (this.formValue && this.formValue()) || {};
      },
      set (value) {
        this.formValue && this.formValue(value);
      }
    },
    getProp () {
      return reArray([
        'type',
        'readonly',
        'disabled',
        'size',
        'placeholder',
        'startPlaceholder',
        'endPlaceholder',
        'format',
        'valueFormat',
        'align',
        'popperClass',
        'pickerOptions',
        'defaultValue',
        'unlinkPanels'
      ], this.item);
    }
  }
};
</script>
