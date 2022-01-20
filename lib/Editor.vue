<template>
  <div class="var-dynamic var-dynamic-editor">
    <collapse class="var-dynamic__locker-left scroll-bar" v-model="collapse.value">
      <collapse-item v-for="(item, key) in collapse.data" :key="`collapse-${key}`" :name="`name-${key}`">
        <template slot="title">
          <icon :name="item.icon"></icon>
          <span class="var-dynamic__locker-left--title">{{ item.title }}</span>
        </template>
        <drag-gable tag="div" :list="item.childList" :group="{name: dragGable, pull: 'clone', put: false}" :sort="false" :move="onMove" @end="onLockerEnd" class="var-dynamic__locker-left--list">
          <template v-for="(child, childKey) in item.childList">
            <div :key="childKey" :icon="child.icon" class="var-dynamic__locker-left--btn el-button--primary is-plain">
              <i v-if="child.icon" :class="child.icon"></i>
              <span> {{ child.title }}</span>
            </div>
          </template>
        </drag-gable>
        <div v-show="!(item.childList || []).length" style="line-height: 60px; text-align: center; color: #999;">暂无数据</div>
      </collapse-item>
    </collapse>
    <form-models class="var-dynamic__body" :item="value" @click.native="reOptionsFunc">
      <drag-gable tag="div" :list="value.childList" :group="dragGable" :animation="200" class="var-dynamic__content scroll-bar">
        <editor-content v-for="(item, key) in (value.childList || [])" :key="`formModels-${key}`" :item="item" @delete="value.childList.splice( key,1)"/>
      </drag-gable>
      <empty class="var-dynamic__body--empty" v-show="!(value.childList || []).length" description="拖拽模组开始编辑"/>
    </form-models>
    <tabs class="var-dynamic__locker-right" v-model="lockerOptions.keys">
      <tab-pane label="Form表单属性" class="scroll-bar" name="default">
        <locker-form v-model="getFormConfig"/>
      </tab-pane>
      <tab-pane v-if="lockerOptions.value" label="表单属性" class="scroll-bar" name="options">
        <locker-options v-model="lockerOptions.value" @change="lockerOptions.callback"/>
        <divider content-position="left" style="margin: 15px 0;">自定义属性</divider>
      </tab-pane>
    </tabs>
  </div>
</template>

<script>
import formModels from './FormModels';
import vuedraggable from 'vuedraggable';
import EditorContent from './EditorContent';
import lockerForm from './packages/LockerForm';
import lockerOptions from './packages/LockerOptions';
import {Icon, Empty, Tabs, Divider, TabPane, Collapse, CollapseItem} from 'element-ui';
/* ------------------------------------------------------------------  */
import {Objects, Types, Props, Rand} from '../utils/index';
import {CollapseList, Models} from '../packages/index';

export default {
  name: 'DynamicFormEditor',
  model: {prop: 'value', event: 'change'},
  components: {EditorContent, formModels, lockerForm, lockerOptions, Icon, Tabs, Empty, Divider, TabPane, Collapse, CollapseItem, dragGable: vuedraggable},
  provide () {
    const self = this;
    return {
      dragGable: true,
      options: () => ({}), // 不需要但涉及
      models: () => Models,
      indexes: () => self.index, // 激活索引
      /** 方法下沉确保递归方式可以通讯 */
      setOptionsFunc (value, callback) {
        const types = Types.getType(value);
        if (types === 'object') {
          self.index = value.indexes;
          self.lockerOptions = {keys: 'options', value: {...value}, callback};
        } else {
          self.index = '';
          self.lockerOptions = {keys: 'default', value: undefined, callback: undefined};
          if (!['undefined', 'null'].includes(types)) console.error(new Error('无法解析的类型，请使用（\'object\',\'undefined\',\'null\'）'));
        }
      }
    };
  },
  props: {
    tabs: Props.PropObject({}),
    models: Props.PropObject({}),
    options: Props.PropObject({}),
    /** 以上是传入的模型 */
    value: Props.PropObject({})
  },
  data: function () {
    return {
      index: '',
      collapse: {
        data: [],
        value: []
      },
      lockerOptions: {
        keys: 'default',
        value: undefined,
        callback: undefined
      },
      dragGable: 'editor-editor'
    };
  },
  computed: {
    getFormConfig: {
      get () {
        return ['size', 'labelWidth', 'labelSuffix', 'showMessage', 'statusIcon', 'labelPosition', 'hideRequiredAsterisk'].reduce((value, keys) => {
          if (Object.prototype.hasOwnProperty.call(this.value, keys)) {
            value[keys] = this.value[keys];
          }
          return value;
        }, {});
      },
      set (value) {
        this.$emit('change', Object.assign({}, this.value, value));
      }
    }
  },
  watch: {
    tabs () {
      /* 重新初始化 */
      this.__initCollapse();
    }
  },
  mounted () {
    this.Initialize();
    this.$nextTick(() => {
      if (!Object.prototype.hasOwnProperty.call(this.value, 'childList')) {
        this.$emit('change', Object.assign({childList: []}, this.value));
      }
    });
  },
  methods: {
    reOptionsFunc () {
      this.index = '';
      this.lockerOptions = {keys: 'default', value: undefined, callback: undefined};
    },
    onLockerEnd () {
      this.__initCollapse();
    },
    onMove (event) {
      delete event.draggedContext.element.icon;
      event.draggedContext.element.indexes = Rand.randomString('xxxxxxx');
      event.draggedContext.element.prop = 'rend-' + Rand.randomString('xxx-xxxx');
    },
    onDelete (child, key) {
      const data = child.splice(key, 1);
      const hsaDeleteKey = list => {
        for (const item of list) {
          if (item.indexes === this.index) {
            this.reOptionsFunc();
            break;
          }
          hsaDeleteKey(item.childList || []);
        }
      };
      if (this.index) hsaDeleteKey(data);
    },
    Initialize () {
      this.__initCollapse();
    },
    /** 初始化控件列表 */
    __initCollapse () {
      this.collapse.value = [];
      this.collapse.data = Objects.deepCopy(Objects.merge(CollapseList, this.tabs));
      Object.keys(this.collapse.data).forEach((keys) => {
        if (this.collapse.data[keys].unfold) {
          this.collapse.value.push(`name-${keys}`);
        }
      });
    }
  }
};
</script>

<style src="../assets/css/editor.css"/>
