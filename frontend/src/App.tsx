import React, { FC, useEffect, useState } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from "./components/Layout";
import Main from "./routes/Main";
import MyAnimal from './routes/MyAnimal';

const App: FC = () => {
  const [account, setAccount] = useState('');

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
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main account={account} />} />
          <Route path='my-animal' element={<MyAnimal account={account} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
