import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("invalid username or password");
        return res.json();
      })
      .then((data) => {
        alert("Login successful");
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className=" h-[100vh] bg-gray-200 flex flex-col justify-center items-center ">
      <div className="bg-white rounded-lg w-[70%] md:w-[40%] h-[70vh] py-10 px-8 lg:px-24 flex flex-col justify-center gap-8 ">
        <div className="">
          <h1 className=" text-gray-800 text-4xl font-semibold mb-4 ">
            Welcome
          </h1>
          <p className="text-sm text-gray-800 ">
            Don't have an account yet?{" "}
            <Link to="/register" className="underline italic text-violet-600">
              Sign up for free
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
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
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="text-center mt-4 text-white bg-black py-2 rounded-xl cursor-pointer hover:bg-[#111111] transition-all "
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
