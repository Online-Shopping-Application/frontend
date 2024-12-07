import React, { useState } from 'react';
import { Box, Card, Checkbox, Grid, Rating, Typography, Slider, TextField, Button, Dialog, DialogActions, DialogContent, 
  DialogTitle, List, 
  ListItem,
  ListItemText,
  Collapse,
  IconButton} from '@mui/material';
import MenuAppBar from './Navbar';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CloseIcon from '@mui/icons-material/Close';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Search() {
  const navigate = useNavigate();
  const [value, setValue] = useState([3000, 8000]); // Initial range values
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [open, setOpen] = useState(false);
  const [openLocation, setOpenLocation] = useState(null); 
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const locations = [
    {
      id: 1,
      name: 'Location 1',
      description: 'Description for Location 1',
      subcategories: ['Subcategory 1.1', 'Subcategory 1.2','Subcategory 1.1', 'Subcategory 1.2']
    },
    {
      id: 2,
      name: 'Location 2',
      description: 'Description for Location 2',
      subcategories: ['Subcategory 2.1', 'Subcategory 2.2']
    },
    {
      id: 3,
      name: 'Location 3',
      description: 'Description for Location 1',
      subcategories: ['Subcategory 3.1', 'Subcategory 3.2']
    },
    {
      id: 4,
      name: 'Location 4',
      description: 'Description for Location 2',
      subcategories: ['Subcategory 4.1', 'Subcategory 4.2']
    },
  ];
  const colors = [
    { code: "#FF0000" },
    {  code: "#0000FF" },
    {  code: "#00FF00" },
    {  code: "#FFFF00" },
    {code:"#e29216"},
    {code:"#d916e2 "},
    {code:"#a7e216 "},
    {code:"#16e2df  "},
  ];
 
  const [data] = useState([
    {
      id: 1,
      imageUrl:
        'https://i.pinimg.com/736x/af/36/78/af36783a464d3b5163053258a042e625.jpg',
      name: 'Women Fit and Flare Brown Dress',
      price:'$10',
      size:'medium',
      description:
        'This is the description of Bag item 1. It could be longer or shorternhgggggggggggggggggggvbfddd.',
      rating: 3,
      location:'colombo'
    },
    {
      id: 2,
      imageUrl:
        'https://rukminim2.flixcart.com/image/612/612/xif0q/dress/k/a/k/l-vna1003027-vishudh-original-imagyxpgq9ywyhmu.jpeg?q=70',
      name: 'Women Fit and Flare Brown Dress',
      price:'$5',
      size:'medium',
      description:
        'This is the description of Bag item 1. It could be longer or shorternhgggggggggggggggggggvbfddd.',
      rating: 3,
      location:'kandy'
    },
    {
      id: 3,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZi6Ktng9k0ynGp3LIHdqTpsq8yvIVUjsgWQ&s',
      name: 'Women Fit and Flare Brown Dress',
      price:'$7',
      size:'medium',
      description:
        'This is the description of Bag item 1. It could be longer or shorternhgggggggggggggggggggvbfddd.',
      rating: 3,
      location:'colombo'
    },
      
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClick = (id) => {
    setOpenLocation(openLocation === id ? null : id); // Toggle subcategory visibility
  };
  const handleCardClick = (id) => {
    navigate(`/item/${id}`);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color); // Update the selected color
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLocationSelect = (location) => {
    setSelectedLocation(location); // Update selected location on click
    setSelectedSubcategory(null); 
  };
  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setOpen(false);
  };
 
  return (
    <div>
      <MenuAppBar />    
      <Grid container spacing={1}>
        {/* Filter Section */}
        <Grid item xs={4}>
          <Card
            sx={{
              width: '75%',
              height: '95%',
              padding: '3%',
              marginTop: '20%',
              marginLeft: '10%',
              boxShadow: '0 4px 4px rgba(0, 0, 0, 0.2)', }}> 
           < Box sx={{ padding: "3%" }}>
          <Typography variant="h7" sx={{fontWeight: 'bold',}}>
            PRICE RANGE
          </Typography>
          <br></br><br></br>
      
      <Slider
        getAriaLabel={() => "Price range"}
        value={value}
        onChange={handleChange}
       getAriaValueText={(val) => `${val}`}
        min={800} // Minimum value
        max={10000} // Maximum value
        sx={{
          color: "black", 
        }}
      />      
    </Box>
          <Box sx={{ display: "flex", marginTop: "2%" }}>
            <Box
              sx={{
                width: "25%",
                height: "50%",
                padding:'3%',                
                textAlign: "center",
                lineHeight: "30px",                
                borderRadius: "4px",
                marginLeft:'7%',
                border: "2px solid #b2babb",
              }}
            >
              Rs. {value[0]}
            </Box>
            <Typography sx={{ marginLeft: "8%",marginTop:'10px'}}>to</Typography>
            <Box
              sx={{
                width: "25%",
                height: "50%",
                padding:'3%',
                marginLeft:'10%',
                textAlign: "center",
                lineHeight: "30px",
                borderRadius: "4px",
                border: "2px solid #b2babb",
              }}
            >
             Rs.  {value[1]}
            </Box>
          </Box>
          <br></br>
          <Button
            sx={{
              backgroundColor: 'black',
              color: 'white',
              padding: '3%',              
              width: '80%',
              fontSize: '15px',
              fontWeight:'bold',
              marginLeft:'10%',
              border: '1px solid black',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                borderColor: 'black',
              },
            }}
          >
           APPLY
          </Button>
        <br></br><br></br>
        <Box sx={{ padding: "3%" }}>
      <Typography variant="h7" sx={{fontWeight: 'bold',}}>
        CATEGORIES
      </Typography>  
      <hr style={{ margin: "2% 0" }} />
      <br></br>  
            <Checkbox {...label} /> All           
      </Box>
           <Box sx={{ padding: "3%" }}>
            <Typography   variant="h7" sx={{ fontWeight: 'bold',}}>TYPE</Typography>
            <hr style={{ margin: "2% 0" }} />
            <Checkbox {...label} /> Frocks<br></br>
            <Checkbox {...label} />Trousers<br></br>
            <Checkbox {...label} />Blouse<br></br>
            <Checkbox {...label} />Sarees<br></br>
            <Checkbox {...label} /> shirts<br></br>
            <Checkbox {...label} />Skirts<br></br>
            <Checkbox {...label} />Baby clothes<br></br>            
            </Box>
            <Box sx={{ padding: "3%" }}>
            <Typography 
  variant="h7" 
  sx={{
    fontWeight: 'bold',
  
  }}
>
  SIZE
</Typography>
<hr style={{ margin: "2% 0" }} />
<Grid container spacing={{ xs: 1, sm: 2 }}>
  {sizes.map((size, index) => (
    <Grid item xs={6} sm={3} key={index}>
      <Box
        sx={{
          border: "1px solid #ccc",
          width: '70%', // Adjust width for responsiveness
          aspectRatio: '1', // Maintain square dimensions
          borderRadius: "4px",
          display: "flex", // Use flexbox for centering
          alignItems: "center", // Center content vertically
          justifyContent: "center", // Center content horizontally
          textAlign: "center",
          borderColor: '#afafab',
          cursor: "pointer",
          backgroundColor: selectedSize === size ? "grey" : "transparent", // Highlight selected size
          '&:hover': { backgroundColor: "grey" },
          fontSize: { xs: '0.75rem', sm: '1rem' }, // Adjust font size
        }}
        onClick={() => handleSizeClick(size)}
      >
        {size}
      </Box>
    </Grid>
  ))}
</Grid>
    </Box>
    <Box sx={{ padding: "3%" }}>
      <Typography variant="h7" sx={{ fontWeight: 'bold' }}>
        COLORS
      </Typography>
      <hr style={{ margin: "2% 0" }} />
      <Grid container spacing={2}>
        {colors.map((color, index) => (
          <Grid item xs={3} sm={2} key={index}>
            <Box
             sx={{
              width: selectedColor === color ? '50px' : '40px', // Corrected the width for selected state
              height: selectedColor === color ? '50px' : '40px',
              backgroundColor: color.code,
              borderRadius: '50%',
              margin: '0 auto',
              cursor: 'pointer',
              transform: selectedColor === color ? 'scale(1.2)' : 'scale(1)',
              border: selectedColor === color
                ? '30px solid black'
                : '1px solid transparent',
              transition: 'all 0.3s ease',
            }}
              onClick={() => handleColorClick(color)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>           
        </Card>
        </Grid>       
        {/* Items Section */}        
          <Grid item xs={8}>         
          <Card
              sx={{
                height: '20px',
                marginTop: '10%',
                padding: '5%',                
                display: 'flex',
                width: '95%',                
                flexDirection: 'row',
                }}>  
              <FilterListIcon sx={{ marginTop: '1%',}}></FilterListIcon>                        
              <Typography sx={{ marginTop: '1%',}}>Filter</Typography>              
              <div>
               
      {/* Location Click Area */}
       <Typography 
        sx={{ cursor: 'pointer' ,marginLeft:'40px'}} 
        onClick={handleClickOpen} 
      >
       
       <FmdGoodIcon sx={{fontSize:'20px', marginTop: '1%', marginLeft: '50%'}}/>
       {selectedSubcategory || 'Location'}      
      </Typography>
      
      {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClose}   PaperProps={{
          sx: {
            width: '60%',
            maxWidth: '600px',
            height: '100%',
            maxHeight: '700px', 
          },
        }}>
        <DialogTitle>Location</DialogTitle>
        <IconButton
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={handleClose}>
            <CloseIcon />
            </IconButton>
        <DialogContent>
        <List sx={{cursor:'pointer'}}>
        <hr style={{ margin: '8px 0', border: '0', borderTop: '1px solid #ccc',width: '50%'  }} />  
      {locations.map((location) => (
          <div key={location.id}>
          <ListItem onClick={() => { handleClick(location.id); handleLocationSelect(location); }} >          
          <ListItemText
              primary={               
                <Typography sx={{ display: 'flex', alignItems: 'center',color:'blue' }}>
                  {location.name} 
                  {openLocation === location.id ? (
                    <KeyboardArrowDownIcon sx={{ marginLeft: '100px' }} />
                  ) : (
                    <KeyboardArrowRightIcon sx={{ marginLeft: '100px' }} />
                  )}
                </Typography>                
              }
              />                          
          </ListItem> 
          <hr style={{ margin: '8px 0', border: '0', borderTop: '1px solid #ccc',width: '50%'  }} />         
          <Collapse in={openLocation === location.id} timeout="auto" unmountOnExit>
            <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row' }}>
              <Grid item xs={12} sm={8}>                
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box>                  
                  {location.subcategories.map((subcategory, index) => (
                    <Typography sx={{padding: '10px',color:'blue'}}key={index} onClick={() => handleSubcategorySelect(subcategory)}> 
                    <hr style={{ margin: '10px 0', borderTop: '1px solid #ccc',width: '100%'  }} /> 
                     {subcategory}</Typography>
                  ))}
                 
                </Box>
              </Grid>
            </Grid>
          </Collapse>
        </div>
              ))}
            </List>          
                </DialogContent>
                <DialogActions>              
                 </DialogActions>
              </Dialog>
            </div>
              <Typography sx={{marginLeft: '10%',}}>< ImportExportIcon/>Price:Lower to high</Typography>                
                  <TextField
                  label="Search the store"
                  fullWidth
                  sx={{
                    width: "35%",
                    maxWidth: "500px",
                    marginLeft: "95px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "52px", 
                      position: "relative",
                      "& fieldset": {
                        borderRadius: "2px",
                        borderWidth: "2px",
                      },
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "40px", // Thickness of the colored edge
                        height: "100%",
                        backgroundColor: "black", // Right corner color
                        borderRadius: "0 2px 2px 0", // Smooth corner on the right
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                    },
                  }}
                />
                </Card>                                 
            
          
          {data.map((item, index) => (
            <Grid
              item
              xs={12}
              key={item.id}
              sx={{
                padding: '1%',
                opacity: 0,
                animation: `${
                  index % 3 === 0
                    ? 'fade-in-scale'
                    : index % 3 === 1
                    ? 'slide-in'
                    : 'zoom-in'
                } 2.0s ease-in ${index * 0.3}s forwards`,
              }}
            >
              <Card
                onClick={() => handleCardClick(item.id)}
                sx={{
                  width: '105%',
                  height: '27vh',
                  padding: '5px',
                  marginTop: '4px',
                  cursor: 'pointer',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box
                      component="img"
                      src={item.imageUrl}
                      alt={item.name}
                      sx={{
                        width: '100%',
                        height: '30vh',
                        objectFit: 'cover',
                        borderRadius: '5px',
                      }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {item.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                        <Rating
                          value={item.rating}
                          readOnly
                          precision={0.5}
                          sx={{ fontSize: '1rem' }}
                        />
                        <Typography sx={{ marginLeft: '8px', fontSize: '1rem', color: 'gray' }}>
                          {item.rating}.0
                        </Typography>
                      </Box>
                    <Typography sx={{ color: 'gray', marginTop: '5px' }}>{item.description}</Typography>
                    <Typography sx={{ marginTop: '10px', fontWeight: 'bold' }}>{item.price}</Typography>                    
                    <Box sx={{ border: 2, borderColor: '#afafab', borderStyle: 'solid', borderRadius: '4px', padding: '1%',display: 'inline-flex',justifyContent: 'center',
                    alignItems: 'center',margin: '8px',  width: '25px',height: '25px' }}>
                      <Typography>S</Typography>
                    </Box>
                    <Box sx={{ 
                      border: 2, 
                      borderColor: '#afafab', 
                      borderStyle: 'solid', 
                      borderRadius: '4px', 
                       padding: '1%',
                      display: 'inline-flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      margin: '8px', 
                      width: '25px', 
                      height: '25px' 
                    }}>
                      <Typography>M</Typography>
                    </Box>
                    <Box sx={{ 
                      border: 2, 
                      borderColor: '#afafab', 
                      borderStyle: 'solid', 
                      borderRadius: '4px', 
                      padding: '1%', 
                      display: 'inline-flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      margin: '8px', 
                      width: '25px', 
                      height: '25px' 
                    }}>
                      <Typography>L</Typography>
                    </Box>
                    <Box sx={{ 
                      border: 2, 
                      borderColor: '#afafab', 
                      borderStyle: 'solid', 
                      borderRadius: '4px', 
                      padding: '1%',
                      display: 'inline-flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      margin: '8px', 
                      width: '25px', 
                      height: '25px' 
                    }}>
                      <Typography>XL</Typography>
                    </Box>
                    <Box sx={{ 
                      border: 2, 
                      borderColor: '#afafab', 
                      borderStyle: 'solid', 
                      borderRadius: '4px', 
                      padding: '1%', 
                      display: 'inline-flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      margin: '8px', 
                      width: '25px', 
                      height: '25px' 
                    }}>
                      <Typography>XXL</Typography>
                    </Box>             
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
        </Grid>
        
      
        {/* CSS for fade-in animation */}
        <style>
  {`
    @keyframes fade-in-scale {
      0% {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes slide-in {
      0% {
        opacity: 0;
        transform: translateX(-30px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes zoom-in {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `}
</style>
    </div>
  );
}
