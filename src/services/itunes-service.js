import axios from "axios/index";
import { Config } from "../config";

const ItunesService = {
  get: async (query, entity) => {
    return axios.get(
      `${Config.ITUNES_API_URL}?term=${query}&entity=${entity}&limit=${Config.QUERY_LIMIT}`,
      {}
    );
  }
};
export default ItunesService;
