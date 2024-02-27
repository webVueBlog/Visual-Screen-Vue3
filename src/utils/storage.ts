
/**
 * @Author: Huang-Guang-Da
 * @param k 键名
 * @param v 键值
 * @description 存储本地会话数据
 * @returns RemovableRef
 */
 export const setLocalStorage = <T>(k: string, v: T) => {
  try {
    window.localStorage.setItem(k, JSON.stringify(v))
  } catch (error) {
    return false
  }
}

/**
 * @Author: Huang-Guang-Da
 * * 获取本地会话数据
 * @param k 键名
 * @returns any
 */
 export const getLocalStorage = (k: string) => {
  const item = window.localStorage.getItem(k)
  try {
    return item ? JSON.parse(item) : item
  } catch (err) {
    return item
  }
}

/**
 * @Author: Huang-Guang-Da
 * * 清除本地会话数据
 * @param name 
 */
 export const clearLocalStorage = (name: string) => {
  window.localStorage.removeItem(name)
}

/**
 * @Author: Huang-Guang-Da
 * * 存储临时会话数据
 * @param k 键名
 * @param v 键值
 * @returns RemovableRef
 */
export const setSessionStorage = <T>(k: string, v: T) => {
  try {
    window.sessionStorage.setItem(k, JSON.stringify(v))
  } catch (error) {
    return false
  }
}

/**
 * @Author: Huang-Guang-Da
 * * 获取临时会话数据
 * @returns any
 */
export const getSessionStorage: (k: string) => any = (k: string) => {
  const item = window.sessionStorage.getItem(k)
  try {
    return item ? JSON.parse(item) : item
  } catch (err) {
    return item
  }
}

/**
 * @Author: Huang-Guang-Da
 * * 清除本地会话数据
 * @param name 
 */
export const clearSessionStorage = (name: string) => {
  window.sessionStorage.removeItem(name)
}