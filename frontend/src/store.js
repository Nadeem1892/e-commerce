import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"
import { userApi } from "./services/api/user/userServices";
import authSlice from "./services/slices/AuthSlice"


const store = configureStore({
reducer:{
    [userApi.reducerPath]:userApi.reducer,
    auth: authSlice
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
})



setupListeners(store.dispatch);
export default store