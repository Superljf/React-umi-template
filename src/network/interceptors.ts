/**
 * Feat: 请求/响应拦截器
 */

import type { AxiosResponse } from 'axios';
import type { RequestConfig, ServerResponse, ErrorContext } from './types';
import { decodeBase64 } from '@/utils/encode';
import { message as antdMessage } from 'antd';

/**
 * Feat:创建常量，用于描述状态
 * @SuccessCode 后端业务处理成功
 * @SuccessStatus 接口请求成功
 * @UserCookieKey 指定读取Cookie的键名
 */
const AuthRequestHeaderKey = 'Auth-Site-User';
const SuccessStatus = 200;

/**
 * Feat: 请求拦截器
 * @param config
 * @returns
 */
export const requestInterceptor = (config?: RequestConfig) => {
	const { authRequired, headers = {} } = config || {};
	// 增加用户授权校验
	try {
		if (authRequired) {
			const authHeader = headers[AuthRequestHeaderKey];
			const decoded = decodeBase64(authHeader as string) || {};
			const { clientId, loginState, userId } = decoded;
			if (clientId && loginState && userId) {
				return config;
			} else {
				// 没有用户信息，不允许发起请求，抛出异常
				const errorContext: ErrorContext = {
					timing: 'Request',
					reason: '权限不足：用户未登录发起请求',
					tag: 'Auth',
				};
				return Promise.reject(errorContext);
			}
		}
		return config;
	} catch (error) {
		const errorContext: ErrorContext = {
			timing: 'Request',
			reason: `发起请求失败，请求配置有误,${error}`,
			tag: 'Config',
		};
		return Promise.reject(errorContext);
	}
};

/**
 * Feat: 响应拦截器
 */

export const responseInterceptor = (response: AxiosResponse<ServerResponse>) => {
	try {
		const { data: resData, status } = response;
		const { data, message, code, ok } = resData;
		if (response.status === 404) {
			const errorContext: ErrorContext = {
				reason: '404-请求的资源不存在',
				timing: 'Response',
				tag: 'NotFound',
			};
			antdMessage.error('网络错误（404）');
			return Promise.reject(errorContext);
		}

		if (status !== SuccessStatus) {
			const errorContext: ErrorContext = {
				reason: `网络错误`,
				timing: 'Response',
				tag: 'Network',
			};
			antdMessage.error(`网络错误`);
			return Promise.reject(errorContext);
		} else if (!ok) {
			const errorContext: ErrorContext = {
				reason: `${message}`,
				timing: 'Response',
				tag: 'Business',
			};
			antdMessage.error(`${message}`);
			return Promise.reject(errorContext);
		} else {
			return data;
		}
	} catch (error) {
		const errorContext: ErrorContext = {
			reason: `未知的异常错误，${error}`,
			timing: 'Response',
			tag: 'Unknown',
		};
		antdMessage.error(`未知的异常错误，${error}`);
		return Promise.reject(errorContext);
	}
};
