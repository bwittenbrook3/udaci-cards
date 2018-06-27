import { Notifications, Permissions } from 'expo';

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
  return status
}

export async function scheduleNotification() {

  // ask for permission
  const status = await getiOSNotificationPermission()

  if (status === 'granted') {

    // Clear any pending notifications
    Notifications.cancelAllScheduledNotificationsAsync();

    const localnotification = {
      title: 'Quiz Time!',
      body: 'Please complete your quiz for the day.',
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    };

    // alert at 5:30 each day if you have not taken your quiz
    let time = new Date()
    time.setDate(time.getDate() + 1)
    time.setHours(17)
    time.setMinutes(30)

    Notifications.scheduleLocalNotificationAsync(
      localnotification,
      { time, repeat: 'day'}
    );
  }
}
