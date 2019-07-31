import React from 'react';
import "./index.css";

// Form uses bootstrap styling

class SearchForm extends React.Component {

  state = {
    title: "",
    author: "",
    searchDisable: true
  }

  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;

    // if change was to remove text in box, then if both fields are empty
    if ( (value.length === 0) && (this.state.title.length === 0) && (this.state.author.length === 0)) {
      this.setState({
        [name]: value,
        searchDisable: true
      });
    }
    else {
      this.setState({
        [name]: value,
        searchDisable: false
      });
    }
    
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
      this.setState({ title: "", author: "", searchDisable: true });

    }
  }
  
  render() {
    return (
      <div className="SearchFormBox">
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
                  {/* search button is disabled until have text in title or author inputs */}
                  <button 
                    disabled={this.state.searchDisable}
                    className="buttonGlobal SearchFormButton" 
                    onClick={this.handleFormSubmit}>Search Google books</button>
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
