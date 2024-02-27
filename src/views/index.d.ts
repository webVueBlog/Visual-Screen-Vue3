export interface DateDataType {
    dateDay?: string,// 日期天
    dateYear?: string,// 日期年
    dateWeek?: string,// 日期周
    timing?: NodeJS.Timer// null,
}   

interface CountUpOptions {// 配置项
    startVal?: number;// 开始的值
    decimalPlaces?: number;// 小数位数
    duration?: number;// 动画持续时间（以毫秒为单位）
    useGrouping?: boolean;// 使用逗号分隔的数字格式
    useEasing?: boolean;// 使用缓动效果
    smartEasingThreshold?: number;// 智能缓动阈值
    smartEasingAmount?: number;// 智能缓动量
    separator?: string;// 分隔符
    decimal?: string;// 小数点
    easingFn?: (t: number, b: number, c: number, d: number) => number;// 缓动函数
    formattingFn?: (n: number) => string;// 格式化函数
    prefix?: string;// 前缀
    suffix?: string;// 后缀
    numerals?: string[];// 数字数组
    enableScrollSpy?: boolean;// 启用滚动监听
    scrollSpyDelay?: number;// 滚动监听延迟（以毫秒为单位）
    scrollSpyOnce?: boolean;// 滚动监听一次
  }