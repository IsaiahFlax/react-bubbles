import React, { useState, useEffect } from "react";
import axios from 'axios'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  const getColors = () =>{ 
      axiosWithAuth()
      .get('/api/colors')
      .then(res=> {
        console.log('res', res)
        setColorList(res.data)
      })
      .catch(err=>
        console.error('getData failure', err))
  }

  useEffect(()=> {
    getColors()
  }, [])
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getColors={getColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
