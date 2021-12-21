export const Name = 'tabs'

const childList = [
  {title: '页签', icon: 'el-icon-collection-tag', alias: 'tabs', type: 'tabs', value: 'test', childList: [
    {label: '测试', name: 'test', childList: []}
  ]}
]

export const Tabs = {title: '页签', icon: 'el-icon-collection-tag', group: 'tabs', childList}

export const Models = () => import('./Models')

export const Options = () => import('./Options')
