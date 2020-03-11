import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'

class App extends Component {
  // Testing for Axios Ejection
  // state = {
  //   show: true
  // }

  // componentDidMount () {
  //   setTimeout(()=> {
  //     this.setState({show: false})
  //   }, 5000);
  // }
  render() {
    return (
      <div>
        <Layout>
          {/* {this.state.show ? <BurgerBuilder/> : null} */}
          <BurgerBuilder/>
        </Layout>
      </div>
    );
  }
}

export default App;
