import React, { useState, useEffect } from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LongMenu from './MaxHeightMenu'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, green } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter } from "react-router-dom";
import Menus from './share'
import fire from "./firebase.js";
import   "firebase/auth";
import   "firebase/firestore";
import firebase from'firebase'
import TransitionsModal from './BuyModal/Modal'
import { IconCount } from './data'
import { useContext } from 'react';
import Editcard from './EditCard'
import Deletecard from './DeleteCard'
import Addcard from './AddCard'





const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 20,
  },

  media: {
    height: 0,
    paddingTop: '56.25%',
  },

  expandOpen: {
    transform: 'rotate(160deg)',
  },
  avatar: {
    backgroundColor: '#195473',
  },
  admin:{
    paddingRight:'5px'
  }
}));


function OurCard(props) {
  const classes = useStyles();
  let [color, setColor] = useState('')
  let [id, setId] = useState(0)
  const [isEditOpen,setIseditopen]=useState(null)
  const [isDeleteOpen,setIsdeleteopen]=useState(null)
  const [isAddOpen,setIsaddopen]=useState(null)
  const [count,setCount]=useState('')

  let [showModal, setShowModal] = useState(false)
  const [admin,setAdmin]=useState(null)
 
  const getInitialCount=()=>{
    let docRef = fire.firestore().collection("CountValue").doc('HHzvHPyeDlAfq8pAxf1p');
    docRef.get().then(function(doc) {
      setCount(doc.data().count)
  })
  }

   
  const onChangeEditOpen=()=>{
    setIseditopen(!isEditOpen)
   }
   const onChangeAddOpen=()=>{
    setIsaddopen(!isAddOpen)
   }
   const onChangeDeleteOpen=()=>{
    setIsdeleteopen(!isDeleteOpen)
   }
 
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
    useEffect(()=>{
      getInitialCount()
     }
      )

    
  const handleExpandClick = () => {
    setShowModal(showModal = !showModal)
    setId(id = props.value.id)
    
  };
  const changeColor = () => {
 
    setColor(color = color === '' ? '#195473' : '')
    if (color) {
      
        fire.firestore().collection("CountValue").doc(
          'HHzvHPyeDlAfq8pAxf1p'
          ).set({count:count+1})
        fire.firestore().collection("Basket").doc(props.value.name).set({
          name:props.value.name, 
          price:props.value.price,
          img:props.value.img
          })
        
        
    
    
     } else {
      fire.firestore().collection("CountValue").doc(
        'HHzvHPyeDlAfq8pAxf1p'
        ).set({count:count-1})
        fire.firestore().collection('Basket').get().then(snapshot=>{
     
          snapshot.forEach(doc=>{
            fire.firestore().collection('Basket').doc(doc.data().name).delete()
          })
      
        }).catch(error=>console.log(error))
     }
 
  }
  

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <a href={props.value.name} style={{ color: 'white', textDecoration: 'none' }} >
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.value.name[0]}
        
            </Avatar>
          </a>
        }

        title={props.value.name}
        subheader="September 14, 2016"
      />
      <a  href={props.value.name} style={{ textDecoration: 'none' }}>
        <CardMedia
          className={classes.media}
          image={props.value.img}
        />
      </a>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.value.name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {props.history.location.pathname === '/Tesakani' ? <a href={props.value.name}
          style={{ textDecoration: 'none' }}>
          <IconButton onClick={handleExpandClick}  aria-label="add to favorites">
          More 
            </IconButton>
        </a> : <>
        {admin && <LongMenu productName={props.value.name} priceValue={props.value.price} sectionName={props.name}/>}
        {!admin &&  <IconButton onClick={handleExpandClick} aria-label="add to favorites">
              ????????
              </IconButton>}
              
            {showModal && <div>
              <TransitionsModal  dataId={id} open={showModal} value={props.value}/>
             
            </div>}
            {!admin && <IconButton onClick={changeColor} aria-label="add to favorites">
            <ShoppingCartIcon style={{ color,float:'right' }} />
            </IconButton>}
           
            
          </>}
          
          
          
         
         
       
      </CardActions>
      {isEditOpen && <Editcard onClose={onChangeEditOpen} productName={props.value.name} priceValue={props.value.price} sectionName={props.name}/>}
      {isDeleteOpen && <Deletecard onClose={onChangeDeleteOpen} productName={props.value.name}  sectionName={props.name}/>}
      {isAddOpen && <Addcard onClose={onChangeAddOpen}   sectionName={props.name} />}
    </Card>

  );

}
export default withRouter(OurCard)