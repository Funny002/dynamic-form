export const Name = 'grid'

const childList = [
  {title: '栅格', icon: 'el-icon-c-scale-to-original', alias: 'grid', childList: [
    {span: 12, childList: []},
    {span: 12, childList: []}
  ]}
]

export const Tabs = {title: '栅格', icon: 'el-icon-c-scale-to-original', group: 'grid', childList}

export const Models = () => import('./Models')

export const Options = () => import('./Options')
