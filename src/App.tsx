import React from 'react';
import './App.css';
import FamilyTree from './components/FamilyTree';
import { familyTreeData } from './components/Data';

function App() {
  return (
    <div className="App">
      <FamilyTree data={familyTreeData}/>
    </div>
  );
}

export default App;
