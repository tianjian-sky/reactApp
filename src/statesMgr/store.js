import {reducer} from './reducer'
import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

const logger = createLogger()

// store只支持dispatch中传对象,直接同步改状态，如果要等异步请求到了后改状态，需用到 redux-thunk 中间件进行改造
//store.dispatch(thunk())
export const store = createStore(reducer, applyMiddleware(thunk,logger));