import React from 'react';
import { useState, useEffect } from 'react';
import fire from "../firebase.js";
import "firebase/auth";
import firebase from 'firebase'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm(props) {
  const user=firebase.auth().currentUser;
  const [firstname,setFirstname]=useState(user?user.displayName:'')
  const [phone,setPhone]=useState('')
  const [isChecked,setIschecked]=useState(false)
  const [address,setAddress]=useState('')
  const [state,setState]=useState('')
  
const handlecheckchange=()=>{
  setIschecked(!isChecked)
  
  const {getCheck}=props
  getCheck(isChecked)
}

 
 
  const changeFirstname=(e)=>{
  

   setFirstname(e.target.value)
 
  }

  const changePhone=(e)=>{
  

    setPhone(e.target.value)
  
   }

   const changeAddress=(e)=>{
  

    setAddress(e.target.value)
  
   }

   const changeState=(e)=>{
  

    setState(e.target.value)
  
   }
useEffect(()=>{
  const {getname}=props
  getname(firstname,phone,address,state)
})

 
  return (
    <React.Fragment >
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
          value={firstname}
          onChange={changeFirstname}
            required
            id="firstName"
            name="firstName"
            label="FullName"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={phone}
            onChange={changePhone}
            required
            id="lastName"
            name="lastName"
            label="Phone number"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          value={address}
          onChange={changeAddress}
            required
            id="address1"
            name="address1"
            label="Address"
            fullWidth
            autoComplete="shipping address-line"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={state}
            onChange={changeState}
           id="state" name="state" label="State" fullWidth />
        </Grid>
      
        <Grid item xs={12}>
          <span> ԿԱՆԽԻԿ</span>
         <input type='checkbox'  checked={isChecked} onChange={handlecheckchange}/>
         
        </Grid>
        <Grid>
         
        </Grid>
      </Grid>
    </React.Fragment>
  );
}