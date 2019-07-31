import React from 'react';
import "./index.css";

// Form uses bootstrap styling

class SearchForm extends React.Component {

  state = {
    title: "",
    author: ""
  }

  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;

    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, prevent the default event and alert the username and password
  handleFormSubmit = event => {
    event.preventDefault();
    if ((this.state.title.length === 0) && (this.state.author.length === 0)) {
      /* respond to user about invalid search */
      console.log("Pressed submit without title or author");
    }
    else {
      this.props.handleSubmit(this.state.title, this.state.author);
      console.log("SearchForm: submit: title " + this.state.title + " author " + this.state.author);
      this.setState({ title: "", author: "" });

    }
  }
  
  render() {
    return (
      <div>
        <h1 className="SearchFormTitle">Search form</h1>
        <div className="container">
          <div className="row">
            <div className="col-12, col-md-6">
              <form>
                <div className="form-group">
                  <label htmlFor="titleInput">Title</label>
                  <input
                    className="form-control"
                    id="titleInput"
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="authorInput">Author</label>
                  <input
                    className="form-control"
                    id="authorInput"
                    type="text"
                    placeholder="Author"
                    name="author"
                    value={this.state.author}
                    onChange={this.handleInputChange}
                  />
                  <button className="buttonGlobal SearchFormButton" onClick={this.handleFormSubmit}>Search Google books</button>
                </div>
              </form>
              
            </div>
            
          </div>
        </div>
        
        
      </div>
      
    )
  }
}

export default SearchForm;
