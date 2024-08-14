// 简单控制cookie存取

// 读取cookie
export function getCookie(key: string) {
	const matches = document.cookie.match(
		new RegExp('(?:^|; )' + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
	);
	return matches ? decodeURIComponent(matches[1]) : '';
}

// 修改或新增cookie
export function setCookie(name: string, value: string, config?: any) {
	const options = {
		path: '/',
		// 如果需要，可以在这里添加其他默认值
		...(config || {})
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

	for (const optionKey in options) {
		updatedCookie += '; ' + optionKey;
		const optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += '=' + optionValue;
		}
	}

	document.cookie = updatedCookie;
}

// 删除cookie(通过调整过期时间实现)
export function deleteCookie(key: string) {
	setCookie(key, '', {
		'max-age': -1
	});
}
