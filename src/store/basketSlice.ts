import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../models/productsType';

export interface basketCardType {
    basketCards: Product[],
    selectBasketCards: Product[],
}

function getBasketCardsStorage() {
    const basketCards = JSON.parse(
        localStorage.getItem("basketCards") || "[]"
    );
    return basketCards
}


function getSelectBasketCardsStorage() {
    const selectBasketCards = JSON.parse(
        localStorage.getItem("selectBasketCards") || "[]"
    );
    return selectBasketCards
}

const initialState: basketCardType = {
    basketCards: getBasketCardsStorage(),
    selectBasketCards: getSelectBasketCardsStorage(),
}

export const basketReducer = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addBasketCard: (state, action: PayloadAction<Product>) => {
            const cardExists = state.basketCards.some((card: Product) => card.id === action.payload.id);
            if (!cardExists) {
                state.basketCards = [...state.basketCards, action.payload];
            }
            localStorage.setItem(
                "basketCards",
                JSON.stringify(state.basketCards)
            );
        },
        removeBasketCard: (state, action: PayloadAction<Product>) => {
            state.basketCards = state.basketCards.filter((card: Product) => card.id !== action.payload.id);
            localStorage.setItem(
                "basketCards",
                JSON.stringify(state.basketCards)
            );
        },
        addSelectBasketCards: (state, action: PayloadAction<Product>) => {
            const cardExists = state.selectBasketCards.some((card: Product) => card.id === action.payload.id);
            if (!cardExists) {
                state.selectBasketCards = [...state.selectBasketCards, action.payload];
            }
            localStorage.setItem(
                "selectBasketCards",
                JSON.stringify(state.selectBasketCards)
            );
        },
        removeselectBasketCard: (state, action: PayloadAction<Product>) => {
            state.selectBasketCards = state.selectBasketCards.filter((card: Product) => card.id !== action.payload.id);
            localStorage.setItem(
                "selectBasketCards",
                JSON.stringify(state.selectBasketCards)
            );
        },
    },
})

export const { addBasketCard, removeBasketCard, addSelectBasketCards, removeselectBasketCard } = basketReducer.actions;

export default basketReducer.reducer;