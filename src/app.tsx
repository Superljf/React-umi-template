import { Modal, Spin, notification } from 'antd';
import 'antd/dist/antd.less';
import { history } from 'umi';
import { getLoginState } from './services/common';
import PageLoading from './pages/components/PageLoading';

type MapType = Record<string, any>;

let modal: any;

export const initialStateConfig = {
  loading: <PageLoading />,
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error) => {
  const { response, name, message: msg } = error;
  // 接口success=false
  if (name === 'BizError') {
    if (!modal) modal = Modal.error({});
    modal.update({
      title: '操作失败',
      content: msg,
      okText: '关闭',
      onOk: () => {
        modal = undefined;
      },
    });
    return;
  }
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText || '请求超时';
    const { status, url } = response;
    if (status === 403) {
      history.push('/exception/403');
      return;
    }

    if (!modal) modal = Modal.error({});
    modal.update({
      title: status ? `请求错误 ${status}: ${url}` : '请求错误',
      content: errorText,
      okText: '关闭',
      onOk: () => {
        modal = undefined;
      },
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
};

export const request = {
  errorHandler,
  errorConfig: {
    adaptor: (resData: any) => {
      return {
        ...resData,
        errorMessage: resData.message,
      };
    },
  },
};

function redirectTo(path: string) {
  history.push(path);
}

export async function getInitialState() {
  try {
    const resData = await getLoginState();
    const { loginState } = resData;
    const { pathname } = history.location;

    if (!loginState && pathname !== '/login') {
      redirectTo('/login'); // 重定向到登录页
      return { loginState: false, username: null }; // 返回未登录状态
    }

    if (loginState && (pathname === '/login' || pathname === '/')) {
      redirectTo('/workPlace');
      return { loginState, username: resData.username }; // 返回登录状态
    }

    return resData; // 返回其他状态
  } catch (error) {
    // 这里可以添加错误日志或其他处理逻辑
    console.error('Error in getInitialState:', error);
    redirectTo('/login'); // 出现错误时，也重定向到登录页
    return { loginState: false, username: null }; // 返回未登录状态
  }
}
