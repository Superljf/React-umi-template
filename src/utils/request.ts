/**
 * 前端请求封装
 * 拦截：在请求前进行判断
 * 生产环境下拼接请求地址
 * 封装在Promise里面
 * 请求响应后，判断响应的状态是否成功(status === 200)
 * 判断业务处理是否成功(code === 1)
 *
 * Todo: 取消请求，Mock能力
 * Todo: 使用axios封装，迁移已有请求
 *
 *
 * ! 即将废弃请求，后续新的请求请迁移到@/network,使用封装的axios进行请求
 */
import 'whatwg-fetch';
import { isObject } from './type';

type MethodType = 'post' | 'put' | 'delete' | 'get';

interface IRequestOptions {
	/**
	 * 请求的方法,默认使用get
	 */
	method?: MethodType;
	/**
	 * 请求需要携带的请求体,一般在post方法中使用
	 */
	body?: any;
	/**
	 * 是否要模拟数据，一般在已提供数据格式但无数据接口的情况下使用
	 */
	mock?: boolean;
	/**
	 * 期望模拟的数据
	 */
	expect?: any;
	prefix?: any;
	headers?: any;
}

export default (url: string, options?: IRequestOptions): any => {
	const {
		method = 'get',
		body = {},
		mock = false, // 是否使用mock数据
		expect = {}, //  mock的配置
		prefix = '', // 请求前缀
		headers, // 请求头
		...restOptions
	} = options || {};
	// 判断是否为mock请求，如果是，返回一个promise


	// 前端请求地址增加前缀/api，用于辨识路由或者请求
	let formatUrl: any;
	const base = '/api';
	if (!prefix) {
		formatUrl = `${base}${url}`;
	} else {
		formatUrl = `${prefix}${url}`;
	}

	// 其他请求方法，区别在于是否带参数
	const otherMethods = ['post', 'put', 'delete'];
	// 判断是否为其他请求方法
	const isGetMethod = method === 'get';
	const isOtherMethod = otherMethods.some(methodName => methodName === method);

	const commonOptions = {
		credentials: 'include',
		headers: headers || {
			Accept: '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
	};

	// 判断请求方法是否正确
	if (!isGetMethod && !isOtherMethod) {
		return;
	}

	const postBody = isObject(body) ? JSON.stringify(body) : body;

	// fetch请求的配置
	let requestOptions = {};
	if (isGetMethod) {
		requestOptions = {
			method,
			...restOptions,
			...commonOptions
		};
	} else {
		requestOptions = {
			method,
			body: postBody,
			...restOptions,
			...commonOptions
		};
	}

	return new Promise((resolve, reject) => {
		fetch(formatUrl, requestOptions)
			.then(response => {
				// 附件下载
				const isOctetStream =
					response.headers.get('content-type') === 'application/octet-stream';
				if (isOctetStream) {
					try {
						response
							.blob()
							.then(data => {
								const downloadURL = window.URL.createObjectURL(data);
								const a = document.createElement('a');
								const fileName = response.headers.get('content-filename');
								a.style.display = 'none';
								a.href = downloadURL;
								a.download = fileName as string;
								document.body.appendChild(a);
								a.click();
								document.body.removeChild(a);
								window.URL.revokeObjectURL(downloadURL);
								resolve(undefined);
								return;
							})
							.catch(error => {
								reject(error);
							});
					} catch (error) {
						reject(error);
					}
					return resolve(undefined);
				}
				const { status } = response;
				const successStatus = 200; // 响应成功的状态码
				if (status !== successStatus) {

					reject(`Fetch error:Fetch error with status ${status}`);
				}
				try {
					response.json().then((result: any) => {
						const { data, message, code } = result;
						const successCode = 1; // 业务处理成功
						if (code !== successCode) {

							reject('Business error');
						}
						resolve(data);
					});
				} catch (err) {
					reject('Business error');
				}
			})
			.catch(error => {
			});
	});
};
