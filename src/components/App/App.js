import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      error: '',
    }
    this.fetchNewUrls = this.fetchNewUrls.bind(this)
  }

  fetchNewUrls() {
    getUrls()
  .then(currentUrls => {
    this.setState({urls: currentUrls.urls})
  })
  .catch(error => this.setState({ error: 'Couldnt fund URLs!'}))

  }

  componentDidMount() {
    getUrls()
  .then(currentUrls => {
    this.setState({urls: currentUrls.urls})
  })
  .catch(error => this.setState({ error: 'Couldnt fund URLs!'}))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1 data-cy='page-title'>URL Shortener</h1>
          <UrlForm fetchNewUrls={this.fetchNewUrls}/>
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
