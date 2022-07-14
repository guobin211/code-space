import { useEffect, useState } from 'react';

export interface NetworkState {
  /**
   * online最后改变时间
   */
  since?: Date;
  /**
   * 网络是否为在线
   */
  online?: boolean;
  /**
   * 当前连接下评估的往返时延
   */
  rtt?: number;
  /**
   * 设备使用与所述网络进行通信的连接的类型
   */
  type?: string;
  /**
   * 有效带宽估算（单位：兆比特/秒）
   */
  downlink?: number;
  /**
   * 最大下行速度（单位：兆比特/秒）
   */
  downlinkMax?: number;
  /**
   * 	用户代理是否设置了减少数据使用的选项
   */
  saveData?: boolean;
  /**
   * 网络连接的类型
   */
  effectiveType?: string;
}

enum NetworkEventType {
  ONLINE = 'online',
  OFFLINE = 'offline',
  CHANGE = 'change',
}

function getConnection() {
  const nav = navigator as any;
  if (typeof nav !== 'object') return null;
  return nav.connection || nav.mozConnection || nav.webkitConnection;
}

function getConnectionProperty(): NetworkState {
  const c = getConnection();
  if (!c) return {};
  return {
    rtt: c.rtt,
    type: c.type,
    saveData: c.saveData,
    downlink: c.downlink,
    downlinkMax: c.downlinkMax,
    effectiveType: c.effectiveType,
  };
}

export function useNetwork(): [NetworkState] {
  const [state, setState] = useState(() => {
    return {
      since: undefined,
      online: navigator?.onLine,
      ...getConnectionProperty(),
    };
  });

  useEffect(() => {
    const onOnline = () => {
      setState(prevState => ({
        ...prevState,
        online: true,
        since: new Date(),
      }));
    };

    const onOffline = () => {
      setState(prevState => ({
        ...prevState,
        online: false,
        since: new Date(),
      }));
    };

    const onConnectionChange = () => {
      setState(prevState => ({
        ...prevState,
        ...getConnectionProperty(),
      }));
    };

    window.addEventListener(NetworkEventType.ONLINE, onOnline);
    window.addEventListener(NetworkEventType.OFFLINE, onOffline);

    const connection = getConnection();
    connection?.addEventListener(NetworkEventType.CHANGE, onConnectionChange);

    return () => {
      window.removeEventListener(NetworkEventType.ONLINE, onOnline);
      window.removeEventListener(NetworkEventType.OFFLINE, onOffline);
      connection?.removeEventListener(NetworkEventType.CHANGE, onConnectionChange);
    };
  }, []);

  return [state];
}
