import React, { FC, useEffect, useState } from "react";
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import {Button} from '@chakra-ui/react';
import Main from "./routes/Main";

const App: FC = () => {
  const [account, setAccount] = useState();

  const getAccount = async () => {
    try {
      if(window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        setAccount(accounts[0]);
        console.log(account);
      } else {
        alert("install metamask");
      }

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAccount();
  }, [account]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main account={account} />} />
      </Routes>
    </Router>
  );
};

export default App;
