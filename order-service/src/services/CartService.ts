import axios from "axios";

class CartService {
    #SERVICE_URL = process.env["NODE_ENV"] === "development" ? process.env["CART_SERVICE_URL"] : 'http://127.0.0.1:10000'

    async updateCart(itemID: number){
       return axios.put(this.#SERVICE_URL + `/${itemID}`) 
    }
}

export default CartService;
