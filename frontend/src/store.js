import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"
import { userApi } from "./services/api/user/userServices";
import userReducer from "./services/slices/userSlice"


const store = configureStore({
reducer:{
    [userApi.reducerPath]:userApi.reducer,
    user: userReducer,
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
})



setupListeners(store.dispatch);
export default store