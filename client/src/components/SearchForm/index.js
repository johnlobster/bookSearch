import React from 'react';
import "./index.css";

class SearchForm extends React.Component {

    state = {
      title: "",
      author: ""
    }
  handleSubmit = (event) => {
    this.props.handleSubmit(this.state.title, this.state.author);
  }
  render() {
    return (
      <div>
        <h1>Search form</h1>
        <button className="btn btn-primary SearchFormButton" onClick={this.handleSubmit}>Search</button>
      </div>
      
    )
  }
}

export default SearchForm;