<template>
  <div class="var-dynamic__lockerForm" style="padding: 1px 10px;">
    <divider content-position="left" style="margin: 15px 0;">{{ value['title'] }}</divider>
    <div class="var-dynamic__lockerForm--box">
      <div class="var-dynamic__lockerForm--title">名称</div>
      <div class="var-dynamic__lockerForm--body">
        <el-input v-model="value['prop']" size="mini" @change="v => onUpdate('prop', v)" clearable/>
      </div>
    </div>
    <template v-if="value['isFormItem']">
      <divider content-position="left" style="margin: 15px 0;">表单属性</divider>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">组件尺寸</div>
        <div class="var-dynamic__lockerForm--body">
          <button-group v-model="value['size']" :data="['medium', 'small', 'mini']" @change="v => onUpdate('size', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">标签宽度</div>
        <div class="var-dynamic__lockerForm--body">
          <el-input v-model="labelWidth" size="mini" @input="labelWidthInput" clearable>
            <span slot="append">px</span>
          </el-input>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">显示校验错误信息</div>
        <div class="var-dynamic__lockerForm--body">
          <el-switch v-model="value['showMessage']" size="mini" @change="v => onUpdate('showMessage', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">是否必填</div>
        <div class="var-dynamic__lockerForm--body">
          <el-switch v-model="value['required']" size="mini" @change="v => onUpdate('required', v)"/>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {Input, Divider, Switch} from 'element-ui';
import ButtonGroup from './ButtonGroup';
import {PropObject} from '../../utils/Props';

export default {
  name: 'LockerOptions',
  model: {prop: 'value', event: 'change'},
  components: {ElInput: Input, Divider, ElSwitch: Switch, ButtonGroup},
  props: {
    value: PropObject({})
  },
  data: function () {
    return {
      labelWidth: ''
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
      this.labelWidth = (this.value.labelWidth || '').replace(/[^\d]/g, '');
    }
  }
};
</script>
