import { stringify } from 'querystring';
import { message, Modal } from 'antd';
import { isMobile } from '@/common/sysParam';

let modal;
message.config({
  maxCount: 1,
});

/**
 * 打印接口请求参数
 * @param payload
 * @param url
 * @param model
 */
export const print = (payload, url = '', model = 'none') => {
  console.log(`${model} >>> ${url}: `, payload);
};
/**
 * 接口请求成功提示
 * @param api
 * @param extra
 */
export const showSuccess = (api, extra) => {
  if (isMobile) {
    // Toast.success(`${api ? api.title : '操作'}成功${extra ? `，${extra}` : ''}`);
  } else {
    message.success(`${api ? api.title : '操作'}成功${extra ? `，${extra}` : ''}`);
  }
};
/**
 * 接口请求失败提示
 * @param api
 * @param response
 */
export const showError = (api, response) => {
  if (isMobile) {
    // Toast.fail(typeof response.message === 'string' ? response.message : '操作失败');
  } else {
    if (!modal) modal = Modal.error({});
    modal.update({
      title: `${api.title}失败`,
      content: typeof response.message === 'string' ? response.message : '操作失败',
      okText: '关闭',
      onOk: () => {
        modal = undefined;
      },
    });
  }
};
/**
 * 获取查询路径
 * @param path
 * @param query
 * @returns {string}
 */
export const getQueryPath = (path = '', query = {}) => {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
};
/**
 * 文件下载
 * @param url
 * @param params
 */
export const download = (url, params) => {
  window.location.href = encodeURI(getQueryPath(url, params));
};
/**
 * 判断是否为空对象
 * @param obj
 * @returns {boolean}
 */
export const isEmptyObject = (obj) => {
  const arr = Object.keys(obj);
  return arr.length === 0;
};
/**
 * 升序排序（数值类型比较）
 * @param name
 * @param keepIndex
 * @returns {Function}
 */
export const ascNumber = (name, keepIndex) => {
  return (p, o) => {
    let a;
    let b;
    if (typeof o === 'object' && typeof p === 'object' && o && p) {
      a = Number(o[name]);
      b = Number(p[name]);
      if (Number.isNaN(a) && Number.isNaN(b)) return 0;
      if (Number.isNaN(a)) return -1;
      if (Number.isNaN(b)) return 1;
      if (a === b) {
        return keepIndex ? p.index - o.index : 0;
      }
      if (typeof a === typeof b) {
        return a < b ? 1 : -1;
      }
      return typeof a < typeof b ? 1 : -1;
    }
  };
};
/**
 * 升序排序（数值类型比较）若值相同，按原数组顺序返回（解决相同值随机排序问题）
 * @param tableData
 * @param name
 * @returns {Function}
 */
export const ascNumberWithIndex = (tableData = [], name) => {
  tableData.map((item, ind) => (item.index = ind));
  return ascNumber(name, true);
};
/**
 * 升序排序（字符类型比较）
 * @param name
 * @returns {Function}
 */
export const ascString = (name) => {
  return (p, o) => {
    let a;
    let b;
    if (typeof o === 'object' && typeof p === 'object' && o && p) {
      a = o[name];
      b = p[name];
      if (a === b) {
        return 0;
      }
      if (typeof a === typeof b) {
        return a < b ? 1 : -1;
      }
      return typeof a < typeof b ? 1 : -1;
    }
  };
};
/**
 *  降序排序（数值类型比较）
 * 方法调用：jsonData.sort(descNumber('orgid'));//根据orgid对jsonData对象数组进行排序
 * @param name
 * @param keepIndex
 * @returns {Function}
 */
export const descNumber = (name, keepIndex) => {
  return (p, o) => {
    let a;
    let b;
    if (typeof o === 'object' && typeof p === 'object' && o && p) {
      a = Number(o[name]);
      b = Number(p[name]);
      if (Number.isNaN(a) && Number.isNaN(b)) return 0;
      if (Number.isNaN(a)) return -1;
      if (Number.isNaN(b)) return 1;
      if (a === b) {
        return keepIndex ? p.index - o.index : 0;
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1;
      }
      return typeof a < typeof b ? -1 : 1;
    }
  };
};
/**
 * 降序排序（数值类型比较）若值相同，按原数组顺序返回（解决相同值随机排序问题）
 * @param tableData
 * @param name
 * @returns {Function}
 */
export const descNumberWithIndex = (tableData = [], name) => {
  tableData.map((item, ind) => (item.index = ind));
  return descNumber(name, true);
};
/**
 * 降序排序（字符类型比较）
 * @param name
 * @returns {Function}
 */
export const descString = (name) => {
  return (p, o) => {
    let a;
    let b;
    if (typeof o === 'object' && typeof p === 'object' && o && p) {
      a = o[name];
      b = p[name];
      if (a === b) {
        return 0;
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1;
      }
      return typeof a < typeof b ? -1 : 1;
    }
  };
};
/**
 * 获取占比
 * @param target
 * @param total
 * @returns {number}
 */
export const getPercent = (target, total) => {
  return total ? Number(((Number(target || 0) / Number(total)) * 100).toFixed(2)) : 0;
};
/**
 * 阿拉伯数字转中文数字,
 * 如果传入数字时则最多处理到21位，超过21位js会自动将数字表示成科学计数法，导致精度丢失和处理出错
 * 传入数字字符串则没有限制
 * @param {number|string} digit
 */
export const toZhDigit = (digit) => {
  digit = typeof digit === 'number' ? String(digit) : digit;
  const zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const unit = ['千', '百', '十', ''];
  const quot = [
    '万',
    '亿',
    '兆',
    '京',
    '垓',
    '秭',
    '穰',
    '沟',
    '涧',
    '正',
    '载',
    '极',
    '恒河沙',
    '阿僧祗',
    '那由他',
    '不可思议',
    '无量',
    '大数',
  ];

  let breakLen = Math.ceil(digit.length / 4);
  let notBreakSegment = digit.length % 4 || 4;
  let segment;
  const zeroFlag = [];
  const allZeroFlag = [];
  let result = '';

  while (breakLen > 0) {
    if (!result) {
      // 第一次执行
      segment = digit.slice(0, notBreakSegment);
      const segmentLen = segment.length;
      for (let i = 0; i < segmentLen; i++) {
        if (segment[i] !== 0) {
          if (zeroFlag.length > 0) {
            result += `零${zh[segment[i]]}${unit[4 - segmentLen + i]}`;
            // 判断是否需要加上 quot 单位
            if (i === segmentLen - 1 && breakLen > 1) {
              result += quot[breakLen - 2];
            }
            zeroFlag.length = 0;
          } else {
            result += zh[segment[i]] + unit[4 - segmentLen + i];
            if (i === segmentLen - 1 && breakLen > 1) {
              result += quot[breakLen - 2];
            }
          }
        } else {
          // 处理为 0 的情形
          if (segmentLen === 1) {
            result += zh[segment[i]];
            break;
          }
          zeroFlag.push(segment[i]);
          continue;
        }
      }
    } else {
      segment = digit.slice(notBreakSegment, notBreakSegment + 4);
      notBreakSegment += 4;

      for (let j = 0; j < segment.length; j++) {
        if (segment[j] !== 0) {
          if (zeroFlag.length > 0) {
            // 第一次执行zeroFlag长度不为0，说明上一个分区最后有0待处理
            if (j === 0) {
              result += quot[breakLen - 1] + zh[segment[j]] + unit[j];
            } else {
              result += `零${zh[segment[j]]}${unit[j]}`;
            }
            zeroFlag.length = 0;
          } else {
            result += zh[segment[j]] + unit[j];
          }
          // 判断是否需要加上 quot 单位
          if (j === segment.length - 1 && breakLen > 1) {
            result += quot[breakLen - 2];
          }
        } else {
          // 第一次执行如果zeroFlag长度不为0, 且上一划分不全为0
          if (j === 0 && zeroFlag.length > 0 && allZeroFlag.length === 0) {
            result += quot[breakLen - 1];
            zeroFlag.length = 0;
            zeroFlag.push(segment[j]);
          } else if (allZeroFlag.length > 0) {
            // 执行到最后
            if (breakLen === 1) {
              result += '';
            } else {
              zeroFlag.length = 0;
            }
          } else {
            zeroFlag.push(segment[j]);
          }

          if (j === segment.length - 1 && zeroFlag.length === 4 && breakLen !== 1) {
            // 如果执行到末尾
            if (breakLen === 1) {
              allZeroFlag.length = 0;
              zeroFlag.length = 0;
              result += quot[breakLen - 1];
            } else {
              allZeroFlag.push(segment[j]);
            }
          }
          continue;
        }
      }
      --breakLen;
    }
    return result;
  }
};
/**
 * 关闭当前窗口
 */
export const closeWindow = () => {
  if (window.navigator.userAgent.indexOf('MSIE') > 0) {
    // close IE
    if (window.navigator.userAgent.indexOf('MSIE 6.0') > 0) {
      window.opener = null;
      window.close();
    } else {
      window.open('', '_top');
      window.top.close();
    }
  } else if (window.navigator.userAgent.indexOf('Firefox') > 0) {
    // close firefox
    window.location.href = 'about:blank ';
  } else {
    // close chrome;It is effective when it is only one.
    window.opener = null;
    window.open('', '_self');
    window.close();
  }
};
/**
 * 将数组中的指定字段值转为数字
 * @param list
 * @param arrList
 * @returns {Array}
 */
export const stringDataToNum = (list = [], arrList = []) => {
  if (list.length) {
    list.map((item) => {
      if (arrList.length) {
        arrList.map((v) => (item[v] = Number(item[v])));
      }
    });
  }
  return list;
};
/**
 * 生成从minNum到maxNum的随机数
 * @param minNum
 * @param maxNum
 * @returns {number}
 */
export const randomNum = (minNum, maxNum) =>
  parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
/**
 * 数字补零
 * @param num
 * @param length
 * @returns {string}
 */
export const prefixInteger = (num, length) => {
  return (Array(length).join('0') + num).slice(-length);
};
// 不能连续字符（如123、abc）连续3位或3位以上
const LxStr = (pwd, consecutiveNum = 3) => {
  let flag = true;
  let count = 1;
  let decount = 1;
  let tmp = pwd.charCodeAt(0);
  for (let i = 1; i < pwd.length; i++) {
    const chart = pwd.charCodeAt(i);
    if (
      tmp + 1 === chart ||
      (tmp >= 97 && tmp <= 122 ? tmp + 1 - 32 : tmp >= 65 && tmp <= 90 ? tmp + 1 + 32 : tmp + 1) ===
      chart
    ) {
      count++;
      decount = 1;
      if (count === consecutiveNum) {
        flag = false;
      }
    } else if (
      tmp - 1 === chart ||
      (tmp >= 97 && tmp <= 122 ? tmp - 1 - 32 : tmp >= 65 && tmp <= 90 ? tmp - 1 + 32 : tmp - 1) ===
      chart
    ) {
      decount++;
      count = 1;
      if (decount === consecutiveNum) {
        flag = false;
      }
    } else {
      count = 1;
      decount = 1;
    }
    tmp = chart;
  }
  return flag;
};
/**
 * 密码校验
 */
export const passwordValidate = (passwd) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_!?@#$%^&*`~/|(){}\[\]+=,.<>])[A-Za-z\d-_!?@#$%^&*`~/|(){}\[\]+=,.<>]{8,16}$/;
  if (!regex.test(passwd)) {
    return '密码长度必须8位以上且含有"小写字母"、"大写字母"、"数字"、"特殊符号"';
  }
  // 不能连续字符（如123、abc）连续3位或3位以上
  if (!LxStr(passwd)) {
    return '密码不能包含连续字符（如123、abc）连续3位或3位以上';
  }
  // 不能相同字符（如111、aaa）连续3位或3位以上
  const re = /(\w)*(\w)\2{2}(\w)*/g;
  if (re.test(passwd)) {
    return '密码不能包含相同字符（如111、aaa）连续3位或3位以上';
  }
  return false;
};
/**
 * 获取区域等级
 * @param areaNumber
 * @returns {number}
 */
export const getAreaRank = (areaNumber = '') => {
  const areaId = areaNumber.substr(0, 6);
  return areaId.endsWith('0000') ? 1 : areaId.endsWith('00') ? 2 : 3;
};
/**
 * 数组转对象
 * @param arr
 * @param key
 * @returns {*|{}}
 */
export const flattenArr = (arr = [], key = 'key') => {
  return arr.reduce((map, item) => {
    map[item[key]] = item;
    return map;
  }, {});
};
/**
 * 对象转数组
 * @param obj
 * @returns {any[]}
 */
export const objToArr = (obj) => {
  return Object.keys(obj).map((key) => obj[key]);
};
/**
 * 获取最大值
 * @param arr
 * @param key
 * @returns {*}
 */
export const getMax = (arr = [], key) => {
  if (!arr.length) return;
  if (arr.length === 1) return key ? arr[0][key] : arr[0];
  const m = arr.reduce((accu, curr) => {
    if (key ? curr[key] > accu[key] : curr > accu) return curr;
    return accu;
  });
  return key ? m[key] : m;
};

/**
 * 从树中查找指定id对象
 * @param data
 * @param targetId
 * @param idKey
 * @param callback
 * @param childrenKey
 */
export const searchById = (
  data = [],
  targetId,
  idKey = 'key',
  callback,
  childrenKey = 'children',
) => {
  data.forEach((item, index, arr) => {
    if (item[idKey] === targetId) {
      return callback(item, index, arr);
    }
    if (item[childrenKey]) {
      return searchById(item[childrenKey], targetId, idKey, callback, childrenKey);
    }
  });
};
/**
 * 获取最小值
 * @param arr
 * @param key
 * @returns {*}
 */
export const getMin = (arr = [], key) => {
  if (!arr.length) return;
  if (arr.length === 1) return key ? arr[0][key] : arr[0];
  const m = arr.reduce((accu, curr) => {
    if (key ? curr[key] < accu[key] : curr < accu) return curr;
    return accu;
  });
  return key ? m[key] : m;
};
