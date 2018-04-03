import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as style from './styles/styles.scss';
// const style = require('./styles/styles.scss');

// import small from '../assets/small.jpg';
//
console.log('style', style);

const App = () => (
  <div className={style.panelDefault}>
    <h1> Hello, world!</h1>
  </div>
);

export default App;
