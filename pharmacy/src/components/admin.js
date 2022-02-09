import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import fire from "./firebase.js";
import   "firebase/auth";
import   "firebase/firestore";
import firebase from'firebase'
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const styles =((theme) => ({
      
  admin: {
   textAlign:'center'
  },

}));

    function Admin (props) {
      const [year,setYear]=useState('')
      const [monthNumber,setMonthnumber]=useState('')
      const [monthString,setMonthstring]=useState('')
      const [day,setDay]=useState('')
      const [orderList,setOrderlist]=useState(null)
      
   
    
    const  handleYear=(e)=>{
         setYear(e.target.value)
    }
   
    const  handleMonth=(e)=>{
        if (e.target.value=="August") {
         setMonthstring(e.target.value)
         setMonthnumber(7)
   
        } else if (e.target.value=="January") {
          setMonthstring(e.target.value)
         setMonthnumber(0)
        } else if (e.target.value=="February") {
          setMonthstring(e.target.value)
         setMonthnumber(1)
        } else if (e.target.value=="March") {
          setMonthstring(e.target.value)
         setMonthnumber(2)
        } else if (e.target.value=="April") {
          setMonthstring(e.target.value)
         setMonthnumber(3)
        } else if (e.target.value=="May") {
          setMonthstring(e.target.value)
         setMonthnumber(4)
        } else if (e.target.value=="June") {
          setMonthstring(e.target.value)
         setMonthnumber(5)
        } else if (e.target.value=="July") {
          setMonthstring(e.target.value)
         setMonthnumber(6)
        } else if (e.target.value=="September") {
          setMonthstring(e.target.value)
         setMonthnumber(8)
        } else if (e.target.value=="October") {
          setMonthstring(e.target.value)
         setMonthnumber(9)
        }   else if (e.target.value=="November") {
          setMonthstring(e.target.value)
         setMonthnumber(10)
        }  else if (e.target.value=="December") {
          setMonthstring(e.target.value)
         setMonthnumber(11)
        } 
               
     
     
    }
   
    const  handleDay=(e)=>{
         setDay(e.target.value)
    }
   
    const handleOrders=(e)=>{
         
         console.log(year)
         console.log(monthNumber)
         console.log(day)
               fire.firestore().collection('Users1').get().then(snapshot=>{
                 const datas=[]
                 snapshot.forEach(doc=>{
                      console.log(doc.data().year)
                      console.log(doc.data().month)
                      console.log(doc.data().day)
                     if(doc.data().year==year && doc.data().month==monthNumber && doc.data().day==day ) {
                           datas.push(doc.data())
                     }
                          
                       })
                       setOrderlist(datas)
                 })
               
               .catch(error=>console.log(error))
             
    }
     
       const logout = () => {
   
         fire.auth().signOut().then((cred) => {
          console.log('sign out')
         })
        }
       const {classes}=props
         
               
               
       return(
        <div className={classes.admin}>
    

        <div>
        <span>year</span>
        <input value={year} onChange={handleYear}/>
        </div>
        <div>
        <span>month</span>
        
        <select value={monthString} onChange={handleMonth}>
 <option >January</option>
 <option  >February</option>
 <option  >March</option>
 <option  >April</option>
 <option  >May</option>
 <option  >June</option>
 <option  >July</option>
 <option  >August</option>
 <option  >September</option>
 <option  >October</option>
 <option  >November</option>
 <option  >December</option>
  </select>

    <div>
        <span >date</span>
        <input value={day} onChange={handleDay}/>
        </div>
        </div>
        <button onClick={handleOrders}>search</button>

        <h1>Purchases History</h1>
         
           <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
        {orderList &&  <TableRow>
            <TableCell>BuyerName</TableCell>
            <TableCell align="right">DragName</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">address</TableCell>
            <TableCell align="right">phone</TableCell>
            <TableCell align="right">date</TableCell>
            
          </TableRow>}
        </TableHead>
        <TableBody>
          {orderList && orderList.map((row) => (
            <TableRow key={row.name}>
           <TableCell component="th" scope="row">
             
            <h3 style={{ display: 'inline' }}>{row.buyername}</h3>
              
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              
              <TableCell align="right" >{row.price}</TableCell>
              <TableCell align="right" >{row.addressName}</TableCell>
              <TableCell align="right" >{row.phoneNumber}</TableCell>
              <TableCell align="right" >{row.date.toString()}</TableCell>
              
             
           
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
       
    );

         
   }
   
   export default withStyles(styles)(Admin);

