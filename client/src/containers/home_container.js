import React, { Component } from "react";
import { connect } from "react-redux";
import { getBooks } from "../actions";

import BookItem from "../widgetsUI/book_item";
class HomeContainer extends Component {
  state = { books: [] };
  componentWillMount() {
    //   alert("ko");

    this.props.dispatch(getBooks(3, 0, "desc"));
  }
  renderItems = books => {
    console.log(books.lisit.length, "form ");
    if (books.lisit) {
      return <div>kdk</div>;
    } else {
      return <div>notie</div>;
    }
  };
  componentWillReceiveProps = nextProps => {
    console.log(nextProps.books.lisit, "book");
    this.setState({ books: nextProps.books.list });
  };
  render() {
    // console.log(this.props.books);
    return <div>{this.renderItems(this.props.books)}</div>;
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};
export default connect(mapStateToProps)(HomeContainer);
