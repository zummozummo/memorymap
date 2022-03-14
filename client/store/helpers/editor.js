
import { apiWrapper } from "../../helpers/apiWrapper";


export const createBlock = async (data={}) => {
  
    return apiWrapper.post(`/api/block`, data)
      .then((response) => {
          if (response) {
            return response
          }
      })
      .catch((err) => console.log(err));
  }
  