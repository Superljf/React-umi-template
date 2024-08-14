import type { AxiosRequestConfig } from 'axios';
/**
 * Type: 拓展了Axios通用的配置，增加了body的配置
 * 适用于发起post请求
 * @body 适配旧的请求方法，为请求增加body payload,应转换为Axios的params
 * @authRequired 判断是否需要登录才能调用接口
 */
export interface RequestConfig extends AxiosRequestConfig {
	body?: string | Record<string, any>;
	authRequired?: boolean;
	method?: string;
}

/**
 * Type: 拓展Axios通用的配置，但移除了method的配置
 * 适用于发起get请求
 */
// export type GetRequestConfig = Omit<PostRequestConfig, 'method'>;

/**
 * Type:描述响应数据的类型
 * @Code 描述业务操作是否正确
 * @data 接口返回的数据
 * @message 后端返回的信息，一般用于错误提示或者排查
 */
export type ServerResponse = {
	code: number;
	data?: any;
	message?: string;
};

/**
 * Type: 创建一个数据格式ErrorContext，用于展示异常的类型以及异常的数据
 *
 */

type Reason = undefined | string; // 错误发生的原因
type Timing = 'Request' | 'Response'; // 错误发生的时机（请求或者响应的阶段）
type Tag = 'Config' | 'Network' | 'Business' | 'Unknown' | 'Auth'; // 错误发生的主要原因

export type ErrorContext = {
	reason: Reason;
	timing: Timing;
	tag: Tag;
};
