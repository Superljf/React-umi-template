/**
 * Feat: 实现实例的创建,加载拦截器
 */
import { getCookie } from '@/utils/cookie';
import axios from 'axios';
import { requestInterceptor, responseInterceptor } from './interceptors';
import type { ErrorContext } from './types';

/**
 * Feat:创建常量，用于描述状态
 * @SuccessCode 后端业务处理成功
 * @SuccessStatus 接口请求成功
 * @UserCookieKey 指定读取Cookie的键名
 */
const AuthRequestHeaderKey = 'Auth-Site-User';
const UserCookieKey = 'techlent_user';

// Feat:创建一个axios实例
const instance = axios.create({
	baseURL: '/api', // 请求地址的前缀，用于将带有前端的请求转发到后端
	timeout: 10000, // 超时时间
	maxRedirects: 0, // 不允许重定向,
	validateStatus: function (status) {
		return true; // 所有的状态码都被视为成功
	},
	headers: {
		// 自定义请求头,增加用户信息用于用户鉴权
		Accept: '*',
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		[AuthRequestHeaderKey]: getCookie(UserCookieKey) || '',
	},
});

/**
 * Feat: 实例增加请求头拦截
 * 当authRequired为true,获取cookie字段，进行解析
 * 当cookie携带相应用户数据时，发起请求，否则拦截掉抛异常
 */

instance.interceptors.request.use(requestInterceptor, (error) => {
	const errorContext: ErrorContext = {
		timing: 'Request',
		reason: `发起请求失败,${error}`,
		tag: 'Unknown',
	};
	return Promise.reject(errorContext);
});

// Feat: 实例增加响应拦截
instance.interceptors.response.use(responseInterceptor, (error) => {
	const errorContext: ErrorContext = {
		timing: 'Response',
		reason: `接收响应失败,${error}`,
		tag: 'Unknown',
	};
	return Promise.reject(errorContext);
});

export default instance;
