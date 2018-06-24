import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-dom";
import { addbook } from "../../actions";
class AddReview extends Component {
  state = {
    formdata: {
      name: "",
      auhtor: "",
      review: "",
      pages: "",
      rating: "",
      price: ""
    }
  };
  handleinput = (event, name) => {
    //  this.setState({})
    const newFormdata = {
      ...this.state.formdata
    };
    newFormdata[name] = event.target.value;
    this.setState({
      formdata: newFormdata
    });
  };

  submit = e => {
    e.preventDefault();
    console.log(this.props);
    //return;
    this.props.dispatch(
      addbook({
        ...this.state.formdata,
        ownerId: this.props.user.login.id
      })
    );
  };
  render() {
    return (
      <div className="rl_container article">
        <form onSubmit={this.submit}>
          <h2>Add a reivew</h2>
          <div className="form_element">
            <input
              type="text"
              placeholder="enter name"
              value={this.state.formdata.name}
              onChange={event => this.handleinput(event, "name")}
            />
          </div>
          <div className="form_element">
            <input
              type="text"
              placeholder="enter author"
              value={this.state.formdata.author}
              onChange={event => this.handleinput(event, "auhtor")}
            />
          </div>

          <textarea
            value={this.state.formdata.review}
            placeholder="enter price"
            onChange={event => this.handleinput(event, "review")}
          />
          <div className="form_element">
            <input
              type="text"
              placeholder="enter pages"
              value={this.state.formdata.pages}
              onChange={event => this.handleinput(event, "pages")}
            />
          </div>

          <div className="form_element">
            <select
              value={this.state.formdata.rating}
              onChange={event => this.handleinput(event, "rating")}
            >
              <option val="1">1</option>
              <option val="2">2</option>
              <option val="3">3</option>
              <option val="4">4</option>
              <option val="5">5</option>
            </select>
          </div>

          <div className="form_element">
            <input
              type="text"
              value={this.state.formdata.price}
              placeholder="enter price"
              onChange={event => this.handleinput(event, "price")}
            />
          </div>

          <button typr="submit">Add review</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(AddReview);
