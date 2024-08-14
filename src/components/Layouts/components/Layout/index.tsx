import { useEffect, useMemo, useState } from 'react';
import type { LayoutProps } from './types';
import { useModel } from 'umi';
import styles from './index.less';
import outPng from '@/assets/imgs/loginOut.png';
import { useHistory, useLocation } from 'umi';
import dash from '@/assets/imgs/dash.png';
import { logout } from '@/services/common';

const Layout = (props: LayoutProps) => {
  const { children } = props;
  const {
    initialState: { username: initName },
  } = useModel('@@initialState');
  const { username: modelName } = useModel('commonModel');
  const username = modelName || initName;
  const history = useHistory();
  const location = useLocation();
  const tab = location.pathname?.split('/')?.pop();
  const [key, setKey] = useState(tab);
  const [title, setTitle] = useState('看板');

  const handleLogout = async () => {
    await logout();
    history.push('/login');
    // message.success('退出成功');
  };

  const TabItem: React.FC<{
    tabKey: string;
    iconActive: string;
    iconInactive: string;
    text: string;
    path: string;
  }> = ({ tabKey, iconActive, iconInactive, text, path }) => {
    const handleClick = () => {
      setKey(tabKey);
      history.push(path);
      setTitle(text);
    };
    const isActive = tabKey === key;
    const itemClassName = isActive ? styles.tabClick : styles.tabItem;

    return (
      <div onClick={handleClick} className={`${itemClassName}`}>
        <img src={isActive ? iconActive : iconInactive} alt="icon" />
        <div>{text}</div>
      </div>
    );
  };

  const childrenRender = useMemo(() => {
    return <div className={styles.content}>{children}</div>;
  }, [children]);

  const layout = useMemo(() => {
    return (
      <div className={styles.layout}>
        <div style={{ display: 'flex' }}>
          {/* sideBar */}
          <div className={styles.sideBar}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className={styles.ava}>{username?.slice(0, 1)}</div>
              <div className={styles.name}>{username}</div>
              <img src={outPng} onClick={handleLogout} className={styles.outImg} />
            </div>
            <div className={styles.tab}>
              <TabItem
                tabKey="workPlace"
                iconActive={dash}
                iconInactive={''}
                text="看板"
                path="/workPlace"
              />
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.head}>{title}</div>
            {childrenRender}
          </div>
        </div>
      </div>
    );
  }, [children]);

  return <>{layout}</>;
};

export default Layout;
