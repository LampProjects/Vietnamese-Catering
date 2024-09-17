// Menu.js
// Contains different items on the menu
// Author: Patrick Lam
import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { useCart } from "../CartContext";
import "./Menu.css";

// Define the menuItems array with food items
const menuItems = [
  { 
    id: 1,
    name: "Bánh Mì thịt nguội",
    englishName: "Cold Cut Sandwich",
    imageUrl: "https://s3-media0.fl.yelpcdn.com/bphoto/ow-FIXQNw5SWPvQr5j4Sfg/o.jpg",
    description: "A classic Vietnamese sandwich with cold cuts, vegetables, and spices.",
    price: 5.99,
    category: "main"
  },
  {
    id: 2,
    name: "Cánh Gà Chiên Nước Mắm",
    englishName: "Fish Sauce Wings",
    imageUrl: "https://i0.wp.com/beyondsweetandsavory.com/wp-content/uploads/2022/02/Vietnamese-fish-sauce-wings-VyTran-4.jpg?resize=683%2C1024&ssl=1",
    description: "Fried and aromatic Vietnamese fish sauce wings.",
    price: 7.99,
    category: "main"
  },
  {
    id: 3,
    name: "Gỏi cuốn",
    englishName: "Spring Rolls",
    imageUrl: "https://healthynibblesandbits.com/wp-content/uploads/2020/02/Vietnamese-Spring-Rolls-7.jpg",
    description: "Fresh Shrimp Spring Rolls with herbs and sauces of your choice.",
    price: 4.99,
    category: "side"
  },
  {
    id: 4,
    name: "Bún Chả",
    englishName: "Grilled Pork with Noodles",
    imageUrl: "https://www.budgetbytes.com/wp-content/uploads/2022/07/Bun-Cha-side.jpg",
    description: "Vietnamese Meatballs with Noodles and Vegetables.",
    price: 8.99,
    category: "main"
  },
  {
    id: 5,
    name: "Cà Phê Sữa Đá",
    englishName: "Iced Coffee with Milk",
    imageUrl: "https://ambertran.com/wp-content/uploads/2023/08/1-ly-ca-phe-sua-1.jpg",
    description: "Vietnamese Iced Coffee with Milk.",
    price: 3.99,
    category: "drink"
  },
  {
    id: 6,
    name: "Bánh Xèo",
    englishName: "Sizzling Crepe",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkURINkxfl4tEIB_oyhwcsgNT4DG6Iqk8k5A&s",
    description: "Vietnamese Crepe with Noodles and Vegetables.",
    price: 6.99,
    category: "main"
  },
  {
    id: 7,
    name: "Chả Giò",
    englishName: "Egg Rolls",
    imageUrl: "https://foodisafourletterword.com/wp-content/uploads/2020/09/Vietnamese_Egg_Roll_Recipe_Cha_Gio_hori.jpg",
    description: "Vietnamese Egg rolls filled with meat, veggies, mungbean threads, and mushrooms.",
    price: 4.99,
    category: "side"
  },

  {
    id: 8,
    name: "Bánh Ướt ",
    englishName: "Vietnamese Rice Rolls",
    imageUrl: "https://iscleecam.edu.vn/wp-content/uploads/2024/06/Banh-Uot-Recipe-2.jpg",
    description: "Freshly steamed rice wrappers filled with pork and veggies",
    price: 3.99,
    category: "side"
  },
  {
    id: 9,
    name: "Bò Lúc Lắc",
    englishName: "Vietnamese Shaking Beef",
    imageUrl: "https://recipes.net/wp-content/uploads/2024/02/what-is-bo-luc-lac-1707281153.jpg",
    description: "Specialty cubed Beef dish stir fried with vegetables.",
    price: 6.99,
    category: "main"
  },
  {
    id: 10,
    name: "Cơm tấm",
    englishName: "Broken rice dish",
    imageUrl: "https://res.cloudinary.com/rainforest-cruises/images/c_fill,g_auto/f_auto,q_auto/v1622728125/The-Best-Food-In-Vietnam-Com-Tam/The-Best-Food-In-Vietnam-Com-Tam.jpg",
    description: "Rice dish made of broken rice grain and topped with vegetables, piece of chicken, and egg",
    price: 4.99,
    category: "main"
  },
  {
    id: 11,
    name: "Nước Mía",
    englishName: "Sugar Cane Juice",
    imageUrl: "https://media.licdn.com/dms/image/D4D12AQEQpOKmZx1vCw/article-cover_image-shrink_600_2000/0/1676792504188?e=2147483647&v=beta&t=D7R2HWv5qXIjjVmWXxeT-VgnhZWtoq8TKkurPrq5BNs",
    description: "Freshly squeezed Vietnamese sugar cane juice.",
    price: 2.99,
    category: "drink"
  },
  {
    id: 12,
    name: "Nước Dừa",
    englishName: "Coconut Juice",
    imageUrl: "https://parade.com/.image/t_share/MTkwNTgwOTUzNDYyMjg2MjA0/benefits-of-coconut-water-jpg.jpg",
    description: "Water from a coconut",
    price: 2.99,
    category: "drink"
  },
  {
    id: 13,
    name: "Chè Ba Màu",
    englishName: "Vietnamese Three Color Dessert",
    imageUrl: "https://www.savorysweetspoon.com/wp-content/uploads/2023/06/Che-Ba-Mau-10-960x1200.jpg",
    description: "A dessert made out of  of red beans, sweetened mung bean paste, and chewy pandan jelly topped with shaved ice and creamy coconut sauce.",
    price: 2.99,
    category: "dessert"
  },
  {
    id: 14,
    name: "Chè Chuối",
    englishName: "Banana Pudding",
    imageUrl: "https://i0.wp.com/simplevietnamesefood.com/wp-content/uploads/2024/06/IMG_0450-banana-pudding-with-nuts.jpg?resize=1024%2C683&ssl=1",
    description: "A dessert made out of  of red beans, sweetened mung bean paste, and chewy pandan jelly topped with shaved ice and creamy coconut sauce.",
    price: 2.99,
    category: "dessert"
  },
  {
    id: 15,
    name: "Bánh Cam",
    englishName: "Sesame balls",
    imageUrl: "https://i0.wp.com/simplevietnamesefood.com/wp-content/uploads/2022/05/IMG_3638-Homemade-sesame-balls-.jpg?resize=1024%2C683&ssl=1",
    description: "A dessert made out of rice flour filled with mung bean paste, rolled in white sesame seeds and then deep fried.",
    price: 2.99,
    category: "dessert"
  },
  // Could add more items here
];

function Menu() {
  const auth = useContext(AuthContext);
  const cart = auth.isLoggedIn ? useCart() : null;
  const [selectedItem, setSelectedItem] = useState(null);

  const handleReadMore = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleAddToCart = (item) => {
    if (auth.isLoggedIn && cart) {
      cart.addToCart(item);
      alert(`${item.name} added to cart!`);
    } else {
      alert("Please log in to add items to your cart.");
    }
  };

  const renderMenuItems = (category) => {
    return menuItems
      .filter(item => item.category === category)
      .map((item) => (
        <div key={item.id} className="menu-item">
          <div className="food-image" style={{backgroundImage: `url(${item.imageUrl})`}} />
          <div className="food-info">
            <p className="vietnamese-name">{item.name}</p>
            <p className="english-name">{item.englishName}</p>
            <p className="price">${item.price.toFixed(2)}</p>
            <div className="button-container">
              <button onClick={() => handleReadMore(item)} className="read-more-btn">
                Read More
              </button>
              {auth.isLoggedIn && (
                <button onClick={() => handleAddToCart(item)} className="add-to-cart-btn">
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div className="menu-container">
      <h2 className="menu-title">Our Food Items</h2>
      
      <h3 className="category-title">Main Dishes</h3>
      <div className="menu-grid">
        {renderMenuItems('main')}
      </div>

      <h3 className="category-title">Side Dishes</h3>
      <div className="menu-grid">
        {renderMenuItems('side')}
      </div>

      <h3 className="category-title">Drinks</h3>
      <div className="menu-grid">
        {renderMenuItems('drink')}
      </div>

      <h3 className="category-title">Dessert</h3>
      <div className="menu-grid">
        {renderMenuItems('dessert')}
      </div>

      {selectedItem && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedItem.name}</h3>
            <p>{selectedItem.englishName}</p>
            <p>{selectedItem.description}</p>
            <p>Price: ${selectedItem.price.toFixed(2)}</p>
            <button onClick={handleCloseModal} className="close-modal-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;