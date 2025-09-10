import * as Notifications from 'expo-notifications';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export class NotificationsService {
  static async requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  }

  static async scheduleNotification(title: string, body: string, data?: any) {
    const hasPermission = await this.requestPermissions();

    if (!hasPermission) {
      console.warn('Notification permissions not granted');
      return null;
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: data || {},
      },
      trigger: null, // Show immediately
    });

    return notificationId;
  }

  static async cancelNotification(notificationId: string) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }

  static async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  static async testAlertNotification(origin: string, destination: string, targetPrice: number) {
    const title = '🚨 Alerta de Preço!';
    const body = `O preço para ${origin} → ${destination} está abaixo de R$ ${targetPrice.toFixed(2)}!`;

    return await this.scheduleNotification(title, body, {
      type: 'price_alert',
      origin,
      destination,
      targetPrice,
    });
  }
}

// Export default instance
export default NotificationsService;
