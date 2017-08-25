import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import gql from 'graphql-tag';
import {graphql} from 'react-apollo';



class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <MainTabNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    let tokenPromise = registerForPushNotificationsAsync();
    tokenPromise.then((token) => {
      //console.log("Token:", token);
      this.props.mutate({variables: {token: token}})
      .then((res) => {
          console.log("Token Saved:", res);
      })
      .catch((err) => {
          console.log("Error saving token:", err);
      })
    })

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}

const createPushTokenMutation = gql`
  mutation createPushToken($token: String!) {
    createPushToken(token: $token) {
      id
    }
  }
`

const RootNavigatorWithMutation = graphql(createPushTokenMutation)(RootNavigator);

export default RootNavigatorWithMutation;
