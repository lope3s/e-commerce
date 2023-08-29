import axios from "axios";
import ProductsService from "../services/Products";
import { Product } from "../types/entities/Product";

async function getProducts(fakeAPIURL: string) {
  const pService = new ProductsService();

  const productList = await pService.listProducts();

  if (productList.length) return [];

  const { data } = await axios.get<Product[]>(fakeAPIURL);

  const productsWithoutRating = data.map((data) => ({
    id: data.id,
    title: data.title,
    price: data.price,
    description: data.description,
    category: data.category,
    image: data.image,
  }));

  await pService.bulkCreate(productsWithoutRating);

  return productsWithoutRating;
}

export default getProducts;
