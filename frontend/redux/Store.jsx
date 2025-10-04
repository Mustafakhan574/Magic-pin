import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice'
import OwnerSlice from './OwnerSlice'
import MapSlice from './MapSlice'
export const store = configureStore({
         reducer:{
          user: userSlice,
          Owner:OwnerSlice,
          map:MapSlice
         }
})