import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import LongMenu from './Menu'
import fire from "./firebase.js";
import   "firebase/auth";
import   "firebase/firestore";
import firebase from'firebase'
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from "react-router-dom";
import Loginlogout from './loginlogout'



const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  butons: {
    '& > *': {
      marginRight: theme.spacing(3),
      color: 'white',
      fontSize: 20
    },
    flexGrow: 1,
  },
  body: {
    backgroundColor: '#195473',
  },
  rooot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 100,
    
  },
  iconButton: {
    padding: 10,
    color: 'white'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: 30,
    flexGrow: 1,
  },
}));
function Header(props) {
  let [value, setValue] = useState()
  const [openSearch, setOpenSearch] = useState(false)
  const [backValue,setBackvalue]=useState('')
  const [admin,setAdmin]=useState(null)
  const onchange = (event) => {
    setValue(value = event ? event.target.value : '')

  }

  const getInitialValue=()=>{
    let docRef = fire.firestore().collection("CountValue").doc('HHzvHPyeDlAfq8pAxf1p');
    docRef.get().then(function(doc) {
      setBackvalue(doc.data().count)
  })
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
  const keyPress = (e) => {
    if (e.keyCode == 13 && value !== '') {
      props.history.push(value)
      setValue(value = '')

    }
  }
  const SearchIconClick = () => {
    setOpenSearch(!openSearch)
    props.history.push(value)
    setValue(value = '')
  }

  useEffect(()=>{
    getInitialValue()
   }
    )
    const handleShowcard=()=>{
      setAdmin(!admin)
      }
  const classes = useStyles();
  return (

    <div className={classes.root}>
      <AppBar position="static" className={classes.body}>
        <Toolbar>
          {/* <LongMenu /> */}
          <Typography variant="h6" className={classes.title}>
            <a href='/' style={{ color: "white", textDecoration: 'none' }} >MED.AM</a>
          </Typography>
          <div className={classes.butons}>
            <Button href='/'>ԳԼԽԱՎՈՐ</Button>
            <Button href="Tesakani" >ՏԵՍԱԿԱՆԻ</Button>
            <Button href="#text-buttons" >ՄԵՐ ՄԱՍԻՆ</Button>
            <Button href="#text-buttons" >ԱՌՑԱՆՑ ԲԺԻՇԿ</Button>
            <Button href="#text-buttons" >ԿԱՊ</Button>
          </div>
          <IconButton onClick={SearchIconClick} type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
          {openSearch &&
            <Paper className={classes.rooot}>
              <InputBase id="standard-basic"
                label="Search"
                onChange={onchange}
                value={value}
                onKeyDown={keyPress}
                placeholder='Search'
              />
            </Paper>
          }
          <Button color="inherit" href='/Order'>
          {!admin &&     <StyledBadge badgeContent={backValue} color="secondary">
        <AddShoppingCartIcon  /> 
        </StyledBadge>}</Button>
          <Loginlogout showCard={handleShowcard} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default withRouter(Header)
