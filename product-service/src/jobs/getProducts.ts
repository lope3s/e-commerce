import axios from "axios";
import ProductsService from "../services/Products";
import { Product } from "../types/entities/Product";

async function getProducts(fakeAPIURL: string) {
  const { data } = await axios.get<Product[]>(fakeAPIURL);

  const pService = new ProductsService();

  await pService.bulkCreate(data);

  return data;
}

export default getProducts;
