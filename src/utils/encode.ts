/**
 *
 * @param userInfo {userId:number}
 * @returns
 *
 * 对用户信息进行base64加密
 */
export const encodeBase64 = (data: Record<string, any>) => {
	try {
		return window.btoa(JSON.stringify(data));
	} catch {
		return '';
	}
};

/**
 *
 * @param userInfo {userId:number}
 * @returns
 *
 * 对用户信息进行base64解密
 */
export const decodeBase64 = (data: string) => {
	const decodeStr = window.atob(data);
	try {
		return JSON.parse(decodeStr);
	} catch {
		return decodeStr;
	}
};
