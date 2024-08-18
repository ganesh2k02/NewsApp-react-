import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

const App = () => {
  const [category, setCategory] = useState('general');

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div>
      <Navbar setCategory={handleCategoryChange} />
      <News pageSize={6} country="in" category={category} apiKey={process.env.REACT_APP_NEWS_API_KEY} />
    </div>
  );
};

export default App;
