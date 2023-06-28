import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ name, username, email, password, phoneNumber }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("user already exists");
        return res.json();
      })
      .then((data) => console.log("user registered successfully", data))
      .catch((err) => console.error(err.message));

    // setName("");
    // setUserName("");
    // setEmail("");
    // setPassword("");
    // setPhoneNumber("");
  }

  return (
    <section className=" h-[100vh] bg-gray-200 flex flex-col justify-center items-center ">
      <div className="bg-white rounded-lg w-[50%] py-10 px-4 md:px-24 ">
        <div className="mb-8">
          <h1 className=" text-gray-800 text-4xl font-semibold mb-2 ">
            Get Started
          </h1>
          <p className="text-sm text-gray-800 ">
            Already an existing user?{" "}
            <Link to="/login" className="underline italic text-violet-600">
              login now
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="input-btn"
            placeholder="Name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input-btn "
            placeholder="Username"
            type="text"
            required
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="input-btn"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input-btn"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="input-btn"
            placeholder="Phone number"
            type="number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button
            className="text-center mt-4 text-white bg-violet-800 py-2 rounded-xl cursor-pointer hover:opacity-80"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
}
