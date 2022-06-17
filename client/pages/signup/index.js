import { useState } from "react";
import axios from "axios";
import useRequest from "../../hooks/use-request.js";
import Router from "next/router";
export default function signup() {
  //const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/auth/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: (reslut) => Router.push("/"),
  });
  function updateEmail(e) {
    setEmail(e.target.value);
  }
  function updatePassword(e) {
    setPassword(e.target.value);
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    await doRequest();
  };
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={updateEmail}
        ></input>
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={updatePassword}
        ></input>
      </div>
      <div>{errors ? errors.map((err) => err.message) : null}</div>
      <div>
        <input type="submit" value="Signup"></input>
      </div>
    </form>
  );
}
