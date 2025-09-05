import { fetchUtils } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import axios from "./axios";

const apiUrl = "http://localhost:5000/api";
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  if (token) options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

// Tell RA which header contains total count
const getTotalFromHeaders = (headers) => {
  // handle different casings
  const hdr = headers["x-total-count"] || headers["X-Total-Count"] || headers["X-Total-Count".toLowerCase()];
  return parseInt(hdr, 10) || undefined;
};

const mapRecord = (r) => ({ ...r, id: r._id });

const dataProvider = {
  getList: async (resource, params) => {
    const res = await axios.get(`/${resource}`, { params: params });
    const total = getTotalFromHeaders(res.headers) ?? (Array.isArray(res.data) ? res.data.length : 0);
    const data = (res.data || []).map(mapRecord);
    return { data, total };
  },

  getOne: async (resource, params) => {
    const res = await axios.get(`/${resource}/${params.id}`);
    return { data: mapRecord(res.data) };
  },

  create: async (resource, params) => {
    const res = await axios.post(`/${resource}`, params.data);
    return { data: mapRecord(res.data) };
  },

  update: async (resource, params) => {
    const res = await axios.put(`/${resource}/${params.id}`, params.data);
    return { data: mapRecord(res.data) };
  },

  delete: async (resource, params) => {
    const res = await axios.delete(`/${resource}/${params.id}`);
    return { data: mapRecord(res.data) };
  },

  // add other methods if your admin app needs them
};

export default dataProvider;
