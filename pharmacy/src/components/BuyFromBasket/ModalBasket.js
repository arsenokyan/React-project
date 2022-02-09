import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Checkout from './CheckoutBasket'
import fire from "../firebase.js";
import "firebase/auth";
import "firebase/firestore";
import firebase from 'firebase'
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[7],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open);
  const [firstname, setFirstname] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [state, setState] = React.useState('');
   
  const getname=(firstname,phone,address,state)=>{
    setFirstname(firstname)
    setPhone(phone)
    setAddress(address)
    setState(state)
  }
  const handleClose = () => {
    const user=firebase.auth().currentUser;
    let id;
    let names='';
    let prices=''
    props.items.forEach((item)=> names+=item.name+" ")
    props.items.forEach((item)=> prices+=item.price+"AMD"+'     ')
    if(user) {
      fire.firestore().collection('Users').get().then(snapshot=>{
      
        snapshot.forEach(doc=>{
               if(user.uid===doc.data().id) {
            id=doc.id           
  fire.firestore().runTransaction(function(transaction) {
          
let sfDocRef =fire.firestore().collection("Users").doc(id)
    return transaction.get(sfDocRef).then(function(sfDoc) {
         
       let newArray = sfDoc.data().purchases.concat({date:new Date().toString(),price:prices,name:names})
       console.log(newArray)
            transaction.update(sfDocRef,  {purchases: newArray });
           
       
    });
  })
               
        }}
         
     )})
     fire.firestore().collection('Users1').add({
      buyername:firstname,
      phoneNumber:phone,
      addressName:address,
      stateName:state,
      date:new Date().toString(),
      year:new Date().getFullYear(),
      month:new Date().getMonth(),
      day:new Date().getDate(),
      price: prices,
      name:names
    })
    // fire.firestore().collection("CountValue").doc('HHzvHPyeDlAfq8pAxf1p').set({count:0})
    // fire.firestore().collection('Basket').get().then(snapshot=>{
      
    //   snapshot.forEach(doc=>{
    //     fire.firestore().collection('Basket').doc(doc.data().name).delete()
    //   })
  
    // }).catch(error=>console.log(error))
    const {finalClose}=props
    finalClose()
    setOpen(false);
    } else {
      fire.firestore().collection('Users1').add({
        buyername:firstname,
        phoneNumber:phone,
        addressName:address,
        stateName:state,
        date:new Date().toString(),
        year:new Date().getFullYear(),
        month:new Date().getMonth(),
        day:new Date().getDate(),
        price: prices,
        name: names
      })
     const {finalClose}=props
     finalClose()
      setOpen(false);
      // fire.firestore().collection('Basket').get().then(snapshot=>{
      
      //   snapshot.forEach(doc=>{
      //     fire.firestore().collection('Basket').doc(doc.data().name).delete()
      //   })
    
      // }).catch(error=>console.log(error))
      // fire.firestore().collection("CountValue").doc('HHzvHPyeDlAfq8pAxf1p').set({count:0})
     
    }
    
  }


  return (
    <div>
      {/* <button onClick={handleOpen}>open</button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 5,
        }}
      >
        <Fade in={open}>
          <Checkout  className={classes.paper} onGetname={getname} items={props.items} onClose={handleClose} /> 
        </Fade>
      </Modal>
    </div>
  );
}