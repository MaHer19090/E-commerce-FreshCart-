import axios from 'axios';
import { useQuery } from 'react-query';


export default function useAPI(key , endPoint){
    
let baseURL = 'https://ecommerce.routemisr.com';
function getProducts(){
    return axios.get(`${baseURL}/api/v1/${endPoint}`)
}
    return useQuery(key, getProducts )
}