// 获取数据的类型名称(小写)
export const getDataTypeName = (data?:unknown) => {
	return Object.prototype.toString.call(data).slice(8,-1).toLowerCase()
}

// 判断名称是否相等，可以生成一个类型判断的函数
export const isEqualTypeName = (name:string) => (data?:unknown) => {
	return getDataTypeName(data) === name.toLowerCase()
} 


/**
 *
 * @param target
 * 判断类型是否为Null或者Undefined
 */
export const isNullOrUndifined = (target: any) => {
	return target === null || typeof target === 'undefined';
};

/**
 *
 * @param target
 * 判断类型是否为function
 *
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFn(target: any): target is Function {
	return typeof target === 'function';
}

/**
 * 判断类型是否为布尔值
 */

export const isBoolean = (target: any) => isEqualTypeName("boolean")(target);

/**
 * 判断是否为数字类型
 */
export const isNumber = (target: any) => isEqualTypeName("number")(target);

/**
 * 判断是否为正整数
 */

export const isPosInt = (target: any) => isNumber(target) && target % 1 === 0 && target > 0;

/**
 * 判断是否为字符串
 */

export const isString = (target: any) => isEqualTypeName("string")(target);

/**
 * 判断是否为数组
 */

export const isArray = (target: any) => Array.isArray(target);

/**
 * 判断是否为对象
 */

export const isObject = (target: any) =>isEqualTypeName("object")(target)

