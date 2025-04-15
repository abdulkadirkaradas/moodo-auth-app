import { moodo } from "moodo";

const instance = moodo({
  authProtocol: {
    useAuthProtocol: true,
    useOAUTHProtocol: true,
  },
  tokenConfig: {
    requestTokenConfig: {
      accessTokenName: "access_token",
      refreshTokenName: "refresh_token",
    },
    tokenStorageType: {
      accessToken: "localStorage",
      refreshToken: "localStorage",
    },
  },
  baseURL: "https://api.escuelajs.co/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const moodoInstance = () => {
  return instance;
};

export default moodoInstance;
