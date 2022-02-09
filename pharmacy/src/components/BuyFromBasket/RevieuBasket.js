import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import hygiene from '../Hygiene'
import Box from '@material-ui/core/Box';



const addresses = ['Reactville', 'Any', '99999', 'ARM'];
const payments = [
  { name: 'Expiry date 30 minits' },
];
const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const [value, setValue] = React.useState(2);

  const classes = useStyles();
  console.log(props.value, props)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
      
           
              <ListItem className={classes.listItem} key={value.name}>
                <Typography variant="body2">
                  {props.items.map((row)=>
                  <div>
                    <p>{row.name}</p>
                  <img src={row.img} style={{ maxWidth: '100px', maxHeight: '100px' }} alt="" />
                  <spam>{row.price}</spam>
                  </div>
                  )}
                  
                </Typography>
                  <ListItemText primary={props.name} secondary={props.desc} />
                  <Box component="fieldset" mb={3} borderColor="transparent">
               
             
                  </Box>
                
                  
              </ListItem>
            
          
        
        <ListItem className={classes.listItem}>
                  <ListItemText primary="Total" />
                <p>
                    {props.items.reduce((sum,current)=>sum+ +current.price,0)}
                    </p>
                  
                    
                    
                        <Typography variant="body2">{props.price}</Typography>
                     
                  
              
                </ListItem>
      </List>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                  <Grid container>
                    {payments.map((payment) => (
                      <React.Fragment key={payment.name}>
                        <Grid item xs={6}>
                          <Typography gutterBottom>{payment.name}</Typography>
                        </Grid>
                      </React.Fragment>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
    </React.Fragment>
  );
  
}