import { getType } from "./Type";

export const hasEmpty = value => {
  switch (getType(value)) {
    case 'number':
      return false;
    case 'string':
      return value === '';
    case 'array':
      return value.length === 0;
    case 'object':
      return Object.keys(value).length === 0;
    case 'formdata':
      return (value.entries().next().value || []).length === 0;
    default:
      return !value;
  }
}
