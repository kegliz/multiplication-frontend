import React from 'react';
import styled from "styled-components";

const TodoHeader = styled.h2`
  font-size: 22px;
`;

function App() {
  return (
    <div className="App">
      <TodoHeader>TODO</TodoHeader> 
    </div>
  );

}

export default App;
