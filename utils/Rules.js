import { hasEmpty } from "./Verify";

export const isEmpty = (rules, value, callback) => {
  const {required, title} = rules
  if (required && hasEmpty(value)) {
    callback(new Error(`${title || ''}不能为空`))
  } else {
    callback()
  }
}
