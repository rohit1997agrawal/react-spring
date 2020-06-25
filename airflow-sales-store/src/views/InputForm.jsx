import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import {  format } from 'date-fns'
import { useHistory } from "react-router-dom";

import { FormControl ,InputAdornment } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';




const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      marginLeft : '50px',
      marginTop : '30px'
    },
    
      '& .MuiButton-root': {
        margin: theme.spacing(1),
        width: '15ch',
        marginLeft : '50px',
        marginTop : '50px'
    },
  },
}));

export  const InputForm = (props) => {

  const storeLocationMap = [
    { title: 'New York'},
    { title: 'Miami' },
    { title: 'Miami' },
    { title: 'Washington' },
    { title: 'London' },
    ];
const productCategoryMap = [
    { title: 'Electronics'},
    { title: 'Furniture' },
    { title: 'Kitchen' },
    { title: 'Fashion' },
    { title: 'Cosmetics' },
    ];
const currencies = [
  {
    value: 'USD',
    label: '$ (USD)',
  },
  {
    value: 'EUR',
    label: '€ (EUR)',
  },
  {
    value: 'BTC',
    label: '฿ (BTC)',
  },
  {
    value: 'JPY',
    label: '¥ (JPY)',
  },
];

  var isFormValid = true;


  const classes = useStyles();
  const [storeId , setStoreId] = React.useState("");
  const [storeLocation , setStoreLocation] = React.useState("");
  const [productCategory , setProductCategory] = React.useState("");
  const [productId , setProductId] = React.useState("");
  const [retailPrice , setRetailPrice] = React.useState("");
  const [costPrice , setCostPrice] = React.useState("");
  const [discount , setDiscount] = React.useState("");
  const [sellingPrice , setSellingPrice] = React.useState("");
  const[dateSelected,setDateSelected] =  React.useState(format(new Date(),'MM/dd/yyyy')); 

  const [currency, setCurrency] = React.useState('USD');
  
  const [errorStoreId , setErrorStoreId] = React.useState("");
  const [errorStoreLocation , setErrorStoreLocation] = React.useState("");
  const [errorProductCategory , setErrorProductCategory] = React.useState("");
  const [errorProductId , setErrorProductId] = React.useState("");
  const [errorRetailPrice , setErrorRetailPrice] = React.useState("");
  const [errorCostPrice , setErrorCostPrice] = React.useState("");
  const [errorDiscount , setErrorDiscount] = React.useState("");
  const [errorSellingPrice , setErrorSellingPrice] = React.useState("");
 // const [errorStoreId , setErrorStoreId] = React.useState("");


  // const handleChangeLocation = (event) => {
  //     console.log(event.target.value);
  // }
  const handleChangeCurrency = (event) => {
    setCurrency(event.target.value);
  };
  const handleChangeStoreId = (event) => {
    setStoreId(event.target.value);
  }
  const handleChangeStoreLocation = (event) => {
    setStoreLocation(event.target.value);
    console.log(storeLocation);
  }
  const handleChangeStoreLocationAuto = (event,value) => {
    setStoreLocation(value);
    console.log(storeLocation);
  }
  const handleChangeProductCategory = (event) => {
    setProductCategory(event.target.value);
  }
  const handleChangeProductCategoryAuto = (event,value) => {
    setProductCategory(value);
  }
  const handleChangeProductId = (event) => {
    setProductId(event.target.value);
  }
  const handleChangeRetailPrice = (event) => {
    setRetailPrice(event.target.value);
  }
  const handleChangeCostPrice = (event) => {
    setCostPrice(event.target.value);
  }
  const handleChangeDiscount = (event) => {
    setDiscount(event.target.value);
  }
  const handleChangeSellingPrice = (event) => {
    setSellingPrice(event.target.value);
  }
  let flag =0;
  const invalidEntry = () => {
      isFormValid = false;

  }

  const mySubmitHandler = (event) => {
    event.preventDefault();
   
     
  
    setErrorStoreId(storeId.length === 0 ? ["Store ID can not be blank!", invalidEntry()] :"");
  
    setErrorStoreLocation(storeLocation.length===0 ? ["Store Location can not be blank!", invalidEntry()]:"");
    
    setErrorProductCategory(productCategory.length===0 ? ["Product Category can not be blank!", invalidEntry()]:"");
    
    setErrorProductId(productId.length===0 ? ["Product ID Can not be blank", invalidEntry()]:"");

    setErrorRetailPrice(retailPrice.length===0 ? ["MRP Can not be blank", invalidEntry()]:"");
    
    setErrorCostPrice(costPrice.length===0 ? ["Cost Price can not be blank", invalidEntry()]:"");
    
    setErrorSellingPrice(sellingPrice.length===0 ? ["Selling Price can not be blank", invalidEntry()] : "");
    
    setErrorDiscount(discount.length===0 ? ["Discount can not be blank", invalidEntry()] : "");

   if(isFormValid)
   {
     
    props.updateRowData(createNewRowData())
    document.getElementById("create-course-form").reset();
    // setStoreLocation("");
    // setProductCategory("");
   }
   
      
  
    
  }
  const handleDateChange = (dateSelected) => {
    /*  this.setState({selectedDate : date}); */
    setDateSelected(dateSelected);
  }


  const createNewRowData = () =>{
    var newData = {
      "STORE_ID": storeId,
      "STORE_COUNTRY": currency,
      "STORE_LOCATION": storeLocation,
      "PRODUCT_CATEGORY": productCategory,
      "PRODUCT_ID": productId,
      "CP": currency+" "+costPrice,
      "DISCOUNT": currency+" "+discount,
      "SP": currency+" "+ costPrice,
      "Date": dateSelected
    };
    return newData;
  }

  return (
      
    <form  id="create-course-form" onSubmit={mySubmitHandler} className={classes.root} noValidate  autoComplete="off">
        
   
      <div>
 
      <TextField
          
          id="storeId"
          label="Store ID"
          defaultValue=""
          placeholder="AZ1234"
          error={!!errorStoreId}
          helperText= {errorStoreId}
          onChange={handleChangeStoreId}
          
         
        //  error = {true}
          
         
        />

<TextField
          
          id="productId"
          label="Product ID"
          defaultValue=""
          placeholder="12254943"
          error={!!errorProductId}
          helperText= {errorProductId}
          onChange={handleChangeProductId} 

          
         
        />
        
      

       
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          disabled = "true"
          margin="normal"
          id="date-picker-inline"
          label="Date"
          size="small"
          value={dateSelected}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
      
      </div>
      <div>
      <TextField
          id="storeCurrency"
          select
          label="Country"
          value={currency}
          onChange={handleChangeCurrency}
          helperText="Please select your currency"
    
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      <Autocomplete
        id="storeLocation"
        freeSolo
        options={storeLocationMap.map((option) => option.title)}
        value={storeLocation}
        onInputChange={handleChangeStoreLocationAuto}
        renderInput={(params) => (
          <TextField {...params} 
          label="Store Location" 
          margin="normal" 
          placeholder="New York"
          value={storeLocation}
          error={!!errorStoreLocation}
          helperText= {errorStoreLocation}
          onChange={handleChangeStoreLocation}  />
        )}
      />
      <Autocomplete
        id="productCategory"
        freeSolo
        options={productCategoryMap.map((option) => option.title)}
        value={productCategory}
        onInputChange={handleChangeProductCategoryAuto}
        renderInput={(params) => (
          <TextField {...params}
           label="Product Category"
           margin="normal"
           placeholder="Electronics"
           value={productCategory}
           error={!!errorProductCategory}
           helperText= {errorProductCategory}
           onChange={handleChangeProductCategory} />
        )}
      />
      
      </div>
      <div>
      <TextField
          
          id="retailPrice"
          label="MRP"
          type="number"
          defaultValue=""
          error={!!errorRetailPrice}
          helperText= {errorRetailPrice}
          onChange={handleChangeRetailPrice} 
          InputProps={{
          startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
          }}
         
        />
      <TextField
          
          id="costPrice"
          label="CP"
          type="number"
          defaultValue=""
          error={!!errorCostPrice}
          helperText= {errorCostPrice}
          onChange={handleChangeCostPrice} 
         
          InputProps={{
            startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
          }}
         
        />
        <TextField
          
          id="discount"
          label="Discount"
          type="number"
          defaultValue=""
          error={!!errorDiscount}
          helperText= {errorDiscount}
          onChange={handleChangeDiscount} 
          InputProps={{
            startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
          }}
         
        />
        <TextField
          
          id="sellingPrice"
          label="SP"
          type="number"
          defaultValue=""
          error={!!errorSellingPrice}
          helperText= {errorSellingPrice}
          onChange={handleChangeSellingPrice} 
          InputProps={{
            startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
          }}
         
        />
      </div>
     
     {/* <input type = "submit" value = "Submit"/> */}
     <div>
     
     <Button
            variant="contained"
            color="primary"
            type="submit"
            //className={classes.button}
            startIcon={<SaveIcon />}
          >Submit
      </Button>
      <Button
            variant="contained"
            color="primary"
            type="reset"
            //className={classes.button}
           // startIcon={<CloudUploadIcon />}
           startIcon={<DeleteIcon />}
          >Reset
      </Button>
      </div>
   
    </form>
  );
}