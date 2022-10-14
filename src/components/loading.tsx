import React from 'react';
import './loading.css';

const Loading = () => (
  <div className='lds-ring' data-testid='is-loading' aria-busy='true'>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Loading;
