/**
 * Feat: Axios封装，发送网络请求
 * Feat: 增加拦截器，用于请求和响应的拦截
 *
 * Todo: mock支持
 * Todo: 测试用例书写
 * Todo: 路由切换，取消未完成的请求
 *
 * Stack: request -> instance -> requestInterceptor -> responseInterceptor
 */
import type { AxiosRequestConfig } from 'axios';
import blobInstance from './blobInstance';
import instance from './instance';
import type { ErrorContext, RequestConfig } from './types';

/**
 * Feat: 封装一个请求方法,默认使用get方式发起请求
 * @param url 请求的url地址
 * @param config 请求配置，参考 AxiosRequestConfig
 * @returns Promise<any> | void
 */
export const requestInstance = (url: string, config?: RequestConfig) => {
	return instance(url, config)
		.then((data) => data)
		.catch((error: ErrorContext) => {
			throw error; // 抛出错误对象
		});
};

/**
 * Feat: 封装一个Post请求，实际上是走 @request 这个函数,包装了method和data
 * @param url 后端接口地址
 * @param config  请求配置(适配原有的body,传入的body将会被转化为data)
 * @returns
 */

export const request = (url: string, config?: RequestConfig): Promise<any> => {
	const { body, method } = config || {};
	let additionConfig: AxiosRequestConfig = { ...config, method: method || 'POST' };
	if (body) {
		additionConfig = { ...additionConfig, data: body };
	}
	return requestInstance(url, additionConfig);
};

// Blob

export const requestBlob = (url: string, config?: RequestConfig) => {
	return blobInstance(url, config)
		.then((data) => data)
		.catch((error: ErrorContext) => {
			throw error; // 抛出错误对象
		});
};

export const postRequestBlob = (url: string, config?: RequestConfig): Promise<any> => {
	const { body } = config || {};
	let additionConfig: AxiosRequestConfig = { ...config, method: 'POST' };
	if (body) {
		additionConfig = { ...additionConfig, data: body };
	}
	return requestBlob(url, additionConfig);
};
