import AsyncStorage from '@react-native-community/async-storage';

const AUTH_TOKEN = 'AUTH_TOKEN';
const AUTH_USERID = 'AUTH_USERID';

let token: string | null;
let userId: number | null;

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }

  token = await AsyncStorage.getItem(AUTH_TOKEN);
  return token;
};

export const getUserId = async () => {
  if (userId) {
    return Promise.resolve(userId);
  }

  userId = Number.parseInt(
    (await AsyncStorage.getItem(AUTH_USERID)) as string,
    10,
  );
  return userId;
};
export const signIn = (newToken: string, newUserId: number) => {
  token = newToken;
  userId = newUserId;
  return Promise.all([
    AsyncStorage.setItem(AUTH_TOKEN, newToken),
    AsyncStorage.setItem(AUTH_USERID, newUserId.toString()),
  ]);
};

export const signOut = () => {
  token = null;
  return Promise.all([
    AsyncStorage.removeItem(AUTH_TOKEN),
    AsyncStorage.removeItem(AUTH_USERID),
  ]);
};
