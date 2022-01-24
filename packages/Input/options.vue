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
        <div class="var-dynamic__lockerForm--title">头部图标</div>
        <div class="var-dynamic__lockerForm--body">
          <el-input v-model="value['prefixIcon']" size="mini" @change="v => onUpdate('prefixIcon', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">尾部图标</div>
        <div class="var-dynamic__lockerForm--body">
          <el-input v-model="value['suffixIcon']" size="mini" @change="v => onUpdate('suffixIcon', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">最大输入长度</div>
        <div class="var-dynamic__lockerForm--body">
          <input-number :min="0" v-model="value['maxlength']" size="mini" @change="v => onUpdate('maxlength', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">最小输入长度</div>
        <div class="var-dynamic__lockerForm--body">
          <input-number :min="0" v-model="value['minlength']" size="mini" @change="v => onUpdate('minlength', v)"/>
        </div>
      </div>
      <template v-if="value['type'] === 'textarea'">
        <template v-if="Boolean(value['autosize'])">
          <div class="var-dynamic__lockerForm--box">
            <div class="var-dynamic__lockerForm--title">自适应最小行数</div>
            <div class="var-dynamic__lockerForm--body">
              <input-number :min="1" v-model="autosize['minRows']" size="mini" @change="v => onAutosize('minRows', v)"/>
            </div>
          </div>
          <div class="var-dynamic__lockerForm--box">
            <div class="var-dynamic__lockerForm--title">自适应最大行数</div>
            <div class="var-dynamic__lockerForm--body">
              <input-number :min="1" v-model="autosize['maxRows']" size="mini" @change="v => onAutosize('maxRows', v)"/>
            </div>
          </div>
        </template>
        <div v-else class="var-dynamic__lockerForm--box">
          <div class="var-dynamic__lockerForm--title">输入框行数</div>
          <div class="var-dynamic__lockerForm--body">
            <input-number :min="1" v-model="value['rows']" size="mini" @change="v => onUpdate('rows', v)"/>
          </div>
        </div>
        <div class="var-dynamic__lockerForm--box" v-show="false">
          <div class="var-dynamic__lockerForm--title">
            <span>自适应内容高度</span>
            <tooltip effect="dark" content="会导致输入框行数失效" placement="top-start">
              <i class="el-icon-warning-outline" style="margin-left: 2px; color: #f48; cursor: pointer;"></i>
            </tooltip>
          </div>
          <div class="var-dynamic__lockerForm--body">
            <!-- element-ui 原子类型会检查失败 -->
            <el-switch :value="Boolean(value['autosize'])" size="mini" @change="v => onUpdate('autosize', v)"/>
          </div>
        </div>
      </template>
      <template v-for="(item, key) in styleList">
        <div class="var-dynamic__lockerForm--box" v-if="item.show !== false" :key="key">
          <div class="var-dynamic__lockerForm--title">{{ item.label }}</div>
          <div class="var-dynamic__lockerForm--body">
            <el-switch v-model="value[item.name]" size="mini" @change="v => onUpdate(item.name, v)"/>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {Input, Switch, Tooltip, InputNumber} from 'element-ui';
import {PropObject} from '../../utils/Props';

export default {
  name: 'Input',
  model: {prop: 'value', event: 'change'},
  components: {ElInput: Input, ElSwitch: Switch, Tooltip, InputNumber},
  props: {value: PropObject({})},
  data: function () {
    return {
      styleList: [
        /** type = password 生效 */
        {label: '显示切换密码图标', name: 'showPassword', show: this.value.type === 'password'},
        {label: '显示字数统计', name: 'showWordLimit'},
        {label: '自动获取焦点', name: 'autofocus'},
        {label: '是否可清空', name: 'clearable'},
        {label: '是否禁用', name: 'disabled'},
        {label: '是否只读', name: 'readonly'}
      ],
      autosize: {}
    };
  },
  mounted () {
    this.defaultValue();
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
    defaultValue () {
      const data = {...this.value};
      if (data.type === 'textarea') {
        if (!('rows' in data)) data['rows'] = 2;
      }
      this.$emit('change', data);
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
