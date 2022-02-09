import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import fire from "./firebase.js";
import "firebase/auth";
import firebase from 'firebase'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialogitem from './dialog'
import { BsPersonFill } from "react-icons/bs";
import Item from "./Items";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const styles =((theme) => ({
      
     user: {
       paddingTop:'100px'
      },
      icon :{
            marginLeft:'600px'
      }
   
    }));

function Userinfo(props) {
      const [email,setEmail]=useState('')
      const [date,setDate]=useState('')
      const [items,setItems]=useState([])
      const [dialogisopen, setDialogisopen] = useState(null)
      const user=firebase.auth().currentUser;
      //let name=user.displayName
      
     if(user) {
         let docRef=fire.firestore().collection('Users').doc(user.uid)
         console.log(user.uid)
         docRef.get().then((doc)=>{
               setItems(doc.data().purchases)
         }).catch(err=>console.log(err.message))
         console.log(items)
        
          }
/*if(user) {
  fire.firestore().collection('Users').get().then(snapshot=>{
    
    snapshot.forEach(doc=>{
      const datas=[]
           if(user.uid===doc.data().id) {
        
            setEmail(doc.data().email)
            setDate(doc.data().joinedDate)
      doc.data().purchases.forEach((item)=>datas.push(item))
            
           }
           
    })
     
  }).catch(error=>console.log(error))
     // alert(user.displayName+' '+user.email+' '+user.uid)

} else {
  console.log('there is not currentUser')
}console.log(items)*/
 
 const changeClick = () => {

  setDialogisopen(!dialogisopen)
 }
 const logout = () => {

  fire.auth().signOut().then((cred) => {
   console.log('sign out')
  })
 }


 const {classes}=props
 return (
  <>
   <div className={classes.user}>
        
  <BsPersonFill size='200px' color='#3F6E88'className={classes.icon} />
  <div className={classes.icon}>name</div>
  <div className={classes.icon}>{email}</div>
  <div className={classes.icon}>{date}</div>

  
   {/* <Link to="/"> <Button  onClick={logout} variant="contained" color="primary" style={{textDecoration: 'none' }}>
        log out
      </Button>
      </Link>
    <Button onClick={changeClick} variant="contained" color="primary" >
     change password
      </Button>  */}
      {props.admin && <Link to="/admin"><Button   variant="contained" color="primary">
       make changes
      </Button> </Link> }
      
                {/* <span>gnumner</span>
              {items.map((item,index)=>
                <>
              
                   <div>{item.name}</div>
                   <div>{item.price}</div>
                   <div>{item.date.toString()}</div>
                   </>
              
           )} */}

<h1>Purchases History</h1>
         
         <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
         <TableRow>
         
          <TableCell align="right">DragName</TableCell>
          <TableCell align="right">DragPrice</TableCell>
          <TableCell align="right">Date</TableCell>
          
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((row) => (
          <TableRow key={row.name}>
         <TableCell component="th" scope="row">
           
          <h3 style={{ display: 'inline' }}>{row.name}</h3>
            
            </TableCell>
            <TableCell align="right">{row.price}</TableCell>
            
          
            <TableCell align="right" >{row.date.toString()}</TableCell>
      
            
           
         
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
          
    {dialogisopen && <Dialogitem isOpen={changeClick} />}

   </div>

  </>
 );

}
export default withStyles(styles)(Userinfo);