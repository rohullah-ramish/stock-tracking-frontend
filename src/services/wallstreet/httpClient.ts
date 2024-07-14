import axios, { AxiosInstance } from "axios";

const WALLSTREET_API = process.env.NEXT_PUBLIC_WALLSTREET_API;
const WALLSTREET_BASE_URL = process.env.NEXT_PUBLIC_WALLSTREET_BASE_URL;

class WallStreetHttpClient {
  private static instance: AxiosInstance | undefined;

  public static getInstance() {
    if (WallStreetHttpClient.instance) return WallStreetHttpClient.instance;

    WallStreetHttpClient.instance = axios.create({
      baseURL: WALLSTREET_BASE_URL,
    });

    WallStreetHttpClient.instance.interceptors.request.use(function (request) {
      request.url += `&apikey=${WALLSTREET_API}`;
      return request;
    });

    return WallStreetHttpClient.instance;
  }
}

const wallStreetHttpClient = WallStreetHttpClient.getInstance();

export default wallStreetHttpClient;
