import React, { useState } from "react";

const Sidebar = ({ onNavigate }) => {
  const menuItems = [
    { text: "Dashboard", key: "dashboard" },
    { text: "Add Product", key: "addProduct" },
    { text: "Order List", key: "orderList" },
    { text: "Refund Request", key: "Refund Request" },
  ];

  const handleNavigation = (key) => {
    if (onNavigate) {
      onNavigate(key);
    }
  };

  return (
    <div
      style={{
        width: "200px",
        borderRight: "1px solid #ccc",
        padding: "16px",
        backgroundColor: "#f9f9f9",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "16px" }}>Seller Panel</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {menuItems.map((item) => (
          <li
            key={item.key}
            onClick={() => handleNavigation(item.key)}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #ddd",
            }}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

const initialProducts = [
  {
    id: 1,
    name: "BUTTON DOWN MAXI DRESS",
    imageUrl:
      "https://mimosaforever.com/cdn/shop/files/096A9861_270x_crop_bottom.jpg?v=1730806827",
    price: "$10",
    quantityAvailable: 20,
    colors: "Red, Blue, Black",
    location: "Colombo",
    contact: "1234567890",
    description: "A stylish maxi dress.",
  },
  // Add more products as needed
];

const SellerLandingPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setPopupVisible(true);
  };

  const handleSave = () => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === selectedProduct.id ? selectedProduct : p
      )
    );
    setPopupVisible(false);
  };

  const handleDelete = () => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== selectedProduct.id)
    );
    setPopupVisible(false);
  };

  const handleChange = (field, value) => {
    setSelectedProduct({
      ...selectedProduct,
      [field]: value,
    });
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar onNavigate={handleNavigation} />

      {/* Main Content */}
      <div
        style={{
          flexGrow: 1,
          marginLeft: "200px",
          padding: "24px",
          backgroundColor: "#fff",
          minHeight: "100vh",
        }}
      >
        {activeSection === "dashboard" && (
          <div style={{ textAlign: "center", paddingTop: "50px" }}>
            <h1>Dashboard</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  style={{
                    width: "300px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                  <div style={{ padding: "16px" }}>
                    <h3>{product.name}</h3>
                    <p>Price: {product.price}</p>
                    <p>Available: {product.quantityAvailable}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Popup */}
      {popupVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "600px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              position: "relative",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <button
              onClick={() => setPopupVisible(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#ccc",
              }}
            >
              ×
            </button>
            <h2>Edit Product</h2>

            {/* Form Fields Layout */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <div style={{ width: "48%" }}>
                <label>Type:</label>
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    handleChange("name", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    margin: "8px 0",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div style={{ width: "48%" }}>
                <label>Price:</label>
                <input
                  type="text"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    handleChange("price", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    margin: "8px 0",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>

            {/* Additional Fields Layout */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <div style={{ width: "48%" }}>
                <label>Image URL:</label>
                <input
                  type="text"
                  value={selectedProduct.imageUrl}
                  onChange={(e) =>
                    handleChange("imageUrl", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    margin: "8px 0",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div style={{ width: "48%" }}>
                <label>Quantity:</label>
                <input
                  type="number"
                  value={selectedProduct.quantityAvailable}
                  onChange={(e) =>
                    handleChange("quantityAvailable", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    margin: "8px 0",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>

            {/* Location Field */}
            <div style={{ marginBottom: "20px" }}>
              <label>Location:</label>
              <input
                type="text"
                value={selectedProduct.location}
                onChange={(e) =>
                  handleChange("location", e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "8px 0",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>

            {/* Description Field */}
            <div style={{ marginBottom: "20px" }}>
              <label>Description:</label>
              <textarea
                value={selectedProduct.description}
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "8px 0",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  height: "100px",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  padding: "12px 20px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                Save
              </button>
              <button
                onClick={handleDelete}
                style={{
                  backgroundColor: "#f44336",
                  color: "#fff",
                  border: "none",
                  padding: "12px 20px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerLandingPage;
