export default function(
  state = { lisit: [], book: {}, reviwer: {}, newbook: {} },
  action
) {
  switch (action.type) {
    case "GET_BOOKS":
      return { ...state, lisit: action.payload };
    case "GET_BOOK_W_REVIWER":
      return {
        ...state,
        book: action.payload.book,
        reviwer: action.payload.reviwer
      };
    case "CLEAR":
      return {
        ...state,
        book: {},
        reviwer: {}
      };
    case "ADD_BOOK_REIVEW":
      return { ...state, newbook: action.payload };
    default:
      return state;
  }
}
