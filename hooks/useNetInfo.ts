import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import QueueLink from 'apollo-link-queue';

export default (queueLink: QueueLink): boolean => {
  const [isOnline, setOnline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const isInetReachable = state.isInternetReachable;
      if (isInetReachable === null) {
        return;
      }
      if (isInetReachable === undefined) {
        return;
      }

      if (isInetReachable) {
        queueLink.open();
      } else {
        queueLink.close();
      }
      console.log(isInetReachable);
      setOnline(isInetReachable);
    });
    return () => unsubscribe();
  }, [queueLink]);

  return isOnline;
};
