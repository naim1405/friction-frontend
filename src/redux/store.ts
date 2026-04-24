import userSliceReducer from './features/user/userSlice'
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { baseApi } from './api/baseApi';



export const store = configureStore({
    reducer: {
        ...reducer,
        user: userSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
