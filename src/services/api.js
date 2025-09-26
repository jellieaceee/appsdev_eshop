// src/services/api.js
import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data.products;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
