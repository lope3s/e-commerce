import {UpdateProdutStockPayload} from "../types/UpdateProductStock"

import axios from "axios";

class ProducService {
    #PRODUCT_SERVICE_URL = process.env["NODE_ENV"] === "development" ? process.env["PRODUCT_SERVICE_URL"] : "http://127.0.0.1:10001"

    async updateProductStock(productID: number, payload: UpdateProdutStockPayload) {
        return axios.put(this.#PRODUCT_SERVICE_URL + '/product-stock' + `/${productID}`, payload)
    }
}

export default ProducService
