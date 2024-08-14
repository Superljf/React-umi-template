import { Spin } from 'antd';
import React from 'react';

const PageLoading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // 水平居中
        alignItems: 'center', // 垂直居中
        width: '100%',
        height: '50vh',
      }}
    >
      <Spin />
    </div>
  );
};

export default PageLoading;
