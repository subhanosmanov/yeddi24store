import axios from "axios";

export async function Categories(category: string) {

    const data = `https://dummyjson.com/products/category/${category}`;

    const res = await axios.get(data);
    return res;
}
