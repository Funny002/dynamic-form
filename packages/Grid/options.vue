<template>
  <div class="var-dynamic__lockerForm" style="padding: 0;">
    <div style="padding: 10px 10px 0;">
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">栅格间隔</div>
        <div class="var-dynamic__lockerForm--body">
          <input-number :min="0" v-model="value['gutter']" size="mini" @change="v => onUpdate('gutter', v)" clearable style="width: 100%;"/>
        </div>
      </div>
      <alert type="warning" show-icon :closable="false" style="padding: 2px 10px; margin: 5px 0;" title="删除会把，内容一起删除"/>
    </div>
    <collapse>
      <collapse-item v-for="(col, key) in (value.childList || [])" :key="key" :name="key">
        <div slot="title" style="display: flex; align-items: center; padding-left: 10px; width: 100%;">
          <div style="font-weight: bold;">栅格序号:<span style="padding-left: 10px;">{{ key + 1 }}</span></div>
          <div style="margin: auto;"></div>
          <div class="var-dragGable__grid--btn">
            <div class="el-button--primary" @click.stop="onColPush(key)">
              <i class="el-icon-plus"></i>
            </div>
            <div class="el-button--danger" v-if="value.childList.length > 1" @click.stop="onColDelete(key)">
              <i class="el-icon-delete"></i>
            </div>
          </div>
        </div>
        <div class="var-dynamic__lockerForm--box" v-for="(item, keys) in colItem" :key="keys">
          <div class="var-dynamic__lockerForm--title">{{ item.label }}</div>
          <div class="var-dynamic__lockerForm--body">
            <input-number :min="item.min" :max="24" size="mini" v-model="col[item.name]" @click.native.stop @change="v => onInput(item.name, key, v)"/>
          </div>
        </div>
      </collapse-item>
    </collapse>
  </div>
</template>

<script>
import {Alert, InputNumber, Collapse, CollapseItem} from 'element-ui';
import {PropObject} from '../../utils/Props';
import {deepCopy} from '../../utils/Object';

export default {
  name: 'Grid',
  model: {prop: 'value', event: 'change'},
  components: {Alert, InputNumber, Collapse, CollapseItem},
  props: {
    value: PropObject({})
  },
  data: function () {
    return {
      colItem: [
        {name: 'span', min: 1, label: '栅格大小'},
        {name: 'offset', min: 0, label: '栅格左侧间隔'},
        {name: 'push', min: 0, label: '右移动格数'},
        {name: 'pull', min: 0, label: '左移动格数'}
      ]
    };
  },
  methods: {
    onColPush (keys) {
      this.value.childList.splice(keys + 1, 0, {span: 1, childList: []});
      this.onUpdate('childList', this.value.childList);
    },
    onColDelete (keys) {
      this.value.childList.splice(keys, 1);
      this.onUpdate('childList', this.value.childList);
    },
    onInput (name, key, value) {
      const childList = [...this.value.childList];
      if (value === 0) {
        delete childList[key][name];
      } else {
        childList[key][name] = value;
      }
      this.onUpdate('childList', childList);
    },
    onUpdate (name, value) {
      let val = deepCopy(this.value);
      val[name] = value;
      this.$emit('change', val);
    }
  }
};
</script>
