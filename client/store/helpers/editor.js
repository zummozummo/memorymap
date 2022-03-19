
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

export const updateBlock = async (data = {}) => {
// console.log(data);
  return apiWrapper.put(`/api/block/${data.id}`, data)
    .then((response) => {
      if (response) {
        return response
      }
    })
    .catch((err) => console.log(err));
}

export const getBlock = async (data = {}) => {
  console.log(data);
  return apiWrapper.get(`/api/block/${data?.token}`)
    .then((response) => {
      if (response) {
        return response
      }
    })
    .catch((err) => console.log(err));
}