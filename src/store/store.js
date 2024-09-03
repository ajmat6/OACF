import {configureStore} from '@reduxjs/toolkit'
import userAuthReducer from '../reducers/userAuthReducer';
import notesUserReducer from '../reducers/notesUserReducer';
import itemReducer from '../reducers/itemReducer';
import modeReducer from '../reducers/modeReducer';

const store = configureStore({
    reducer: {
        auth: userAuthReducer,
        uNotes: notesUserReducer,
        item: itemReducer,
        mode: modeReducer
    }
})

export default store;