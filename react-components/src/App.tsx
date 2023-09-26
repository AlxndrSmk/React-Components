import React from 'react';
import SearchInput from './components/SearchInput/SearchInput';

const App: React.FC = () => (
  <div className="wrapper">
    <div className="section__top">
      <SearchInput />
    </div>
    <div className="section__bottom">Main page</div>
  </div>
);

export default App;
