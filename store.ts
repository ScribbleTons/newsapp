import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { userReducer, ThemeReducer } from "./features";
import {hackerNewsApi} from './services/hackerNews'

export const store = configureStore({
  reducer: { user: userReducer, theme: ThemeReducer, [hackerNewsApi.reducerPath]: hackerNewsApi.reducer, },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hackerNewsApi.middleware),
});
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
