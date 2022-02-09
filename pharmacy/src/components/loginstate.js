import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import fire from "./firebase";
import "firebase/auth";
import firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { BsPersonSquare } from "react-icons/bs";
import {FiUserCheck } from "react-icons/fi";
import Dialogitem from './dialog'


function Loginstate(props) {
  const [dialogisopen, setDialogisopen] = useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeClick = () => {

    setDialogisopen(!dialogisopen)
   }

   const logout = () => {
const {showCard}=props
    fire.auth().signOut().then((cred) => {
     console.log('sign out')
     showCard(false)
    })
   }

      const [admin,setAdmin]=useState(null)
 
 
      const userState=()=>{
         firebase.auth().onAuthStateChanged(user=>{
           if(user) {
               if(user.email==='admin@admin.com') {
                setAdmin(true)
               
               } 
           } 
         })
       }
    
       useEffect(()=>{
        userState()
       }
        )







 return (
  <>
   <div >
   {!admin &&  <BsPersonSquare onClick={handleClick}  style={{ color: 'white', textDecoration: 'none',cursor:'pointer' }}/> }
   <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        
        {!admin && <Link to="/UserInfo"><MenuItem  onClick={handleClose} style={{color: 'black', textDecoration:'none'}}>Profile</MenuItem></Link>}
        <MenuItem  onClick={changeClick}>change password</MenuItem>
        <Link to="/"><MenuItem onClick={logout}>Logout</MenuItem></Link>
      </Menu>
   {admin && <Link to="/admin" onClick={handleClick} ><FiUserCheck   size='30px' style={{ color: 'white', textDecoration: 'none',cursor:'pointer' }}/></Link>}
   {dialogisopen && <Dialogitem isOpen={changeClick} />}
   </div>

  </>
 );

}
export default Loginstate;