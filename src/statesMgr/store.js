import {reducer} from './reducer'
import { createStore,applyMiddleware } from 'redux'
// import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import {createLogger} from 'redux-logger';
// import promiseMiddleware from 'redux-promise-middleware';

const logger = createLogger()

//1. store只支持dispatch中传对象,直接同步改状态，如果要等异步请求到了后改状态，需用到 redux-thunk 中间件进行改造
//store.dispatch(thunk())

// export const store = createStore(reducer, applyMiddleware(thunk,logger));

//2. 使用redux-promise 使dispatch方法中支持primise
export const store = createStore(reducer, applyMiddleware(promiseMiddleware,logger));