/* 基础样式 */
import './assets/css/baseStyle.css';
/* 拖拽扩展 */
import * as vuedraggable from 'vuedraggable';
/* 展示用 */
import dynamicFormView from './lib/View.vue';
/* 编辑用 */
import dynamicFormEditor from './lib/Editor.vue';
/* el-form 封装 */
import dynamicFormModels from './lib/FormModels';
/* el-form-item 封装 */
import dynamicFormItemModels from './lib/FormItemModels';
/* 内容编辑器 */
import dynamicFormEditorContent from './lib/EditorContent.vue';

const Components = {dragGable: vuedraggable, dynamicFormView, dynamicFormEditor, dynamicFormModels, dynamicFormItemModels, dynamicFormEditorContent};

const install = function (Vue) {
  Object.keys(Components).forEach(function (keys) {
    Vue.component(keys, Components[keys]);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  ...Components,
  install
};