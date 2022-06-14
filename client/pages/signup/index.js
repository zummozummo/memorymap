import { useState } from "react";
import axios from "axios";
export default function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  function updateEmail(e) {
    setEmail(e.target.value);
  }
  function updatePassword(e) {
    setPassword(e.target.value);
  }
  const submitHandler = async (e) => {
    console.log("value");
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", {
        email,
        password,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
      setErrors(err.response.data.errors);
    }
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
      <div>{errors.map((err) => err.message)}</div>
      <div>
        <input type="submit" value="Signup"></input>
      </div>
    </form>
  );
}
