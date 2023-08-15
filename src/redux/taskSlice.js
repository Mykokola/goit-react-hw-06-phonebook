import { createSlice, nanoid } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { storage } from 'redux-persist';
const initialState = {
  items: [],
  value: '',
};
export const contactSlice = createSlice({
  name: 'contact',
  initialState: initialState.items,
  reducers: {
    addContacts: {
      reducer(state, { payload }) {
        state.items.push(payload);
      },
      prepare(contact) {
        return {
          payload: {
            ...contact,
            id: nanoid(),
          },
        };
      },

      deleteTask(state, action) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      },
    },
  },
});
export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState.value,
  reducers: {
    setFilter(state, action) {
      state.value = action.payload;
    },
  },
});
const persistConfig = {
  key: 'contacts',
  storage,
};
export const persistedReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);
export const {setFilter} = filterSlice.actions
export const { addContact, deleteContact } = contactsSlice.actions;
export const getFilterValue = state => state.filter.value
export const getContactsItems = state => state.contacts.items;
