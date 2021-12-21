export const Name = 'date'

const childList = [
  {title: '日期选择器', icon: 'el-icon-date', alias: 'date', type: 'date'}
]

export const Tabs = {title: '日期组件', icon: 'el-icon-date', group: 'date', childList}

export const Models = () => import('./Models')

export const Options = () => import('./Options')
