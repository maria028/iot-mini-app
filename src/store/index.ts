import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "@/utils/storage";
// 状态对象持久化  存储序列化
const persistConfig = {
    key: "iot", // required
    storage // required
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
    typeof window === "object" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;

// 中间件
const middlewares: Array<any> = [thunk];

if (process.env.NODE_ENV === "development") {
    middlewares.push(require("redux-logger").createLogger());
}

const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
    // other store enhancers if any
);
const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store);

export { store, persistor };
