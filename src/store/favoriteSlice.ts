import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../models/productsType';

export interface favoriCardsType {
    favoriCards: Product[],
}

function getFavoriCardsStorage() {
    const favoriCards = JSON.parse(
        localStorage.getItem("favoriCards") || "[]"
    );
    return favoriCards
}

const initialState: favoriCardsType = {
    favoriCards: getFavoriCardsStorage()
}

export const favoriteReducer = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addFavoriteCard: (state, action: PayloadAction<Product>) => {
            console.log(action.payload);
            const cardExists = state.favoriCards.some((card: Product) => card.id === action.payload.id);
            if (cardExists) {
                // Card delete()
                state.favoriCards = state.favoriCards.filter((card: Product) => (
                    card.id !== action.payload.id
                ))
                localStorage.setItem(
                    "favoriCards",
                    JSON.stringify(state.favoriCards)
                );
            }
            else {
                // Card add()
                state.favoriCards = [...state.favoriCards, action.payload];
                localStorage.setItem(
                    "favoriCards",
                    JSON.stringify(state.favoriCards)
                );
            }
        },
    },
})

export const { addFavoriteCard } = favoriteReducer.actions

export default favoriteReducer.reducer;