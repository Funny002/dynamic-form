<template>
  <div class="var-dynamic__lockerForm" style="padding: 0;">
    <div style="padding: 10px 10px 0;">
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">内容</div>
        <div class="var-dynamic__lockerForm--body">
          <el-input v-model="value['value']" size="mini" @change="v => onUpdate('value', v)"/>
        </div>
      </div>
      <alert type="warning" show-icon :closable="false" style="padding: 2px 10px; margin: 5px 0;" title="会继承父级的样式"/>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">位置</div>
        <div class="var-dynamic__lockerForm--body">
          <button-group v-model="value['textAlign']" :data="['left', 'center', 'right']" @change="v => onUpdate('textAlign', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">粗细</div>
        <div class="var-dynamic__lockerForm--body">
          <input-number :min="0" :max="900" :step="100" step-strictly v-model="value['fontWeight']" size="mini" @change="v => onUpdate('fontWeight', v)" style="width: 100%"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">行高</div>
        <div class="var-dynamic__lockerForm--body">
          <input-number :min="1" :max="10" :step="0.1" step-strictly :precision="1" v-model="value['lineHeight']" size="mini" @change="v => onUpdate('lineHeight', v)" style="width: 100%"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">大小</div>
        <div class="var-dynamic__lockerForm--body">
          <input-number :min="12" :step="1" step-strictly v-model="fontSize" size="mini" @change="onInput" style="width: 100%"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Alert, InputNumber} from 'element-ui';
import {PropObject} from '../../utils/Props';
import ButtonGroup from '../../lib/packages/ButtonGroup';

export default {
  name: 'Title',
  model: {prop: 'value', event: 'change'},
  components: {Alert, InputNumber, ButtonGroup},
  props: {value: PropObject({})},
  data: function () {
    let fontSize = undefined;
    if (this.value.fontSize) {
      fontSize = (this.value.fontSize || '').replace(/[^\d]/g, '');
    }
    return {
      fontSize
    };
  },
  methods: {
    onInput (value) {
      this.onUpdate('fontSize', value + 'px');
    },
    onUpdate (name, value) {
      const data = {...this.value};
      data[name] = value;
      this.$emit('change', data);
    }
  }
};
</script>
