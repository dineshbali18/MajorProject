import {API} from '../../backend';

export const getUserOrders=(userId,token)=>{
    return fetch(`${API}/orders/user/${userId}`,{
        method:"GET",
        headers:{
            Accept:"aplication/json",
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then((res)=>{
        return res.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}