import { articleReducer } from "../reducers/articleReducer";
import thunk, { ThunkDispatch } from 'redux-thunk'
import {combineReducers,createStore,applyMiddleware, Action} from 'redux'

const rootReducer = combineReducers({
  articleState : articleReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk));

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch;
export type ThunkDispatchType = ThunkDispatch<RootStateType,any,Action>