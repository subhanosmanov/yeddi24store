import { useEffect, useState } from "react";
import { mostLike } from "../../service/mostLike";
import "./mostLike.scss";
import Card from "../card/card";
import type { Product } from "../../models/productsType";
import CardSkeleton from "../cardSkeleton/cardSkeleton";

function Mostlike() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchMostLikedProducts();
    }, []);

    async function fetchMostLikedProducts() {
        setLoading(true);
        try {
            const res = await mostLike();
            const result = [...res.data.products].sort((a, b) => b.rating - a.rating);
            console.log(res.data.products, "salamn!");
            setProducts(result.slice(0, 6));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="most-like">
            <div className="most-like__title" style={{ padding: "10px 0" }}>
                <h2>Ən Çox Bəyənilənlər</h2>
            </div>
            <div className="most-like__list">
                {!loading ? products.map((product, i) => (
                    <Card key={i} product={product} />
                ))
                    : Array.from({ length: 5 }).map((_, index) => (
                        <CardSkeleton key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default Mostlike;