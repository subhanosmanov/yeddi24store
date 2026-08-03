import axios from "axios";
import type { Category } from "../models/allCategories";

export async function AllCategories() {
    const data = "https://dummyjson.com/products/categories";

    const res = await axios.get<Category[]>(data);
    return res;
}