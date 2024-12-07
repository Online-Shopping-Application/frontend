import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Card, Typography, Box, Rating, Grid2, Button, TextField,} from '@mui/material';
import PrimarySearchAppBar from './Navbar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';

const Item = () => {
  const { id } = useParams(); // Retrieve the item ID from the URL
  const location = useLocation();
  const [imageLoaded, setImageLoaded] = useState(false); // Track image load status
  const [isReviewFormVisible, setReviewFormVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ user: '', comment: '', rating: 0 });
  const [overallResponse , setOverallResponse] = useState({});

  console.log(location.state.item);
  

  const itemData = [
    {
      id: 1,
      imageUrl:
        'https://i.pinimg.com/736x/af/36/78/af36783a464d3b5163053258a042e625.jpg',
      name: 'Women Fit and Flare Brown Dress',
      price:'$200',
      size:'medium',
      description:
        'This is the description of Bag item 1. It could be longer or shorternhgggggggggggggggggggvbfddd.',
      rating: 3,
      location:'colombo',
      reviews: [
        {
          user: 'Alice',
          comment: 'Loved this dress! Great fit and quality.',
          rating: 4,
        },
        {
          user: 'Alice',
          comment: 'Loved this dress! Great fit and quality.',
          rating: 4,
        },
        
        {
          user: 'John',
          comment: 'Decent product for the price.',
          rating: 3,
        },
         {
          user: 'Alice',
          comment: 'Loved this dress! Great fit and quality.',
          rating: 4,
        },
        
      ],
    },
    {
      id: 2,
      imageUrl:
        'https://rukminim2.flixcart.com/image/612/612/xif0q/dress/k/a/k/l-vna1003027-vishudh-original-imagyxpgq9ywyhmu.jpeg?q=70',
      name: 'Women Fit and Flare Brown Dress',
      price:'$200',
      size:'medium',
      description:
        'This is the description of Bag item 1. It could be longer or shorternhgggggggggggggggggggvbfddd.',
      rating: 3,
      location:'kandy',
      reviews: [
        {
          user: 'Alice',
          comment: 'Loved this dress! Great fit and quality.',
          rating: 4,
        },
        {
          user: 'Alice',
          comment: 'Loved this dress! Great fit and quality.',
          rating: 4,
        },
        
        {
          user: 'John',
          comment: 'Decent product for the price.',
          rating: 3,
        },
               
      ],
    },
    {
      id: 3,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZi6Ktng9k0ynGp3LIHdqTpsq8yvIVUjsgWQ&s',
      name: 'Women Fit and Flare Brown Dress',
      price:'$200',
      size:'medium',
      description:
        'This is the description of Bag item 1. It could be longer or shorternhgggggggggggggggggggvbfddd.',
      rating: 3,
      location:'colombo'
    },
    {
      id: 3,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZi6Ktng9k0ynGp3LIHdqTpsq8yvIVUjsgWQ&s',
      name: 'Women Fit and Flare Brown Dress',
      price:'$200',
      size:'medium',
      description:
        'This is the description of Bag item 1. It could be longer or shorternhgggggggggggggggggggvbfddd.',
      rating: 3,
      location:'colombo'
    },
    {
      id: 4,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkFh7oAqTE9kj9nBRyUoQKAFoyNXt3hsoWYg&s',
      name: 'Women Fit and Flare Brown Dress',
      price:'$90',
      size:'LArge',
      description:
        'This is the description of Bag item 2. It provides more details about the product.',
      rating: 4,
      location:'Jaffna'
    },
    {
      id: 5,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkFh7oAqTE9kj9nBRyUoQKAFoyNXt3hsoWYg&s',
      name: 'Women Fit and Flare Brown Dress',
      price:'$200',
      size:'m',
      description:
        'This is the description of Bag item 2. It provides more details about the product.',
      rating: 4,
      location:'colombo'
    },
    {
      id: 6,
      imageUrl:
        'https://i.pinimg.com/236x/11/d9/35/11d935546c55a277084a3f3264d6aa56.jpg',
      name: 'Women Fit and Flare Brown Dress',
      price:'$20',
      size:'m',
      description:
        'This is the description of Bag item 2. It provides more details about the product.',
      rating: 4,
      location:'colombo'
    },
    {
      id: 7,
      imageUrl:
        'https://i.pinimg.com/736x/2d/dd/be/2dddbe76ff01102f09975a62dcdfa834.jpg',
      name: 'Bag Item 2',
      price:'$500',
      size:'m',
      description:
        'This is the description of Bag item 2. It provides more details about the product.',
      rating: 4,
      location:'colombo'
    },
    {
      id: 8,
      imageUrl:
        'https://rukminim2.flixcart.com/image/612/612/xif0q/dress/g/s/l/xl-jne4372-janasya-original-imah47r45jrbf5n4.jpeg?q=70',
      name: 'Women Fit and Flare Brown Dress',
      price:'$200',
      size:'m',
      description:
        'This is the description of Bag item 2. It provides moremmmmmmmm details about the product.',
      rating: 4,
      location:'colombo'
    },
  ];

  const item = location.state.item
  // const item = itemData.find((item) => item.id === parseInt(id, 10)); // Find the item by ID

  if (!item) {
    return <Typography>Item not found!</Typography>;
  }
  const handleReviewSubmit = async() => {
     const userId = localStorage.getItem("userId")
  
    if (newReview.user && newReview.comment && newReview.rating > 0) {
      setReviews([...reviews, newReview]);
      setNewReview({ user: '', comment: '', rating: 0 }); // Reset form
      setReviewFormVisible(false); // Hide the form after submission
    }

    console.log(newReview);

    try {
      const productId = location.state.item.productId
      const reviewResponse = await axios.post("http://localhost:8085/api/v1/rating/createRating",{productId:productId,customerId:[userId],ratingValue:newReview.rating,feedback:newReview.comment})
      console.log(reviewResponse);
      window.location.reload()
      
    } catch (error) {
      alert(error)
    }


  };

  const getOverallReview = async()=>{
    try {
      const singleProductId = location.state.item.productId
      const overallReview = await axios.get(`http://localhost:8085/api/v1/rating/get-product/${singleProductId}`)

      // console.log(overallReview.data.ratings);
      setOverallResponse(overallReview.data.ratings)
      
    } catch (error) {
      alert(error)
    }
  }

  useEffect(()=>{
    getOverallReview()
  },[])


  return (
    <div>
    <PrimarySearchAppBar/>
      <Grid2 container spacing={5}>
        <Grid2 item xs={6}>
          <Card
            sx={{
              width: '95%',
              height: '80vh',
              padding: '5px',
              marginTop: '20%',
              cursor: 'pointer',
              marginLeft: '80px',
              overflow: 'hidden', 
            }}
          >
            <Box
              component="img"
              src={item.imgUrl}
              alt={item.name}
              onLoad={() => setImageLoaded(true)} 
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '5px',
                opacity: imageLoaded ? 1 : 0, 
                transform: imageLoaded ? 'scale(1)' : 'scale(3.0)', // Zoom effect on load
                transition: 'opacity 0.8s ease, transform 0.8s ease', // Smooth transition for load animation
                '&:hover': {
                  transform: 'scale(1.5)', 
                  transition: 'transform 0.5s ease-in-out',
                },
              }}
            />
          </Card>      
          </Grid2>
        <Grid2
          item
          xs={6}
          sx={{
            marginTop: '8%',
            marginLeft: '85px',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {item.name}
          </Typography>
          <br />
          <Typography variant="h7">Price: {item.price}</Typography>
          <Typography>Location: {item.location}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
          <Rating 
            value={overallResponse.ratingValue || 0} // Ensure default value
            readOnly 
            sx={{ fontSize: '1.5rem' }} 
        />
          <Typography sx={{ marginLeft: '8px', fontSize: '1rem', color: 'gray' }}>( {overallResponse.ratingValue} Reviews)</Typography>
          </Box>
          <Typography sx={{ marginTop: '15px' }}>{item.description}</Typography>
          <br />
          <Box sx={{ border: 2, borderColor: '#afafab', borderStyle: 'solid', borderRadius: '4px', padding: '8px',display: 'inline-flex',justifyContent: 'center',
                    alignItems: 'center',margin: '8px',  width: '25px',height: '25px' }}>
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
                      width: '45px', 
                      height: '25px' 
                    }}>
                      <Typography>XXL</Typography>
                    </Box>    <br></br><br></br>
          <Button
            sx={{
              backgroundColor: 'white',
              color: 'black',
              padding: '10px',
              width: '500px',
              fontSize: '15px',
             
              border: '1px solid black',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: 'black',
                color: 'white',
                transform: 'scale(1.05)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                borderColor: 'black',
              },
            }}
          >
            <ShoppingCartIcon>   </ShoppingCartIcon>
            ADD TO CART
          </Button>
          <br></br>
          <br></br>
          <Button
            sx={{
              backgroundColor: 'black',
              color: 'white',
              padding: '10px',              
              width: '500px',
              fontSize: '15px',
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
          >
           BUY NOW
          </Button>
        </Grid2>
      </Grid2>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px' ,padding:'5px',marginLeft:'80px', }}>
    User Reviews
  </Typography>
  
  </Box>
  {item.reviews && item.reviews.length > 0 ? (
  <Box sx={{ width: '40%', maxWidth: '1200px', marginLeft:'80px', display: 'flex', flexWrap: 'wrap', gap: '8px',}}>
  {item.reviews.map((review, index) => (
    <Box
      key={index}
      sx={{
        flex: '1 1 calc(33.33% - 8px)',
        marginBottom: '8px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '2px', 
        backgroundColor:'#f4f6f6 ' ,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography sx={{ fontWeight: 'bold' }}>{review.user}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
    <Rating
      value={review.rating}
      readOnly
      precision={0.5}
      sx={{ fontSize: '1rem' }}
    />
    <Typography sx={{ marginLeft: '8px', fontSize: '1rem', color: 'gray' }}>
      {review.rating}.0
    </Typography>
  </Box>
      <Typography sx={{ marginTop: '8px', color: 'gray' }}>{review.comment}</Typography>
    </Box>
  ))}
</Box>
) : (
  <Typography sx={{marginLeft:'80px',}}>No reviews yet..</Typography>
)}
<br></br>
<Button
        sx={{ backgroundColor: 'black', color: 'white', marginLeft: '80px' , marginBottom: '50px'}}
        onClick={() => setReviewFormVisible(!isReviewFormVisible)}
      >
        Add Your Review
      </Button>

      {isReviewFormVisible && (
        <Box sx={{ marginTop: '16px' }}>
          <TextField
  label="Your Name"
  value={newReview.user}
  onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
  fullWidth
  sx={{
    marginBottom: '8px',
    width: '70%',
    marginLeft: '80px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black', 
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black', 
      },
    },
  }}
/>
          <br></br>
          <TextField
            label="Your Comment"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            fullWidth
            multiline
            rows={3}
            sx={{
            marginBottom: '8px',
            width: '70%',
            marginLeft: '80px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'black',
                 // Default border color
              },
              '&:hover fieldset': {
                borderColor: 'black',
                 // Hover state border color
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black',
                // Focused state border color
              },
            },
          }}
          />
          <br></br>
          <Rating
            value={newReview.rating}
            onChange={(e, newValue) => setNewReview({ ...newReview, rating: newValue })}
            sx={{ marginBottom: '8px',marginLeft:'80px', }}
          />
          <br></br>
          <Button variant="contained" sx={{marginLeft:'80px', marginBottom:'50px',backgroundColor:'white',color:'black',border:'1px solid black'}} onClick={handleReviewSubmit}>
            Submit
          </Button>
        </Box>
      )}
    </div>
  );
};

export default Item;
