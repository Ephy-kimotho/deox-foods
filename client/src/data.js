import pic1 from "./assets/images/pic1.jpg";
import pic2 from "./assets/images/pic2.jpg";
import pic3 from "./assets/images/pic3.jpg";
import pic4 from "./assets/images/pic4.jpg";
import pic5 from "./assets/images/pic5.jpg";
import pic6 from "./assets/images/pic6.jpg";
import pic7 from "./assets/images/pic7.jpg";
import pic8 from "./assets/images/pic8.jpg";
import pic9 from "./assets/images/pic9.jpg";
import pizza from "./assets/images/pizza.jpg"
import burger from "./assets/images/burger.jpg";
import pasta from "./assets/images/pasta.jpg";
import sushi from "./assets/images/sushi.jpg";
import ugali from "./assets/images/ugali.jpg";
import chapati from "./assets/images/chapati.jpg";

export const restaurants = [
  {
    id: 1,
    name: "NAKSHI HOTEL",
    rating: 4.9,
    location: "Main Gate",
    image: pic5,
    description: "Experience the best taste",
  },
  {
    id: 2,
    name: "GOLDEN FRIES",
    rating: 4.5,
    location: "Main Gate",
    image: pic6,
    description: "Savor the flavors of Main Gate",
  },
  {
    id: 3,
    name: "1960 HOTEL",
    rating: 4.2,
    location: "Njokerio",
    image: pic7,
    description: "Feel the taste of the best from Njokerio",
  },
  {
    id: 4,
    name: "MAGGY's HOTEL",
    rating: 3.5,
    location: "Njokerio",
    image: pic8,
    description: "Experience the feel from Maggy's hotel",
  },
];

export const meals = [
  {
    id: 1,
    name: "Pizza Margherita",
    image: pizza,
    hotel: "NAKSHI HOTEL",
    description: "Delicious pizza with fresh mozzarella",
    price: 120,
    quantity: 1,
  },
  {
    id: 2,
    name: "Cheese Burger",
    image: burger,
    hotel: "GOLDEN FRIES",
    description: "Juicy beef burger with fries",
    price: 80,
    quantity: 1,
  },
  {
    id: 3,
    name: "Pasta Alfredo",
    image: pasta,
    hotel: "1960 HOTEL",
    description: "Creamy pasta with parmesan cheese",
    price: 140,
    quantity: 1,
  },
  {
    id: 4,
    name: "Sushi",
    image: sushi,
    hotel: "MAGGY'S HOTEL",
    description: "Fresh sushi with tuna and salmon",
    price: 180,
    quantity: 1,
  },
  {
    id: 5,
    name: "Ugali beef",
    image: ugali,
    hotel: "MAGGY'S HOTEL",
    description: "Fresh beef served with hot ugali",
    price: 200,
    quantity: 1,
  },
  {
    id: 6,
    name: "Chapti beef",
    image: chapati,
    hotel: "1960 HOTEL",
    description: "Fresh sushi with tuna and salmon",
    price: 18.99,
    quantity: 1,
  },
  {
    id: 7,
    name: "chicken curry",
    hotel: "NAKSHI HOTEL",
    image: "/src/assets/images/chicken_curry.jpg",
    description: "Tasties chicken curry you can have.",
    price: 120,
    quantity: 1,
  },
  {
    id: 8,
    name: "noodles",
    hotel: "GOLDEN FRIES",
    image: "/src/assets/images/noodles.jpg",
    description: "Tasties noodles you can have.",
    price: 100,
    quantity: 1,
  },
  {
    id: 9,
    name: "ramen",
    hotel: "1960 HOTEL",
    image: "/src/assets/images/ramen.jpg",
    description: "Tasties ramen you can have.",
    price: 80,
    quantity: 1,
  },
  {
    id: 10,
    name: "shrimp",
    hotel: "1960 HOTEL",
    image: "/src/assets/images/shrimp.jpg",
    description: "Tasties shrimp you can have.",
    price: 80,
    quantity: 1,
  },
  {
    id: 11,
    name: "Apple",
    hotel: "MAGGY'S HOTEL",
    price: 35,
    image: pic9,
    description: "An apple",
    quantity: 1,
  },
  {
    id: 12,
    name: "Banana",
    hotel: "NAKSHI HOTEL",
    price: 15,
    image: pic3,
    description: "A yellow banana",
    quantity: 1,
  },
  {
    id: 13,
    name: "Orange",
    hotel: "GOLDEN FRIES",
    price: 20,
    image: pic2,
    description: "An orange",
    quantity: 1,
  },
  {
    id: 14,
    name: "Pineapple",
    hotel: "1960 HOTEL",
    price: 10,
    image: pic1,
    description: "Pinapples from delemonte",
    quantity: 1,
  },
  {
    id: 15,
    name: "Mango",
    hotel: "GOLDEN FRIES",
    price: 25,
    image: pic4,
    description: "Mangoes from machakos",
    quantity: 1,
  },
];
