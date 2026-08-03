import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/home';
import Category from '../pages/category/category';
import MyFavorite from '../pages/myFavorite/myFavorite';
import MyBasket from '../pages/myBasket/myBasket';
import Details from '../pages/details/details';
import NotFound from '../pages/notFound/notFound';
import MyAccount from '../pages/MyAccount/myAccount';
import Search from '../pages/search/search';

function RouterConfig() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/myFavorite' element={<MyFavorite />} />
                <Route path='/myBasket' element={<MyBasket />} />
                <Route path='/:category' element={<Category />} />
                <Route path='/category/:category' element={<Category />} />
                <Route path='/category/:category/:id' element={<Details />} />
                <Route path='/search/:search' element={<Search />} />
                <Route path='/myAccount' element={<MyAccount />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default RouterConfig;