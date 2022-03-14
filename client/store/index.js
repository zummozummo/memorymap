import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import { createWrapper } from "next-redux-wrapper"
import rootReducer from '../store/reducers';
// import logger from 'redux-logger'

const middlewares = [thunk];
 
// if (process.env.NODE_ENV === `development`) {
//     middlewares.push(logger);
// }

const makeStore = () => createStore(
	rootReducer,
	compose(applyMiddleware(...middlewares))
	);
// console.log(makeStore);
export const wrapper = createWrapper(makeStore)
