import api from '@/common/api';
import { query, remove, submit } from '@/services/commonService';
import { print, showSuccess } from '@/utils/sysFun';
import { message } from 'antd';
import { useCallback, useState } from 'react';

export default function CommonModel() {
  const [loading, setLoading] = useState(0);
  const [queryLoading, setQueryLoading] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [state, setState] = useState({});

  const save = useCallback((payload) => {
    setState((s) => {
      return { ...s, ...payload };
    });
  }, []);

  const clear = useCallback(() => {
    setState({});
  }, []);

  const clearByTargetKey = useCallback((targetKey) => {
    setState((s) => {
      delete s[targetKey];
      return { ...s };
    });
  }, []);

  const proTableQuery = async ({
    payload,
    targetKey,
    callback,
    pagination,
    getList,
    saveData,
    ...restProps
  } = {}) => {
    if (pagination) {
      payload.pageNum = payload.current;
    } else {
      delete payload.current;
      delete payload.pageSize;
    }
    print(JSON.stringify(payload), api[`${targetKey}Query`]?.url, 'commonModel');
    let tableData = { data: [] };
    try {
      const response = await query({ data: payload, targetKey, ...restProps });
      if (response && response.success) {
        const { entity = {} } = response;
        if (callback) callback(entity, response);
        if (pagination) {
          const { list = [], total = 0, pageSize = 10, pageNum: current } = entity;
          tableData = { current, data: list, pageSize, total };
        } else {
          tableData = {
            data: getList
              ? getList(entity)
              : entity instanceof Array
                ? entity
                : entity.list || [],
          };
        }
        if (saveData) save({ [targetKey]: entity });
      } else {
        clearByTargetKey(targetKey);
      }
    } catch (e) {
      clearByTargetKey(targetKey);
    }
    return tableData;
  };

  const handleQuery = async ({
    payload,
    targetKey,
    callback,
    params,
    method,
    ...restProps
  } = {}) => {
    print(
      JSON.stringify(payload || params),
      restProps.url || api[`${targetKey}Query`]?.url,
      'commonModel',
    );
    setLoading((count) => count + 1);
    setQueryLoading((count) => count + 1);
    let res = {};
    try {
      const response = await query({
        params,
        method,
        data: payload,
        targetKey,
        ...restProps,
      });
      const { message: msg } = response;
      if (response && (response.success || response.code === 1)) {
        res = response;
        const { entity = {}, data = {} } = response;
        save({ [targetKey]: Object.keys(entity).length === 0 ? data : entity });
        if (callback) callback(Object.keys(entity).length === 0 ? data : entity, response);
      } else {
        clearByTargetKey(targetKey);
        message.error(msg);
      }
    } catch (e) {
      clearByTargetKey(targetKey);
    }
    setLoading((count) => count - 1);
    setQueryLoading((count) => count - 1);
    return res;
  };

  const handleSubmit = async ({
    payload,
    targetKey,
    showResult = true,
    callback,
    ...restProps
  } = {}) => {
    print(JSON.stringify(payload), api[`${targetKey}Submit`]?.url, 'commonModel');
    setLoading((count) => count + 1);
    setSubmitLoading(true);
    let res = {};
    try {
      const response = await submit({ data: payload, targetKey, ...restProps });
      if (response && response.success) {
        res = response;
        const { entity = {} } = response;
        if (showResult) showSuccess(api[`${targetKey}Submit`]);
        if (callback) callback(entity, response);
      }
    } catch (e) {
    }
    setLoading((count) => count - 1);
    setSubmitLoading(false);
    return res;
  };

  const handleRemove = async ({
    payload,
    targetKey,
    showResult = true,
    callback,
    ...restProps
  } = {}) => {
    print(JSON.stringify(payload), api[`${targetKey}Remove`]?.url, 'commonModel');
    setLoading((count) => count + 1);
    setRemoveLoading(true);
    let res = {};
    try {
      const response = await remove({ data: payload, targetKey, ...restProps });
      if (response && response.success) {
        res = response;
        const { entity = {} } = response;
        if (showResult) showSuccess(api[`${targetKey}Remove`]);
        if (callback) callback(entity, response);
      }
    } catch (e) {
    }
    setLoading((count) => count - 1);
    setRemoveLoading(false);
    return res;
  };

  return {
    loading: !!loading,
    queryLoading: !!queryLoading,
    submitLoading,
    removeLoading,
    proTableQuery,
    query: handleQuery,
    submit: handleSubmit,
    remove: handleRemove,
    save,
    clear,
    ...state,
  };
}
