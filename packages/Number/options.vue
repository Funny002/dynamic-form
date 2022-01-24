<template>
  <div class="var-dynamic__lockerForm" style="padding: 0;">
    <div style="padding: 10px 10px 0;">
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">占位文本</div>
        <div class="var-dynamic__lockerForm--body">
          <el-input v-model="value['placeholder']" size="mini" @change="v => onUpdate('placeholder', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">最大值</div>
        <div class="var-dynamic__lockerForm--body">
          <input-number :min="0" v-model="value['max']" size="mini" @change="v => onUpdate('max', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">最小值</div>
        <div class="var-dynamic__lockerForm--body">
          <input-number :min="0" v-model="value['min']" size="mini" @change="v => onUpdate('min', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">计数器步长</div>
        <div class="var-dynamic__lockerForm--body">
          <input-number :min="0" v-model="value['step']" size="mini" @change="v => onUpdate('step', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">数值精度</div>
        <div class="var-dynamic__lockerForm--body">
          <input-number :min="0" v-model="value['precision']" size="mini" @change="v => onUpdate('precision', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">控制按钮位置靠右</div>
        <div class="var-dynamic__lockerForm--body">
          <el-switch v-model="controlsPosition" size="mini"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">只能输入步长的倍数</div>
        <div class="var-dynamic__lockerForm--body">
          <el-switch v-model="value['stepStrictly']" size="mini" @change="v => onUpdate('stepStrictly', v)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Input, Switch, InputNumber} from 'element-ui';
import {PropObject} from '../../utils/Props';

export default {
  name: 'Number',
  model: {prop: 'value', event: 'change'},
  components: {ElInput: Input, ElSwitch: Switch, InputNumber},
  props: {value: PropObject({})},
  computed: {
    controlsPosition: {
      get () {
        return this.value['controlsPosition'] || false;
      },
      set (value) {
        this.onUpdate('controlsPosition', value ? 'right' : undefined);
      }
    }
  },
  methods: {
    onAutosize (name, value) {
      this.autosize[name] = value;
      if (value === 0) {
        delete this.autosize[name];
      }
      if (Object.keys(this.autosize).length === 0) {
        this.onUpdate('autosize', true);
      } else {
        this.onUpdate('autosize', {...this.autosize});
      }
    },
    onUpdate (name, value) {
      const data = {...this.value};
      data[name] = value;
      this.$emit('change', data);
      if (name === 'autosize' && value === false) this.autosize = {};
    }
  }
};
</script>
