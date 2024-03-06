import { Link, useNavigate } from "react-router-dom";
import LabeledInput from "./LabeledInput";
import { SignupType } from "@mcace007/medium-common";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function Auth({ type }: { type: "signin" | "signup" }) {
  const [inputs, setInputs] = useState<SignupType>({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        inputs,
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Error while signing up");
      // alert the user here that the request failed
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-4xl font-extrabold">Create an account</div>
            <div className="flex text-slate-400 space-x-1 justify-center">
              <div>
                {type === "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </div>
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="hover:underline"
              >
                {type === "signin" ? "Create One" : "Login"}
              </Link>
            </div>
          </div>
          <div className="">
            {type === "signup" ? (
              <LabeledInput
                label="Name"
                placeholder="McACE007"
                onChange={(e) => {
                  setInputs((c) => ({
                    ...c,
                    name: e.target.value,
                  }));
                }}
              />
            ) : null}
            <LabeledInput
              label="Email"
              placeholder="ace@gmail.com"
              onChange={(e) => {
                setInputs((c) => ({
                  ...c,
                  email: e.target.value,
                }));
              }}
            />
            <LabeledInput
              label="Password"
              type="password"
              placeholder="123456"
              onChange={(e) => {
                setInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }));
              }}
            />
            <button
              onChange={sendRequest}
              type="button"
              className="text-white mt-8 bg-gray-800 hover:bg-gray-900 w-full focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              {type === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
