import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AIP_URL, Product_API } from "../api";


export const fetchProduct = async() => {
    const response = await axios.get(`${Product_API}`)
    return response.data;
}

export const useProductApi = () => {
    return useQuery({
        queryKey: ["fetchProduct"],
        queryFn: fetchProduct
    })
}

