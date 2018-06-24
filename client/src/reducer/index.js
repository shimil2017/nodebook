import { combineReducers } from "redux";
import books from "./book_rducer";
import user from "./user_reducer";
const rootReducer = combineReducers({
  books,
  user
});

export default rootReducer;
