import {hasType, getType} from './Type';

export const reArray = (target, value) => target.reduce((val, keys) => (val[keys] = value[keys], val), {});

export const reObject = (target, value) => Object.keys(target).reduce((val, keys) => (val[target[keys] || keys] = value[keys], val), {});

export const deepCopy = value => {
  const target = hasType(value, 'array') ? [] : {};
  Object.keys(value).forEach(keys => {
    const item = value[keys];
    if (['array', 'object'].includes(getType(item))) {
      target[keys] = deepCopy(item);
    } else {
      target[keys] = item;
    }
  });
  return target;
};

export const removeKeys = (target, value) => {
  return Object.keys(target).reduce(function (val, key) {
    if (!value.includes(key)) val[key] = target[key];
    return val;
  }, {});
};

export const merge = (target, ...args) => args.reduce((value, arg) => Object.keys(arg).reduce((val, keys) => {
  const [p1, p2] = [getType(val[keys]), getType(arg[keys])];
  if (['array', 'object'].includes(p1) && p1 === p2) {
    val[keys] = merge(val[keys], arg[keys]);
  } else {
    val[keys] = arg[keys];
  }
  return val;
}, value), target);

export const arrayDiffUndock = (target, value) => {
  const [val, list] = [{...value}, Object.keys(target)];
  for (const key in val) {
    if (list.includes(key)) delete val[key];
  }
  return val;
};
