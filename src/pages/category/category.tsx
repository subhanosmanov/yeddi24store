import { useParams } from "react-router-dom";
import "./category.scss";
import { useEffect, useState } from "react";
import Card from "../../components/card/card";
import { Categories } from "../../service/categories";
import SkeletonList from "../../components/skeletonList/skeletonList";
import type { Product } from "../../models/productsType";
import { AllCategories } from "../../service/allCategories";
import NotFound from "../notFound/notFound";

function Category() {
    const { category } = useParams<string>();
    const [foundCategory, setFoundCategory] = useState<Product[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isPage, setIsPage] = useState<boolean>(true);

    useEffect(() => {
        getAllCategories();
        getCategories();
        console.log(category);
    }, [category]);

    async function getAllCategories() {
        try {
            const all = await AllCategories();
            console.log("all-data",all.data);
            const exist = all.data.some(item => item.slug === category);
            if (!exist) {
                // return <NotFound />;
                setIsPage(false);
                console.log("tapılmadı bele sehıfe!")
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function getCategories() {
        setLoading(true);
        if (!category) return;
        try {
            const response = await Categories(category);
            console.log("foundCategory:", response.data.products)
            setFoundCategory(response.data.products);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    if (isPage) {
    return (
        <div className="category">
            {!loading ?
                <div className="category__content">
                    <div className="category__header">
                        <h2>{category?.toUpperCase()}</h2>
                    </div>
                    <div className="category__grid">
                        {foundCategory && foundCategory.map((product: Product, i: number) => (
                            <Card key={i} product={product} />
                        ))
                        }
                    </div>
                </div> :
                <div className="category__skeleton">
                    <div className="category__skeleton-header"></div>
                    <SkeletonList skeletonLength={6} />
                </div>
            }
        </div>
    )
    } else {
        return <NotFound />;
    }
}
export default Category;