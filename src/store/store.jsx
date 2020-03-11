import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import Reducers from '../reducers/reducers';

const middleware = applyMiddleware(thunk);
const store = createStore(Reducers, middleware);

export default store;
