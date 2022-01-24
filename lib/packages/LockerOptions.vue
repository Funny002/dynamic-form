<template>
  <div class="var-dynamic__lockerForm" style="padding: 1px 10px;">
    <divider content-position="left" style="margin: 15px 0;">{{ value['title'] }}</divider>
    <div class="var-dynamic__lockerForm--box">
      <div class="var-dynamic__lockerForm--title">参数名</div>
      <div class="var-dynamic__lockerForm--body">
        <el-input v-model="value['prop']" size="mini" @change="v => onUpdate('prop', v)" clearable/>
      </div>
    </div>
    <template v-if="value['isFormItem']">
      <divider content-position="left" style="margin: 15px 0;">表单属性</divider>
      <alert type="warning" show-icon :closable="false" style="padding: 2px 10px; margin: 5px 0;" title="未设置时，会继承表单属性"/>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">
          <span>组件尺寸</span>
          <tooltip v-if="'size' in value" effect="dark" content="未继承表单属性" placement="top-start">
            <i class="el-icon-warning-outline" style="margin-left: 2px; color: #f48; cursor: pointer;"></i>
          </tooltip>
        </div>
        <div class="var-dynamic__lockerForm--body">
          <button-group v-model="value['size']" :data="['medium', 'small', 'mini']" @change="v => onUpdate('size', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">
          <span>标签宽度</span>
          <tooltip v-if="'labelWidth' in value" effect="dark" content="未继承表单属性" placement="top-start">
            <i class="el-icon-warning-outline" style="margin-left: 2px; color: #f48; cursor: pointer;"></i>
          </tooltip>
        </div>
        <div class="var-dynamic__lockerForm--body">
          <el-input v-model="labelWidth" size="mini" @input="labelWidthInput" clearable>
            <span slot="append">px</span>
          </el-input>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">
          <span>显示校验错误信息</span>
          <tooltip v-if="'showMessage' in value" effect="dark" content="未继承表单属性" placement="top-start">
            <i class="el-icon-warning-outline" style="margin-left: 2px; color: #f48; cursor: pointer;"></i>
          </tooltip>
        </div>
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
    <divider v-if="isOptions" content-position="left" style="margin: 15px 0;">自定义属性</divider>
  </div>
</template>

<script>
import {Input, Alert, Divider, Switch, Tooltip} from 'element-ui';
import {PropBoolean, PropObject} from '../../utils/Props';
import ButtonGroup from './ButtonGroup';

export default {
  name: 'LockerOptions',
  model: {prop: 'value', event: 'change'},
  components: {ElInput: Input, ElSwitch: Switch, ButtonGroup, Alert, Divider, Tooltip},
  props: {
    value: PropObject({}),
    isOptions: PropBoolean(false)
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
      this.labelWidth = value.replace(/[^\d]/g, '');
      this.onUpdate('labelWidth', this.labelWidth + 'px');
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
