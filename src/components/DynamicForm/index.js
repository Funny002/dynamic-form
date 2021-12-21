import DynamicFormEditor from "./Ui/Editor";
import DynamicFormViews from "./Ui/Views";
import DragGable from "vuedraggable";
import Utils from './utils';
import './scss/base.scss';

const install = Vue => {
  Vue.component('drag-gable', DragGable)
  Vue.component('DynamicFormViews', DynamicFormViews)
  Vue.component('DynamicFormEditor', DynamicFormEditor)
}

export default {
  Utils,
  install,
  DragGable,
  DynamicFormViews,
  DynamicFormEditor,
}
