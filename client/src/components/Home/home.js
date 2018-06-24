import React, { Component } from "react";
import { connect } from "react-redux";
import { getBooks } from "../../actions";

import BookItem from "../../widgetsUI/book_item";
class Home extends Component {
  state = { books: [] };
  componentWillMount() {
    //   alert("ko");

    this.props.dispatch(getBooks(1, 0, "desc"));
  }
  loadmore = () => {
    let count = this.props.books.lisit.length;
    this.props.dispatch(getBooks(1, count, "desc", this.props.books.lisit));
  };
  renderItems = books => {
    console.log(books.lisit.length, "form ");
    if (books.lisit.length > 0) {
      return books.lisit.map(item => <BookItem {...item} key={item._id} />);
    } else {
      return <div>notie</div>;
    }
  };

  render() {
    // console.log(this.props.books);
    return (
      <div>
        {this.renderItems(this.props.books)}
        <div className="loadmore" onClick={this.loadmore}>
          LOAD MORE
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};
export default connect(mapStateToProps)(Home);
