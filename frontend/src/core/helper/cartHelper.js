import { API } from "../../backend";

export const getProductsByUserId = (userId,token) => {
  return fetch(`${API}/user/${userId}/cart`, 
  { method: "GET" , headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
})
    .then(response => {
      console.log(response);
      return response.json();
    })
    .catch(err => console.log(err));
};
// export const createCategory = (userId, token, category) => {
//   return fetch(`${API}/category/create/${userId}`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify(category)
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };

export const pushProductInCart=(userId,token,productId,product)=>{
  return fetch(`${API}/user/${userId}/cart/product/${productId}`,
  {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({...product,count:0})
      })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
}

export const incrementInCart=(userId,token,productId)=>{
  return fetch(`${API}/user/${userId}/cart/product/update/incre/${productId}`,
  {method:"PUT",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
})
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
}

export const decrementInCart=(userId,token,productId)=>{
  return fetch(`${API}/user/${userId}/cart/product/update/decre/${productId}`,
  {method:"PUT",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
})
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
}

export const deleteProductInCart=(userId,token,productId)=>{
  // console.log(productId);
  return fetch(`${API}/user/${userId}/cart/product/delete/${productId}`,
  {method:"DELETE",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
})
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
}