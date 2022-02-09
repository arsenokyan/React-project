import React, { useState, useEffect } from 'react';

import OurCard from './Card'
//import data from './data'
import   "firebase/app";
import fire from "./firebase.js";
import   "firebase/auth";
import   "firebase/firestore";

import { makeStyles } from '@material-ui/core/styles';
import Admin from './admin'
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Signin'
import SignUp from './/SignUp'
import FooterPage from './Footer'
import ForgotPass from './FrogotPassword'
import Drags from './Drags'
import './App.css'
import SimpleSlider from './Slider/Slider'
import UserInfo from './UserInfo';
import EnhancedTable from './Cart'

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 140,
    width: 100,

  },

}));

function Tessakani() {
  const classes = useStyles();
  //const [count, setCount] = useState({ count: -1 })
 const [data, setData] = useState(null)
  /*const onChangeCount = (initial, count) => {
    setCount({ count: !initial ? count.count - 1 : count.count + 1, onChange: onChangeCount })
  }
  useEffect(() => {
    onChangeCount(true, count)
  }, [])*/
 const changeData=()=>{
    fire.firestore().collection('data').get().then(snapshot=>{
      const datas=[]
      snapshot.forEach(doc=>{
        datas.push(doc.data())
      })
      setData(datas)
    }).catch(error=>console.log(error))
  }

  useEffect(()=>{
    changeData()
   })
  return (
    <>
     
      <Router>
        
       
      
      <Route path='/'>
  
          <Grid container justify="center" >
            {data && data.map((value) => (
              <Grid key={value.id} item >
                <OurCard className={classes.paper} value={value} />
              </Grid>
            ))}
          </Grid>
          </Route>
      
          {data && data.map((item) => (<Route exact path={'/' + item.name}>
            <Drags ndata={item.data} name={item.name} />
          </Route>
          ))}
        
       
      </Router>
    </>
  );
}
export default Tessakani;