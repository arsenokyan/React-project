import React from 'react';



function Item (props) {


 const {
       cmp: {date,price,name}
 }=props
      return (
          <>
         
          
           <span>{date}</span>
           <span>{name}</span>
           <span>{price}</span>
          
          </>
      );
}

export default Item