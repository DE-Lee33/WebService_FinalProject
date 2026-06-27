import { combineReducers, configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";
//import storage from "redux-persist/lib/storage";


const storage = {
  getItem: (key: string) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key: string, value: string) => Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key: string) => Promise.resolve(window.localStorage.removeItem(key)),
};



const user = createSlice({
    name: "user",
    initialState: "서울",
    reducers: {
        changeName() {
            return "부산";
        }
    }
});

export const { changeName } = user.actions;

const stock = createSlice({
    name: "stock",
    initialState: [500, 600, 700],
    reducers: {}
});

export interface CartItem {
    id: string;
    name: string;
    summary?: string;
}

export interface CartArray {
    cartA: CartItem[];
}

const cart = createSlice({
    name: "cart",
    initialState: {
        cartA: [],
    } as CartArray,
    reducers: {
        addToCart(state, action: PayloadAction<Omit<CartItem, "id">>) {

            const exist= state.cartA.some(
            (item) => item.name === action.payload.name
            )

            if (exist) return

            state.cartA.push({
            ...action.payload,
            id: action.payload.name
            })
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.cartA = state.cartA.filter((item) => item.id !== action.payload);
        },
        setCart(
            state,
            action: PayloadAction<CartItem[]>
        ){
            state.cartA = action.payload
        },
        clearCart(state) {
            state.cartA = []
        }
    }
});

const rootReducer = combineReducers({
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export const { addToCart, removeFromCart, setCart, clearCart } = cart.actions;

export default store;
