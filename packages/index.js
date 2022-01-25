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
  icon: 'el-icon-edit',
  title: '输入框',
  childList: [
    {icon: 'el-icon-edit', isFormItem: true, name: 'Input', type: 'text', label: '输入框', title: '输入框'},
    {icon: 'el-icon-edit', isFormItem: true, name: 'Input', type: 'password', label: '密码框', title: '密码框'},
    {icon: 'el-icon-edit', isFormItem: true, name: 'Number', label: '计数器', title: '计数器'},
    {icon: 'el-icon-edit', isFormItem: true, name: 'Input', type: 'textarea', label: '文本域', title: '文本域'}
  ]
};

const Grid = {
  unfold: true,
  icon: 'el-icon-files',
  title: '表单布局',
  childList: [
    {icon: 'el-icon-s-grid', name: 'Grid', title: '栅格栏', childList: [{span: 24, childList: []}]},
    {icon: 'el-icon-c-scale-to-original', name: 'Tabs', title: '标签页', value: 'default', childList: [{label: '默认', name: 'default', childList: []}]}
  ]
};

const Button = {
  unfold: true,
  icon: 'el-icon-thumb',
  title: '按钮',
  childList: [
    {icon: 'el-icon-thumb', name: 'Button', title: '按钮', size: 'mini', label: '按钮'}
  ]
};

const Title = {
  unfold: true,
  icon: 'el-icon-tickets',
  title: '排版',
  childList: [
    {icon: 'el-icon-files', name: 'Title', title: '标题', value: '标题'},
    {icon: 'el-icon-files', name: 'Divider', title: '分割线'},
    {icon: 'el-icon-files', name: 'Alert', title: '警告'}
  ]
};

const Date = {
  unfold: true,
  icon: 'el-icon-tickets',
  title: '时间选择器',
  childList: [
    {icon: 'el-icon-files', name: 'Date', isFormItem: true, title: '日期选择器', label: '日期选择器'}
  ]
};

export const CollapseList = {Grid, Date, Title, Input, Button};
