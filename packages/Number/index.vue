<template>
  <form-item-models :item="item">
    <input-number v-model="value_[item.prop]" v-bind="getProp"/>
  </form-item-models>
</template>

<script>
import {InputNumber} from 'element-ui';
import {reArray} from '../../utils/Object';
import {PropObject} from '../../utils/Props';
import FormItemModels from '../../lib/FormItemModels';

export default {
  name: 'Number',
  inject: ['formValue'],
  components: {InputNumber, FormItemModels},
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
        'min',
        'max',
        'step',
        'stepStrictly',
        'precision',
        'size',
        'disabled',
        'controls',
        'controlsPosition',
        'placeholder'
      ], this.item);
    }
  }
};
</script>
