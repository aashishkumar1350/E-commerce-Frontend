import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8001/api/v1",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getProducts = async () => {
  const res = await API.get("/products");
  return res.data;
};

export const getProductById = (id: any) => {
  return API.get(`/products/${id}`);
};

// CART APIs
export const addToCartAPI = (data: any) => {
  return API.post("/carts", data);
};

export const getCartAPI = () => {
  return API.get("/carts");
};

export const updateCartAPI = (id: any, data: any) => {
  return API.put(`/carts/${id}`, data);
};

// Remove item form cart
export const removeCartAPI = (id: any) => {
  return API.delete(`/carts/${id}`);
};

// AUTH APIs
export const loginAPI = (data: any) => {
  return API.post("/login", data);
};

export const registerAPI = (data: any) => {
  return API.post("/register", data);
};

// Place Order API
export const placeOrderAPI = async (data: any) => {
  const res = await API.post("/orders", data);
  return res.data;
};

export const createAddressAPI = async (data: any) => {
  const res = await API.post("/addresses", data);
  return res.data;
};

export const getOrdersAPI = async () => {
  const res = await API.get("/my-orders");
  return res.data;
};

export default API;