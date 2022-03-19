
import { apiWrapper } from "../../helpers/apiWrapper";


export const createBlock = async (data = {}) => {

  return apiWrapper.post(`/api/block`, data)
    .then((response) => {
      if (response) {
        return response
      }
    })
    .catch((err) => console.log(err));
}

export const updateBlock = async (data = {}, id) => {
// console.log(data);
  return apiWrapper.put(`/api/block/${id}`, data)
    .then((response) => {
      if (response) {
        return response
      }
    })
    .catch((err) => console.log(err));
}

export const getBlock = async (id) => {
  console.log("id",id);
  return apiWrapper.get(`/api/block/${id}`)
    .then((response) => {
      if (response) {
        return response
      }
    })
    .catch((err) => console.log(err));
}