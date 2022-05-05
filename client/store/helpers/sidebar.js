import axios from "axios";

export default async function getSidbar(authId) {
  console.log(authId);
  const response = await axios({
    method: "get",
    url: `/api/block/${authId}`,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => {
    return r.data;
  });
  console.log(response);
  return response;
}
