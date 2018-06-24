import axios from "axios";

export function getBooks(limit = 10, start = 0, order = "asc", list = "") {
  console.log(list, "list");

  const request = axios
    .get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
    .then(response => {
      if (list) {
        return [...list, ...response.data];
      } else {
        return response.data;
      }
    });

  console.log(request, "request");
  return {
    type: "GET_BOOKS",
    payload: request
  };
}

export function getBookWithReviewer(id) {
  //00console.log(id);
  const request = axios.get(`/api/getBook?id=${id}`);

  return dispatch => {
    request.then(({ data }) => {
      let book = data;
      console.log(book);
      axios.get(`/api/getReviewer?id=${book.ownerId}`).then(({ data }) => {
        let response = {
          book,
          reviwer: data
        };
        console.log(response);
        dispatch({
          type: "GET_BOOK_W_REVIWER",
          payload: response
        });
      });
    });
  };
}

export function clearBookWithReviewer() {
  return {
    type: "CLEAR"
  };
}

export function addbook(book) {
  console.log("book", book);

  const request = axios.post("/api/book", book).then(response => response.data);
  return {
    type: "ADD_BOOK_REIVEW",
    payload: request
  };
}

/************USER**************************/

export function loginUser({ email, password }) {
  const request = axios
    .post("/api/login", { email, password })
    .then(res => res.data);

  console.log(request);
  return {
    type: "USER_LOGIN",
    payload: request
  };
}

export function auth() {
  const request = axios.get("/api/auth").then(response => response.data);

  return {
    type: "USER_AUTH",
    payload: request
  };
}
