import { request } from '@/network';

export const validAuth = (params) => {
	return request('/loginAuth', {
		body: params,
	});
};

// 获取用户当前的登录状态
export const getLoginState = () => {
	return request('/getLoginState', {
		method: 'GET'
	});
};

export const getDeviceSummary = () => {
	return request('/getDeviceSummary', {
		method: 'GET'
	});
};

export const getDevicesRealTimeProp = (data: any) => {
	return request('/getDevicesRealTimeProp', {
		body: data
	});
};


// 退出登录
export const logout = () => {
	return request('/logout', {
		method: 'GET'
	});
};

