import { Category } from "@mui/icons-material";
import tshirt from "../Assets/HomePage/pngfind.com-green-shirt-png-6920524.png";

const products = [
  {
    id: 1,
    image: tshirt,
    title: "Product 1",
    description: "This is a description of Product 1.",
    price: 49.99,
    inStock: true,
    categoryId: 1,
  },
  {
    id: 2,
    image: tshirt,
    title: "Product 2",
    description: "This is a description of Product 2.",
    price: 59.99,
    inStock: true,
    categoryId: 1,
  },
  {
    id: 3,
    image: tshirt,
    title: "Product 3",
    description: "This is a description of Product 3.",
    price: 39.99,
    inStock: true,
    categoryId: 3,
  },
  {
    id: 4,
    image: tshirt,
    title: "Product 4",
    description: "This is a description of Product 4.",
    price: 69.99,
    inStock: false,
    categoryId: 2,
  },
  {
    id: 5,
    image: tshirt,
    title: "Product 5",
    description: "This is a description of Product 1.",
    price: 49.99,
    inStock: false,
    categoryId: 3,
  },
  {
    id: 6,
    image: tshirt,
    title: "Product 6",
    description: "This is a description of Product 2.",
    price: 59.99,
    inStock: false,
    categoryId: 2,
  },
  {
    id: 7,
    image: tshirt,
    title: "Product 7",
    description: "This is a description of Product 3.",
    price: 39.99,
    inStock: true,
    categoryId: 2,
  },
  {
    id: 8,
    image: tshirt,
    title: "Product 8",
    description: "This is a description of Product 4.",
    price: 69.99,
    inStock: false,
    categoryId: 2,
  },
];

export default products;
