import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TransitionsModal from './BuyFromBasket/ModalBasket'
import fire from "./firebase.js";
import   "firebase/auth";
import   "firebase/firestore";
import firebase from'firebase'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});






export default function DenseTable() {
  const [rows, setRows] = useState([])
  const [count,setCount]=useState('')
  let [showModal, setShowModal] = useState(false)
  const classes = useStyles();
  const getInitialCount=()=>{
    let docRef = fire.firestore().collection("CountValue").doc('HHzvHPyeDlAfq8pAxf1p');
    docRef.get().then(function(doc) {
      setCount(doc.data().count)
  })
  }
  useEffect(()=>{
    getInitialCount()
   },
    )
const initialRow=()=>{
  fire.firestore().collection('Basket').get().then(snapshot=>{
     let data=[]
    snapshot.forEach(doc=>{
    data.push(doc.data())
    })
    setRows(data)
  }).catch(error=>console.log(error))
}
useEffect(()=>{
  initialRow()
})
const handleExpandClick = () => {
  setShowModal(showModal = !showModal)
 
  
};
const handleFinalClose=()=>{
  setShowModal(false)
}
  const handleDelete=(e,name)=>{
    fire.firestore().collection('Basket').get().then(snapshot=>{
       
     snapshot.forEach(doc=>{
     if(doc.data().name==name) {
      fire.firestore().collection('Basket').doc(name).delete()
      fire.firestore().collection("CountValue").doc('HHzvHPyeDlAfq8pAxf1p').set({count:count-1})
     }
     })
      
   }).catch(error=>console.log(error))
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>payment history</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">delete</TableCell>
            <TableCell align="right">purchase</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
           <TableCell component="th" scope="row">
              <img src={row.img} style={{ width: '5vw', height: '5vh' }} />
            <h3 style={{ display: 'inline' }}>{row.name}</h3>
              
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              
              <TableCell align="right" onClick={(e)=>handleDelete(e,row.name)}>DELETE</TableCell>
              <TableCell align="right" onClick={handleExpandClick}>purchase</TableCell>
              {showModal && <div>
              <TransitionsModal   finalClose={handleFinalClose} open={showModal} items={rows}/>
             
            </div>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
