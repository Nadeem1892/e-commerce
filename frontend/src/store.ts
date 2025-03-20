import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"
import { userApi } from "./service/api/user/userService";
import userReduser from "./service/slices/userSlice"
const store = configureStore({
reducer:{
    [userApi.reducerPath]:userApi.reducer,
    user: userReduser
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
})
// Define RootState type for TypeScript support
export type RootState = ReturnType<typeof store.getState>;


setupListeners(store.dispatch);
export default store