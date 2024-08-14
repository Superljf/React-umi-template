
import Layout from '@/components/Layouts/components/Layout';
import { getDeviceSummary, getDevicesRealTimeProp } from '@/services/common';
import { Spin } from 'antd';
import React, { memo, useCallback, useEffect, useState } from 'react';
import styles from './index.less';
import workBg from "@/assets/imgs/workBg.png";
import ReactECharts from 'echarts-for-react';
import GlobalModal from '../components/GlobalModal';
import warnPng from "@/assets/imgs/warning.png";

const useDeviceSummary = () => {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDeviceSummary = async () => {
    setLoading(true);
    try {
      const res = await getDeviceSummary();
      const arr = [
        { label: '总设备', value: res?.total },
        { label: '运行设备', value: res?.running },
        { label: '停机设备', value: res?.stopping },
        { label: '故障警报', value: res?.malfunctioning },
      ];
      setSummary(arr);
    } catch (error) {
      console.error("Failed to fetch device summary:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeviceSummary();
  }, []);

  return { summary, loading };
};

const useRealTimeDevices = () => {
  const [devices, setDevices] = useState({});
  const [annimateStatus, setAnnimate] = useState(true);
  let intervalId = "";
  let times = "";
  const fetchRealTimeDevices = useCallback(async (isFirst = true) => {
    try {
      const res = await getDevicesRealTimeProp({
        times,
      });
      setDevices(res);
      setAnnimate(isFirst);
      times++;
    } catch (error) {
      clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    fetchRealTimeDevices();
    intervalId = setInterval(() => fetchRealTimeDevices(false), 5000);
    return () => clearInterval(intervalId);
  }, []);

  return { devices, annimateStatus, times };
};

const HomePage = () => {
  const { summary, loading } = useDeviceSummary();
  const { devices, annimateStatus, } = useRealTimeDevices();

  const [summaryData, setSummary] = useState(summary);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSummary([...summary]);
  }, [summary]);


  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [closeStatus, setStatus] = useState(false);

  const warningInfos = ['发现警报！警报已记录！', '已向负责人138******78手机发送提醒', '已向负责人邮箱yy***@**com发送警报', '警报已发出，等待修复！'];
  const [warningList, setWarningList] = useState([]);

  useEffect(() => {
    if (warningList?.length === warningInfos.length) {
      setTimeout(() => {
        setStatus(true);
      }, 1000);
    }
  }, [warningList?.length]);


  useEffect(() => {
    let intervalId;
    setWarningList([]);
    setStatus(false);
    if (isOpen) {
      let index = 0; // 初始化警告信息的索引
      intervalId = setInterval(() => {
        if (index < warningInfos.length) {
          setWarningList(prevList => [...prevList, warningInfos[index]]);
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, 1500); // 每秒插入一条数据
    } else {
      // 清除间隔计时器
      clearInterval(intervalId);
    }

    // 清除间隔计时器以避免内存泄漏
    return () => {
      clearInterval(intervalId);
    };
  }, [isOpen]);

  useEffect(() => {
    if (devices?.warning) {
      setIsOpen(true);
      const newData = [...summaryData];
      newData[3].value = 1;
      setSummary([...newData]);
    }
  }, [devices?.warning]);





  const LineChart = () => {
    const option = {
      // ECharts 配置
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: devices?.backPress?.label,
        axisLabel: {
          showMaxLabel: true,
          interval: 19
        },
        axisTick: {
          alignWithLabel: true
        },
      },
      legend: {
        data: devices?.backPress?.dataList?.map(item => item.name),
        top: '0px',      // 距离顶部5%
        right: '26px',    // 距离右侧5%
      },
      grid: {
        containLabel: true,
        left: '26px',
        bottom: '20px',
        top: '30px',
        right: '26px',
      },
      yAxis: {
        type: 'value',
        name: '单位：P（bar）',
        // min: minKick,
        // max: maxValue
      },
      series: devices?.backPress?.dataList?.map(item => ({
        name: item.name,
        data: item.data, // 假设每个 category 有一个 values 数组
        type: 'line',
        smooth: true,
        showSymbol: false,
        animation: annimateStatus,
        markPoint: {
          itemStyle: {
            normal: {
              color: "red"
            }
          },
          data: [{
            name: '周最低', value: "警报", xAxis: devices?.backPress?.markPoint?.xAxis,
            yAxis: devices?.backPress?.markPoint?.yAxis
          }]
        }
      })),
    };
    return <ReactECharts option={option} style={{ height: '300px', width: '100%', margin: '0', padding: '0' }} />;
  };
  return (
    <Layout>
      <Spin spinning={loading}>
        <div>
          {/* <button onClick={openModal}>Open Global Modal</button> */}
          <GlobalModal haveClose={closeStatus} isOpen={isOpen} onClose={closeModal}>
            <div className={styles.warnModal} >
              <div className={styles.warnPng}>
                <div style={{ marginTop: 100 }}>主腔气压异常！!</div>
              </div>
              {
                warningList?.map((item, index) => {
                  return (
                    <div key={index}
                      className={styles.warn_div}>
                      {item}
                    </div>
                  );
                })
              }
            </div>
          </GlobalModal>
        </div>
        <div className={styles.head}>
          {summaryData?.map((item, index) => {
            return (
              <div className={styles.num_div} key={index}>
                <div className={styles.label}>{item.label}</div>
                <div className={styles.num}
                  style={{
                    color: index === 3 && item?.value > 0 ? 'red'
                      : ''
                  }}
                >
                  {item?.value}&nbsp;
                  {index === 3 && item?.value > 0 && <a>{`查看详情${'>'}`}</a>}
                </div>
                <img src={workBg} />
              </div>
            );
          })}
        </div>
        <div className={styles.chart}>
          <div className={styles.title}>
            压强检测
          </div>
          <div
            style={{
              paddingBottom: 20
            }}>
            {
              devices?.backPress?.dataList?.length > 0 ? <LineChart /> :
                <div style={{ height: 300, width: '100%', background: "#fff" }} />
            }
          </div>
        </div>
      </Spin >
    </Layout >
  );
};

export default memo(HomePage);

