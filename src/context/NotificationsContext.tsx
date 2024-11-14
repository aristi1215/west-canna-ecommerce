import { ExpoPushToken } from 'expo-notifications';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../lib/notifications';
import { supabase } from '../client/client';
import { useAuthContext } from './AuthContext';

const NotificationProvider = ({ children }: PropsWithChildren) => {

    const { profile } = useAuthContext()

  const [expoPushToken, setExpoPushToken] = useState<
    ExpoPushToken | undefined
  >();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();


  const savePushToken = async(newToken:string | undefined) => {
    setExpoPushToken(newToken)

    if(!newToken) {return}
    const {data, error} = await supabase.from('profiles').update({expo_push_token: newToken}).eq('id', profile.id).select()
    if(error) throw new Error('Error updating db', error)
    console.log('Datos de tales', data)

  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      savePushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return <>{children}</>;
};

export default NotificationProvider;