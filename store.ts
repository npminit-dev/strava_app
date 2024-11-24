import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { getRefreshParams } from './constants/URL';
import { getUrlWithParams } from './utils';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null; 
  athleteName: string | null;
  setTokens: (
    accessToken: string,
    refreshToken: string,
    expiresAt: string, 
    athleteName: string
  ) => Promise<void>;
  clearTokens: () => Promise<void>;
  loadTokens: () => Promise<void>;
  isAccessTokenValid: () => boolean,
  refreshAccessToken: () => Promise<boolean>,
  tokenExpirationMiddleware: (callback:Function) => Promise<any>
}

const TOKEN_KEYS = {
  accessToken: 'ACCESS_TOKEN',
  refreshToken: 'REFRESH_TOKEN',
  expiresAt: 'EXPIRES_AT',
  athleteName: 'ATHLETE_NAME',
};

/* This store is responsible for managing the session data, 
storing it in the expo-secure-store, and making sure that the credentials do not expire. */

const useAuthStore = create<AuthState>()((set, get) => ({
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  athleteName: null,

  loadTokens: async () => {
    const [accessToken, refreshToken, expiresAt, athleteName] = await Promise.all([
      SecureStore.getItemAsync(TOKEN_KEYS.accessToken),
      SecureStore.getItemAsync(TOKEN_KEYS.refreshToken),
      SecureStore.getItemAsync(TOKEN_KEYS.expiresAt),
      SecureStore.getItemAsync(TOKEN_KEYS.athleteName),
    ]);

    set({
      accessToken: accessToken || null,
      refreshToken: refreshToken || null,
      expiresAt: expiresAt || null, 
      athleteName: athleteName || null,
    });
  },

  setTokens: async (accessToken, refreshToken, expiresAt, athleteName) => {
    await Promise.all([
      SecureStore.setItemAsync(TOKEN_KEYS.accessToken, accessToken),
      SecureStore.setItemAsync(TOKEN_KEYS.refreshToken, refreshToken),
      SecureStore.setItemAsync(TOKEN_KEYS.expiresAt, expiresAt), 
      SecureStore.setItemAsync(TOKEN_KEYS.athleteName, athleteName),
    ]);

    set({ accessToken, refreshToken, expiresAt, athleteName });
  },

  clearTokens: async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEYS.accessToken),
      SecureStore.deleteItemAsync(TOKEN_KEYS.refreshToken),
      SecureStore.deleteItemAsync(TOKEN_KEYS.expiresAt),
      SecureStore.deleteItemAsync(TOKEN_KEYS.athleteName),
    ]);

    set({ accessToken: null, refreshToken: null, expiresAt: null, athleteName: null });
  },

  // check if token has expired or not exists
  isAccessTokenValid: () => {
    const { expiresAt } = get();
    if (!expiresAt) return false;
    const nowInSeconds = Math.floor(Date.now()/1000);
    return nowInSeconds < parseInt(expiresAt);
  },

  // resfresh token function
  refreshAccessToken: async () => {
    const { refreshToken, setTokens, clearTokens, accessToken, athleteName } = get();

    if (!refreshToken) return false;
    
    try {
      const params = getRefreshParams(refreshToken);
      const url = getUrlWithParams("https://www.strava.com/oauth/token", params)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        await clearTokens();
        return false;
      }

      const data = await response.json();

      if (data.access_token && data.refresh_token && data.expires_at) {
        await setTokens(data.access_token, data.refresh_token, data.expires_at.toString(), athleteName || '');
        return true;
      } else return false;
    } catch (error) {
      console.error("Error while refreshing access token:", error);
      return false;
    }
  },

  // wrapps every query with this middleware to make sure that the tokens are always fresh
  tokenExpirationMiddleware: async (callback: any) => {
    const { isAccessTokenValid, refreshAccessToken } = get()
    if(!isAccessTokenValid()) {
      await refreshAccessToken()
    }
    return await callback()
  }
}));

export default useAuthStore;
