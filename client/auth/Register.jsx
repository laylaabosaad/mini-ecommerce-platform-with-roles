import React, { useActionState } from "react";
import { register } from "../actions/auth";
import Inputs from "../src/components/Inputs";
import { Link } from "react-router-dom";

function Register() {
  const [state, action, isPending] = useActionState(register, undefined);

  return (
   <div className="flex justify-center  mt-20  min-h-[80vh]  bg-gray-100">
      <div className="bg-white py-5 px-8 rounded shadow-md h-fit w-full max-w-md">
        <h1 className="title text-center">Register</h1>
        <form action={action} className="flex flex-col">
          <Inputs
            title="Name"
            htmlFor="name"
            type="text"
            name="name"
            defaultValue={state?.fieldData?.name}
          />
          <Inputs
            title="Email"
            htmlFor="email"
            type="email"
            name="email"
            defaultValue={state?.fieldData?.email}
          />
          <Inputs
            title="Password"
            htmlFor="password"
            type="password"
            name="password"
          />
          <Inputs
            title="Confirm Password"
            htmlFor="confirmPassword"
            type="password"
            name="confirmPassword"
          />

          {state?.error && <p className="text-red-600">{state?.error}</p>}
          {state?.success && (
            <p className="text-green-600">Registration successful!</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-5"
          >
            {isPending ? "Registering..." : "Register"}
          </button>

          <p className="mt-4 text-center text-sm">
            Already have an account? {""}
            <Link to="/login" className="text-blue-600 underline">
              Login Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
