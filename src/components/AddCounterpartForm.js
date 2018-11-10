import React, { Component } from 'react';
import { Prompt, withRouter } from 'react-router-dom';
import Btn from './Btn';
import { LanguageContext } from '../logic/language-context';

class AddCounterpartForm extends Component {
  state = {
    isEditing: false,
    sended: false,
    name: ""
  }

  handleChange = event => {
    this.setState({
      isEditing: true,
      sended: false,
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit();

    this.setState({
      isEditing: false,
      sended: true
    }, () => {
      this.props.history.goBack();
    });

    this.props.addCounterpart({
      id: this.props.lastCounterpartId,
      name: this.state.name
    });
  }

  render() {
    const { isEditing, name } = this.state;

    return (
      <LanguageContext.Consumer>
        {language => (
          <form
            onSubmit={this.handleSubmit}
            className="AddCounterpartForm">
            <Prompt
              when={isEditing}
              message={language.sure_leave_page_text} />

            <ul>
              <li>
                <label>{language.name_text}</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  minLength="3"
                  onChange={this.handleChange}/>
              </li>
              <li>
                <Btn
                  name="submit"
                  type="submit"
                  value={language.add_counterpart_text} />
              </li>
            </ul>
          </form>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default withRouter(AddCounterpartForm);
