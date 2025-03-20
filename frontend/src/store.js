import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"
import { userApi } from "./services/api/user/userServices";
import  useReducer  from "./services/slices/userSlice";



const store = configureStore({
reducer:{
    [userApi.reducerPath]:userApi.reducer,
    user : useReducer,
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
})



setupListeners(store.dispatch);
export default store