import api from '@/common/api';
import { request } from 'umi';
// skipErrorHandler 跳过默认错误处理
export async function query({ targetKey, url, method, ...restProps }) {
  const u = url || api[`${targetKey}Query`]?.url;
  return u ? request(u, { method: method || 'POST', ...restProps }) : null;
}

export async function submit({ targetKey, url, ...restProps }) {
  return request(url || api[`${targetKey}Submit`].url, { method: method || 'POST', ...restProps });
}

export async function remove({ targetKey, url, ...restProps }) {
  return request(url || api[`${targetKey}Remove`].url, { method: method || 'POST', ...restProps });
}
