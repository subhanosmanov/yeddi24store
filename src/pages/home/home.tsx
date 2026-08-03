import { useEffect, useState } from "react";
import CardList from "../../components/cardList/cardList";
import Mostlike from "../../components/mostLike/mostLike";
import type { Product } from "../../models/productsType";
import type { Category } from "../../models/allCategories";
import { AllCategories } from "../../service/allCategories";
import { Categories } from "../../service/categories";
import { ClipLoader } from "react-spinners";
import "./home.scss";
import HomeSkeletonList from "../../components/homeSkeletonList/homeSkeletonList";

function Home() {

    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [allProducts, setAllProducts] = useState<Product[][]>([]);
    const [error, setError] = useState("");

    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [allCategoriesLength, setAllCategoriesLength] = useState(6);
    const [loadText, setLoadText] = useState("Daha Çoxuna Bax!");

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setLoading(true);
        try {
            const categoryRes = await AllCategories();
            console.log(categoryRes.data, "categoryRes")
            setAllCategories(categoryRes.data);

            const productRequests = categoryRes.data.map((category: Category) =>
                Categories(category.slug)
            );

            const productResults = await Promise.all(productRequests);
            console.log("productResults", productResults);
            const allDataProducts = productResults.map((res) =>
                res.data.products
            );
            setAllProducts(allDataProducts);
        } catch (error) {
            setError("Məlumatları yükləmək alınmadı");
        } finally {
            setLoading(false);
        }
    }

    function wiewMore() {
        setLoadMoreLoading(true);
        if (allCategoriesLength < 24) {
            if (allCategoriesLength === 21) {
                setLoadText("Daha Azına bax!");
            }
            setTimeout(() => {
                setAllCategoriesLength((prev) => prev + 3);
                setLoadMoreLoading(false);
            }, 1000);
        }
        else {
            setLoadMoreLoading(false);
            setAllCategoriesLength(allCategoriesLength - 3);
            setLoadText("Daha Çoxuna Bax!");
        }
    }

    return (
        <div className="home">
            {!loading ? allProducts?.slice(0, allCategoriesLength).map((categoryProducts) => (
                <CardList key={categoryProducts[0].id} products={categoryProducts} />
            )) : <HomeSkeletonList />}
            {loadMoreLoading ? <div className="home__spinner"><ClipLoader /></div>
                : <button className="home__view-button" onClick={wiewMore} style={{ cursor: "pointer" }}>{loadText}</button>
            }
            <Mostlike />
        </div>
    )
}

export default Home;