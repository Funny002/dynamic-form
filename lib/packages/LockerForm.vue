<template>
  <div class="var-dynamic__lockerForm">
    <div class="var-dynamic__lockerForm--box">
      <div class="var-dynamic__lockerForm--title">标签位置</div>
      <div class="var-dynamic__lockerForm--body">
        <button-group v-model="value['labelPosition']" :data="['left', 'right']" @change="v => onUpdate('labelPosition', v)"/>
      </div>
    </div>
    <div class="var-dynamic__lockerForm--box">
      <div class="var-dynamic__lockerForm--title">组件尺寸</div>
      <div class="var-dynamic__lockerForm--body">
        <button-group v-model="value['size']" :data="['medium', 'small', 'mini']" @change="v => onUpdate('size', v)"/>
      </div>
    </div>
    <div class="var-dynamic__lockerForm--box">
      <div class="var-dynamic__lockerForm--title">标签宽度</div>
      <div class="var-dynamic__lockerForm--body">
        <el-input :min="0" v-model="labelWidth" size="mini" @input="labelWidthInput" clearable>
          <span slot="append">px</span>
        </el-input>
      </div>
    </div>
    <div class="var-dynamic__lockerForm--box">
      <div class="var-dynamic__lockerForm--title">标签后缀</div>
      <div class="var-dynamic__lockerForm--body">
        <el-input :min="0" v-model="value['labelSuffix']" size="mini" @change="v => onUpdate('labelSuffix', v)" clearable/>
      </div>
    </div>
    <div class="var-dynamic__lockerForm--box">
      <div class="var-dynamic__lockerForm--title">校验结果反馈图标</div>
      <div class="var-dynamic__lockerForm--body">
        <el-switch v-model="value['statusIcon']" size="mini" @change="v => onUpdate('statusIcon', v)"/>
      </div>
    </div>
    <div class="var-dynamic__lockerForm--box">
      <div class="var-dynamic__lockerForm--title">显示校验错误信息</div>
      <div class="var-dynamic__lockerForm--body">
        <el-switch v-model="value['showMessage']" size="mini" @change="v => onUpdate('showMessage', v)"/>
      </div>
    </div>
    <div class="var-dynamic__lockerForm--box">
      <div class="var-dynamic__lockerForm--title">必填字段显示红色星号</div>
      <div class="var-dynamic__lockerForm--body">
        <el-switch v-model="value['hideRequiredAsterisk']" size="mini" @change="v => onUpdate('hideRequiredAsterisk', v)"/>
      </div>
    </div>
  </div>
</template>

<script>
import {Input, Switch} from 'element-ui';
import ButtonGroup from './ButtonGroup';
import {PropObject} from '../../utils/Props';

export default {
  name: 'LockerForm',
  model: {prop: 'value', event: 'change'},
  components: {ElInput: Input, ElSwitch: Switch, ButtonGroup},
  props: {
    value: PropObject({})
  },
  data: function () {
    return {
      labelWidth: '500',
      defaultValue: {
        size: 'mini',
        showMessage: true,
        labelWidth: '80px',
        labelPosition: 'left',
        hideRequiredAsterisk: true
      }
    };
  },
  watch: {
    value (value) {
      this.labelWidth = (value.labelWidth || '').replace(/[^\d]/g, '');
    }
  },
  mounted () {
    this.Initialize();
  },
  methods: {
    labelWidthInput (value) {
      value = value || '';
      if (this.labelWidth !== value) {
        this.labelWidth = value.replace(/[^\d]/g, '');
        this.onUpdate('labelWidth', this.labelWidth + 'px');
      }
    },
    onUpdate (name, value) {
      const val = {...this.value};
      val[name] = value;
      this.$emit('change', val);
    },
    Initialize () {
      const value = {...this.value};
      Object.keys(this.defaultValue).forEach((keys) => {
        if (!Object.prototype.hasOwnProperty.call(value, keys)) {
          value[keys] = this.defaultValue[keys];
        }
      });
      this.$emit('change', value);
      this.labelWidth = (value.labelWidth || '').replace(/[^\d]/g, '');
    }
  }
};
</script>
