import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./UsersLandingPage.css";


const products = [
    {
      id: 1,
      name: "Men party wear",
      price: "$20",
      image: "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/28984412/2024/7/15/65f9d637-2af9-4983-ba71-72b133b0753e1721017686285-INVICTUS-Men-Blazers-6781721017685771-1.jpg",
      sizes: "S, M, L",
      description: "A stylish and comfortable choice.",
    },
    {
      id: 2,
      name: "Denim Long sleeve",
      price: "$30",
      image: "https://oldnavy.gap.com/webcontent/0056/144/385/cn56144385.jpg ",
      sizes: "M, L, XL",
      description: "Perfect for casual outings.",
    },
    {
      id: 3,
      name: "Men round neck T-Shirts",
      price: "$25",
      image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/t-shirt/x/u/b/m-ntc-t-211-208-full-new-trends-collection-original-imah4gkymw8rfc7t.jpeg?q=20&crop=false",
      sizes: "S, M, L, XL",
      description: "High-quality fabric for everyday use.",
    },
    {
      id: 4,
      name: "Floral Print Top",
      price: "$40",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlRmmVWnIGfD2-7JXdFrukqD9COTqWnvP9jYtUSGS36m0Z4BV7J5ApL-epZPbXAHn5SQ&usqp=CAU",
      sizes: "M, L, XXL",
      description: "Elegant and durable for any occasion.",
    },
    {
        id: 8,
        name: "Barbari Silk Saree",
        price: "$60",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqREFCvooYHZhSgXffaQIMr4sEf-dbXBHF-8ccwdpq2XeI-GSLV4DaKHf4Iu1qnydMix0&usqp=CAU",
        sizes: "L, XL",
        description: "Premium materials for unmatched comfort.",
      }
    ,
    {
      id: 6,
      name: "Floral print Top",
      price: "$35",
      image: "https://medias.utsavfashion.com/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/p/r/printed-pure-cotton-kurti-in-navy-blue-v1-tuv937.jpg",
      sizes: "S, M",
      description: "Lightweight and perfect for summer.",
    },
    {
      id: 7,
      name: "Product 7",
      price: "$45",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJlavT9k3lTNSVA4gR0OB8YaMgTLigRv2Psw&s",
      sizes: "M, L, XL",
      description: "A classic design with a modern twist.",
    },
    {
        id: 5,
        name: "Baby frock",
        price: "$50",
        image: "https://5.imimg.com/data5/SELLER/Default/2022/12/DM/FX/CJ/96490378/baby-frocks.jpg",
        sizes: "One Size",
        description: "A versatile accessory for everyone.",
      }
    ,
    {
      id: 9,
      name: "silk Saree",
      price: "$70",
      image: "https://3.imimg.com/data3/OC/JJ/MY-4793945/designer-saree-500x500.jpg",
      sizes: "S, M, L",
      description: "Sophisticated and practical for daily wear.",
    },
  ];
  
  const categories = [
    { name: "Men", image: "https://thilakawardhana.com/cdn/shop/files/MENS_da71f2fd-ad52-4bec-88a8-5eb6b727c321_1570x.png?v=1723446204", link: "/login" },
    { name: "Women", image: "https://thilakawardhana.com/cdn/shop/files/WOMENS_18c1fd44-5cad-4756-8e59-0493a0af82a5_1570x.png?v=1723446146", link: "/login" },
    { name: "Bags and Shoes", image: "https://thilakawardhana.com/cdn/shop/files/BAGS-_--SHOES_1570x.png?v=1723445392", link: "/login" },
    { name: "Kids", image: "https://thilakawardhana.com/cdn/shop/files/KIDS_b9b1fc65-1840-4def-ac4c-1c02b0a61e25_1570x.png?v=1723445838", link: "/login" },
  ];
  

const brands = [
  "https://thilakawardhana.com/cdn/shop/files/AURA_534x.jpg?v=1722711254",
  "https://thilakawardhana.com/cdn/shop/files/engage1_370x.png?v=1722711253",
  "https://thilakawardhana.com/cdn/shop/files/Rectangle_26_220x.png?v=1717731894",
  "https://thilakawardhana.com/cdn/shop/files/Rectangle_27_220x.png?v=1717731938",
  "https://thilakawardhana.com/cdn/shop/files/Rectangle_28_220x.png?v=1717732026",
  "https://thilakawardhana.com/cdn/shop/files/Knot2_370x.png?v=1722711253",
  "https://thilakawardhana.com/cdn/shop/files/Knot2_370x.png?v=1722711253",
  "https://thilakawardhana.com/cdn/shop/files/Trafford_570x.png?v=1722744665",
  "https://thilakawardhana.com/cdn/shop/files/iq2-new_1880x.png?v=1722712271"
];

function UsersLandingPage() {
  return (
    <Box>
        {/* Navigation Bar */}
    <AppBar position="sticky" className="navbarHome">
    <Toolbar className="toolbarHome" sx={{ justifyContent: "space-between" }}>
        {/* Logo on the left */}
        <Box>
        {/* <img
            src='./logo.png'
            alt="Platform Logo"
            className="logo"
            style={{ height: "50px", cursor: "pointer" }}
        /> */}
        <Typography
            variant="h6"
            sx={{
              fontFamily: "'Poppins', sans-serif", 
              fontWeight: "bold", 
              fontSize: "24px", 
              color: "#4A90E2", 
              cursor: "pointer",
            }}
          >
            Stylo
          </Typography>
        </Box>
        
        {/* Buttons on the right */}
        <Box>
        <Button
            color="inherit"
            href="/login"
            className="login-button"
            style={{ marginRight: "10px" }}
            variant="outlined"
        >
            Login
        </Button>
        <Button
            color="inherit"
            href="/register"
            className="register-button"
            variant="outlined"
        >
            Register
        </Button>
        </Box>
    </Toolbar>
    </AppBar>

      {/* Slideshow Section */}
      <Box className="slideshow-container">
        <Carousel autoPlay infiniteLoop showThumbs={false} className="carousel">
        <div>
            <img src="https://thilakawardhana.com/cdn/shop/files/WEB-COVER_1.jpg?v=1723614117&width=1880" alt="Slide 3" />
          </div>
          <div>
            <img src="https://thilakawardhana.com/cdn/shop/files/WEB-COVER_1_f1496fae-56fa-4776-b54a-69e0de417fdb.jpg?v=1727775847&width=1880" alt="Slide 2" />
          </div>
          <div>
            <img src="https://thilakawardhana.com/cdn/shop/files/1520-x-592-WEB-4.png?v=1723446523&width=1880" alt="Slide 3" />
          </div>
          <div>
            <img src="https://thilakawardhana.com/cdn/shop/files/1520-x-592-WEB-5.png?v=1723446577&width=1880" alt="Slide 3" />
          </div>
        </Carousel>
      </Box>

        {/* Most Recently Added Products */}
        <Container className="products-section">
        <Typography variant="h5" className="section-title">
            NEW ARRIVALS...
        </Typography>
        <Grid container spacing={3}>
            {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card className="product-card">
                <CardMedia component="img" image={product.image} alt={product.name} />
                <CardContent>
                    <Typography variant="h6" className="product-name">
                    {product.name}
                    </Typography>
                    <Typography className="product-price">{product.price}</Typography>
                    <Typography className="product-description">
                    {product.description}
                    </Typography>
                    <Box className="product-sizes">
                    <Typography variant="subtitle1">Available Sizes:</Typography>
                    <Box className="sizes-container">
                        {product.sizes.split(", ").map((size, index) => (
                        <label key={index} className="size-label">
                            <input type="checkbox" disabled className="size-checkbox" />
                            {size}
                        </label>
                        ))}
                    </Box>
                    </Box>
                </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>
        </Container>

       {/* Collaborated Brands */}
      <Container className="brands-section">
        <Typography variant="h5" className="section-title">
          Collaborated Brands
        </Typography>
        <Box className="brand-slider">
          <Box className="brand-slider-track">
            {brands.map((logo, index) => (
              <Box className="brand-logo-container" key={index}>
                <img src={logo} alt={`Brand ${index + 1}`} className="brand-logo" />
              </Box>
            ))}
            {/* Duplicate brands for seamless loop */}
            {brands.map((logo, index) => (
              <Box className="brand-logo-container" key={`duplicate-${index}`}>
                <img src={logo} alt={`Brand Duplicate ${index + 1}`} className="brand-logo" />
              </Box>
            ))}
          </Box>
        </Box>
      </Container> 
      {/**prefooter------------------------------------------ */}
      <div class="pre-footer">
        <div class="pre-footer-container">
          <div class="pre-footer-column">
            <h4>SHOP</h4>
            <ul>
              <li><a href="#">Women</a></li>
              <li><a href="#">Men</a></li>
              <li><a href="#">Kids</a></li>
              <li><a href="#">Mother & Baby</a></li>
              <li><a href="#">Home & Lifestyle</a></li>
              <li><a href="#">Health & Beauty</a></li>
              <li><a href="#">Toys</a></li>
            </ul>
          </div>
          <div class="pre-footer-column">
            <h4>OUR SERVICES</h4>
            <ul>
              <li><a href="#">24/7 online service</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">Door delivery</a></li>
              <li><a href="#">Discounts</a></li>
            </ul>
          </div>
          <div class="pre-footer-column">
            <h4>COLLABORATED BRANDS</h4>
            <ul>
              <li><a href="#"></a>Tito</li>
              <li><a href="#"></a>Tendenza</li>
              <li><a href="#"></a>Aura</li>
              <li><a href="#"></a>Trafford</li>
              <li><a href="#"></a>Lily</li>
            </ul>
          </div>
          <div class="pre-footer-column">
            <h4>NEWSLETTER/ CUSTOMER SIGN UP</h4>
            <p>Sign up for exclusive updates, new arrivals, and insider-only discounts.</p>
            <Button
              color="inherit"
              href="/register"
              className="register-button"
              variant="outlined"
            >
              Register
            </Button>
            <div class="social-icons">
              <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-instagram"></i></a>
              <a href="#"><i class="fa fa-twitter"></i></a>
              <a href="#"><i class="fa fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>


      {/* Footer */}
      <Box className="footer">
        <Typography variant="body2" className="footer-text">
          &copy; Copyrights 2024 . All rights reserved | Designed by <b>CodeNexus</b> | E-Commerce solution by <b>STYLO</b>.
        </Typography>
      </Box>
    </Box>
  );
}

export default UsersLandingPage;
