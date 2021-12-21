const Models = (content => content.keys().map(path => content(path)))(require.context('./', true, /\.\/\w*\/index.js/))

export const ModelTabs = (() => {
  const other = {icon: 'el-icon-coin', title: '其他', childList: []}
  const obj = [...Models].reduce((val, {Name, Tabs}) => {
    if (Tabs.group) {
      val[Name] = Tabs
    } else {
      other.childList.push(Tabs)
    }
    return val
  }, {})
  obj['other'] = other
  return obj
})()

export const ModelOptions = (() => Models.reduce((val, {Name, Options}) => (val[Name] = Options, val), {}))()

export default (() => Models.reduce((val, {Name, Models}) => (val[Name] = Models, val), {}))()
