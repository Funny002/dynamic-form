export const getRandomString = (long = 1) => [...Array(long)].map(() => (Math.random() * 16 | 0).toString(16)).join('')

export const randomString = (format = 'x') => format.replace(/x*/g, value => getRandomString(value.length))
