import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '..';

export interface CardState {
  cards: CardData[];
  selectedCard: CardData | undefined;
  cardToUse: CardData | undefined;
}

const initialState: CardState = {
  cards: [],
  selectedCard: undefined,
  cardToUse: undefined,
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCards: (state, action: PayloadAction<CardData[]>) => {
      state.cards = action.payload;
    },
    selectCard: (state, action: PayloadAction<CardData | undefined>) => {
      state.selectedCard = action.payload;
    },
    addCard: (state, action: PayloadAction<CardData>) => {
      state.cards = [...state.cards, action.payload];
    },
    addCardToUse: (state, action: PayloadAction<CardData | undefined>) => {
      state.cardToUse = action.payload;
    },
  },
});

export const {addCards, selectCard, addCardToUse, addCard} = cardSlice.actions;
export const cardsState = (state: RootState) => state.cards.cards;
export const selectCardsState = (state: RootState) => state.cards.selectedCard;
export const cardsToUseState = (state: RootState) => state.cards.cardToUse;
export default cardSlice.reducer;
