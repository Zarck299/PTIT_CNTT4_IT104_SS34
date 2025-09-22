import { createStore, combineReducers } from "redux";
import { studentReducer } from "../store/reducer/studentReducer";

const rootReducer = combineReducers({
  student: studentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
