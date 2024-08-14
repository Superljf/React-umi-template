import axios from 'axios';

// 创建一个 Axios 实例
const instance = axios.create({
	baseURL: '/api', // 请求地址的前缀，用于将带有前端的请求转发到后端
	timeout: 10000, // 超时时间
	maxRedirects: 0, // 不允许重定向
	responseType: 'arraybuffer', // 设置响应类型为二进制数据

	headers: {
		Accept: '*',
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
});

export default instance;
