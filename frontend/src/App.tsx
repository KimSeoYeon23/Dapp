import React, { FC } from "react";
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import {Button} from '@chakra-ui/react';
import Main from "./routes/Main";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
