import React, { useEffect, useState } from 'react';
import { Box, Card, Checkbox, Grid, Rating, Typography, Slider, TextField, Button } from '@mui/material';
import MenuAppBar from './Navbar';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Search() {
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [value, setValue] = useState([3000, 8000]); // Initial range values
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const colors = [
    { name: "Red", code: "#FF0000" },
    { name: "Green", code: "#00FF00" },
    { name: "Blue", code: "#0000FF" },
    { name: "Yellow", code: "#FFFF00" },
  ];

  const [data] = useState([
    {
      id: 1,
      imageUrl:
        'https://i.pinimg.com/736x/af/36/78/af36783a464d3b5163053258a042e625.jpg',
      name: 'Women Fit and Flare Brown Dress',
      price: '$10',
      size: 'medium',
      description:
        'This is the description of Bag item 1. It could be longer or shorternhgggggggggggggggggggvbfddd.',
      rating: 3,
      location: 'colombo'
    },
    {
      id: 2,
      imageUrl:
        'https://rukminim2.flixcart.com/image/612/612/xif0q/dress/k/a/k/l-vna1003027-vishudh-original-imagyxpgq9ywyhmu.jpeg?q=70',
      name: 'Women Fit and Flare Brown Dress',
      price: '$5',
      size: 'medium',
      description:
        'This is the description of Bag item 1. It could be longer or shorternhgggggggggggggggggggvbfddd.',
      rating: 3,
      location: 'kandy'
    },
    {
      id: 3,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZi6Ktng9k0ynGp3LIHdqTpsq8yvIVUjsgWQ&s',
      name: 'Women Fit and Flare Brown Dress',
      price: '$7',
      size: 'medium',
      description:
        'This is the description of Bag item 1. It could be longer or shorternhgggggggggggggggggggvbfddd.',
      rating: 3,
      location: 'colombo'
    },
    {
      id: 3,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZi6Ktng9k0ynGp3LIHdqTpsq8yvIVUjsgWQ&s',
      name: 'Women Fit and Flare Brown Dress',
      price: '$15',
      size: 'medium',
      description:
        'This is the description of Bag item 1. It could be longer or shorternhgggggggggggggggggggvbfddd.',
      rating: 3,
      location: 'colombo'
    },
    {
      id: 4,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkFh7oAqTE9kj9nBRyUoQKAFoyNXt3hsoWYg&s',
      name: 'Women Fit and Flare Brown Dress',
      price: '$90',
      size: 'LArge',
      description:
        'This is the description of Bag item 2. It provides more details about the product.',
      rating: 4,
      location: 'Jaffna'
    },
    {
      id: 5,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkFh7oAqTE9kj9nBRyUoQKAFoyNXt3hsoWYg&s',
      name: 'Women Fit and Flare Brown Dress',
      price: '$200',
      size: 'm',
      description:
        'This is the description of Bag item 2. It provides more details about the product.',
      rating: 4,
      location: 'colombo'
    },
    {
      id: 6,
      imageUrl:
        'https://i.pinimg.com/236x/11/d9/35/11d935546c55a277084a3f3264d6aa56.jpg',
      name: 'Women Fit and Flare Brown Dress',
      price: '$20',
      size: 'm',
      description:
        'This is the description of Bag item 2. It provides more details about the product.',
      rating: 4,
      location: 'colombo'
    },
    {
      id: 7,
      imageUrl:
        'https://i.pinimg.com/736x/2d/dd/be/2dddbe76ff01102f09975a62dcdfa834.jpg',
      name: 'Bag Item 2',
      price: '$500',
      size: 'm',
      description:
        'This is the description of Bag item 2. It provides more details about the product.',
      rating: 4,
      location: 'colombo'
    },
    {
      id: 8,
      imageUrl:
        'https://rukminim2.flixcart.com/image/612/612/xif0q/dress/g/s/l/xl-jne4372-janasya-original-imah47r45jrbf5n4.jpeg?q=70',
      name: 'Women Fit and Flare Brown Dress',
      price: '$200',
      size: 'm',
      description:
        'This is the description of Bag item 2. It provides moremmmmmmmm details about the product.',
      rating: 4,
      location: 'colombo'
    },
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCheckboxChange = (event) => {
    // console.log(event.target);

    const { value, checked } = event.target;

    if (checked) {
      // Add the selected type to the array
      setSelectedTypes((prev) => [...prev, value]);
    } else {
      // Remove the unselected type from the array
      setSelectedTypes((prev) => prev.filter((type) => type !== value));
    }
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    console.log("Selected color:", color);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    console.log("Selected size:", size);
  };

  const handleCardClick = (item) => {
    console.log(item);
    
    navigate('/item',{state:{item:item}});
  };


  const getAllProduct = async () => {
    try {
      const response = await axios.get('http://localhost:8083/api/product/get-all-product')
      console.log(response);
      setAllProducts(response.data)
    } catch (e) {
      alert(e)
    }
  }


  const filterProduct = async () => {
    try {
      console.log(value , selectedTypes , selectedColor , selectedSize);

      const filterResponse = await axios.post("http://localhost:8084/api/v1/filter/filter-product",{price:value ,colour:selectedColor,size:selectedSize , type:selectedTypes})
      console.log(filterResponse);

      setAllProducts(filterResponse.data.productDTO)

    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    getAllProduct()
  }, [])

  return (
    <div>
      <MenuAppBar />

      <Grid container spacing={24}>
        {/* Filter Section */}
        <Grid item xs={4}>
          <Card
            sx={{
              width: '45vh',
              height: '100%',
              padding: '10px',
              marginTop: '105px',
              marginLeft: '60px',
              boxShadow: '0 4px 4px rgba(0, 0, 0, 0.2)',
              // backgroundColor: 'blue',
            }}
          >
            < Box sx={{ padding: "13px" }}>
              <Typography variant="h7" sx={{ fontWeight: 'bold', }}>
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
            <Box sx={{ display: "flex", marginTop: "16px" }}>
              <Box
                sx={{
                  width: "90px",
                  height: "40px",
                  padding: '5px',
                  textAlign: "center",
                  lineHeight: "30px",
                  borderRadius: "4px",
                  marginLeft: '20px',
                  border: "2px solid #b2babb",
                }}
              >
                Rs. {value[0]}
              </Box>
              <Typography sx={{ marginLeft: "40px", marginTop: '10px' }}>to</Typography>
              <Box
                sx={{
                  width: "90px",
                  height: "40px",
                  padding: '5px',
                  marginLeft: '50px',
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
                padding: '10px',
                width: '300px',
                fontSize: '15px',
                fontWeight: 'bold',
                marginLeft: '20px',
                border: '1px solid black',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                  borderColor: 'black',
                },
              }}
              onClick={filterProduct}
            >
              APPLY
            </Button>
            <br></br><br></br>
            <Box sx={{ padding: "16px" }}>
              <Typography variant="h7" sx={{ fontWeight: 'bold', }}>
                CATEGORIES
              </Typography>
              <hr style={{ margin: "8px 0" }} />
              <br></br>
              <Checkbox {...label} /> All
            </Box>
            <Box sx={{ padding: "16px" }}>
              <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                TYPE
              </Typography>
              <hr style={{ margin: "8px 0" }} />
              <Checkbox value="Frocks" onChange={handleCheckboxChange} /> Frocks<br></br>
              <Checkbox value="Trousers" onChange={handleCheckboxChange} /> Trousers<br></br>
              <Checkbox value="Blouse" onChange={handleCheckboxChange} /> Blouse<br></br>
              <Checkbox value="Sarees" onChange={handleCheckboxChange} /> Sarees<br></br>
              <Checkbox value="Shirts" onChange={handleCheckboxChange} /> Shirts<br></br>
              <Checkbox value="Skirts" onChange={handleCheckboxChange} /> Skirts<br></br>
              <Checkbox value="Baby clothes" onChange={handleCheckboxChange} /> Baby clothes<br></br>
            </Box>

            <Box sx={{ padding: "16px" }}>
              <Typography variant="h7" sx={{ fontWeight: 'bold', }}>SIZE</Typography>
              <hr style={{ margin: "8px 0" }} />
              <Grid container spacing={2}>
                {sizes.map((size, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        width: '25px', height: '25px',
                        borderRadius: "4px",
                        textAlign: "center",
                        borderColor: '#afafab',
                        padding: "10px",
                        cursor: "pointer",
                        '&:hover': { backgroundColor: "#f0f0f0" }
                      }}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ padding: "16px"}}>
              <Typography variant="h7" sx={{ fontWeight: 'bold', }}>
                COLORS
              </Typography>
              <hr style={{ margin: "8px 0" }} />
              <Grid container spacing={2}>
                {colors.map((color, index) => (
                  <Grid item xs={3} sm={2} key={index}>
                    <Box
                      sx={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: color.code,
                        borderRadius: "50%",
                        margin: "0 auto",
                        cursor: "pointer",
                        '&:hover': { transform: "scale(1.1)" }
                      }}
                      onClick={() => handleColorClick(color.name)}
                    />

                  </Grid>
                ))}

              </Grid>
            </Box>
            <Box sx={{ padding: "16px" }}>
              <Typography variant="h7" sx={{ fontWeight: 'bold', }}>
                LOCATION
              </Typography>
              <hr style={{ margin: "8px 0" }} />
              <Checkbox {...label} /> Frocks<br></br>
              <Checkbox {...label} />Colombo<br></br>
              <Checkbox {...label} />Kandy<br></br>
              <Checkbox {...label} />Jaffna<br></br>
            </Box>
          </Card>
        </Grid>

        {/* Items Section */}

        <Grid item xs={8}>

          <Card
            sx={{
              height: '10vh',
              marginTop: '108px',
              padding: '8px',
              display: 'flex',
              width: '106%',
              marginLeft: '13px',
              flexDirection: 'row',
              justifyContent: 'center',
              // backgroundColor:"green"
            }}
          >
            <FilterListIcon sx={{ padding: "10px", marginLeft: '1px', }}></FilterListIcon>
            <Typography sx={{ padding: "10px", marginLeft: '1px', }}>Filter</Typography>
            <Typography sx={{ padding: "10px", marginLeft: '90px', }}>Price:Lower to high</Typography>
            <TextField
              label="Search the store"
              fullWidth
              sx={{
                width: "40%",
                maxWidth: "700px",
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
                    width: "50px", // Thickness of the colored edge
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


          {allProducts.map((item, index) => (
            <Grid
              item
              xs={12}
              key={index}
              sx={{
                // backgroundColor :"red",
                padding: '10px',
                opacity: 0,
                animation: `${index % 3 === 0
                  ? 'fade-in-scale'
                  : index % 3 === 1
                    ? 'slide-in'
                    : 'zoom-in'
                  } 2.0s ease-in ${index * 0.3}s forwards`,
              }}
            >
              <Card
                onClick={() => handleCardClick(item)}
                sx={{
                  width: '110%',
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
                      src={item.imgUrl}
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
                    <Box sx={{
                      border: 2, borderColor: '#afafab', borderStyle: 'solid', borderRadius: '4px', padding: '8px', display: 'inline-flex', justifyContent: 'center',
                      alignItems: 'center', margin: '8px', width: '25px', height: '25px'
                    }}>
                      <Typography>S</Typography>
                    </Box>
                    <Box sx={{
                      border: 2,
                      borderColor: '#afafab',
                      borderStyle: 'solid',
                      borderRadius: '4px',
                      padding: '8px',
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
                      padding: '8px',
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
                      padding: '8px',
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
                      padding: '8px',
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
