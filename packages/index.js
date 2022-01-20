const ModelsContent = require.context('./', true, /index\.vue$/);
export const Models = ModelsContent.keys().reduce(function (value, path) {
  const models = ModelsContent(path);
  const name = models.name || models.default.name;
  value[name] = models.default || models;
  return value;
}, {});

const OptionsContent = require.context('./', true, /options\.vue$/);
export const Options = OptionsContent.keys().reduce(function (value, path) {
  const models = OptionsContent(path);
  const name = models.name || models.default.name;
  value[name] = models.default || models;
  return value;
}, {});

const Input = {
  unfold: true,
  icon: 'edit',
  title: '输入框',
  childList: [
    {icon: 'el-icon-edit', isFormItem: true, name: 'Input', title: '输入框'},
    {icon: 'el-icon-edit', isFormItem: true, name: 'Input', title: '计数器'},
    {icon: 'el-icon-edit', isFormItem: true, name: 'Input', title: '文本域'}
  ]
};

const Grid = {
  unfold: true,
  icon: 's-grid',
  title: '栅格',
  childList: [
    {
      icon: 'el-icon-s-grid',
      name: 'Grid',
      title: '栅格栏',
      childList: [
        {childList: []}
      ]
    }
  ]
};

export const CollapseList = {Input, Grid};
