import { IUserData } from '../interfaces';

const SESSION_STORAGE_KEYS = {
  email: 'user-email',
  userData: 'user-data',
};

const setUserData = (value: IUserData) => {
  try {
    sessionStorage.setItem(
      SESSION_STORAGE_KEYS.userData,
      JSON.stringify(value)
    );
  } catch (error) {
    console.error('Error storing "user data" in sessionStorage:', error);
  }
};

const getUserData = (): IUserData | null => {
  try {
    const userData = sessionStorage.getItem(SESSION_STORAGE_KEYS.userData);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error storing "user data" in sessionStorage:', error);
    return null;
  }
};

const SessionStorageService = {
  setUserData,
  getUserData,
};

export default SessionStorageService;
