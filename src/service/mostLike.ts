import axios from "axios";


export async function mostLike () {
  const response = await axios.get("https://dummyjson.com/products?limit=100");
  return response;
}