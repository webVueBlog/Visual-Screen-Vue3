/**
 * @Author: Huang-Guang-Da
 * @description: 获取路径参数
 * @param {*} url
 * @return {*}
 */
export function parameteUrl(url: string) {
    const json: any = {}// 定义一个空对象用于存放参数
    if (/\?/.test(url)) {// 判断url是否包含?
        const urlString = url.substring(url.indexOf("?") + 1);// 获取url中?后面的内容
        const urlArray = urlString.split("&");// 将?后面的内容按照&分割成数组
        for (let i = 0; i < urlArray.length; i++) {
            const urlItem = urlArray[i];// 遍历数组
            const item = urlItem.split("=");// 将数组中的内容按照=分割成数组
            json[item[0]] = item[1];// 将数组中的内容存入json对象中,示例 {"id": "123"}
        }
        return json;// 返回json对象
    }
    return {};// 如果没有参数返回空对象
}

// get请求从config.url获取参数，post从config.body中获取参数
export function paramObj(url:string) {// 获取路径参数
    const search = url.split('?')[1]// 获取路径参数,示例
    // 例如: /api/user/123?name=zhangsan&age=18
    // search为: name=zhangsan&age=18
    if (!search) {// 如果没有参数返回空对象
      return {}
    }
    return JSON.parse(
      // 将参数转换为json对象，示例
      // {name: 'zhangsan', age: 18}
      // 例如: /api/user/123?name=zhangsan&age=18
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    )
  }