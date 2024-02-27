interface UtilVarType {//工具变量
    baseUrl:string,//请求地址
    code:string|number,//登陆过期
    noContentCode:number,//请求成功但没有内容
    ENC:boolean,//是否进行加密
}

const UtilVar:UtilVarType = {
    baseUrl:"",//请求地址
    code:401, //登陆过期
    noContentCode:204, //请求成功但没有内容
    ENC:false,//是否进行加密
}

const runtimeType:any = {//运行时类型
    production: () => {
    },
    //开发环境
    development: () => {
        // UtilVar.baseUrl= `http://www.xxx.cn:19527`
    },
    hash:()=>{
    }
}
// console.log(import.meta.env)
runtimeType[import.meta.env.MODE]&&runtimeType[import.meta.env.MODE]()//根据运行时环境来设置不同的变量
export default UtilVar