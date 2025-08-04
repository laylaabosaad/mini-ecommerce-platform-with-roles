import { useActionState, useContext, useEffect } from "react";
import { login } from "../actions/auth";
import Inputs from "../src/components/Inputs";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
function Login() {
  const [state, action, isPending] = useActionState(login, undefined);
  const { refreshUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.success) {
      refreshUser();
      navigate("/");
    }
  }, [state, navigate]);
  return (
    <div className="flex justify-center  mt-20 min-h-[80vh] bg-gray-100">
      <div className="bg-white py-5 px-8 rounded shadow-md h-fit w-full max-w-md">
        <h1 className="title text-center">Login</h1>
        <form action={action} className="flex flex-col">
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

          {state?.error && <p className="text-red-600">{state?.error}</p>}
          {state?.success && (
            <p className="text-green-600">Log in successful!</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-5"
          >
            {isPending ? "Loading..." : "Login"}
          </button>

          <p className="mt-4 text-center text-sm">
            Don't have an account? {""}
            <Link to="/register" className="text-blue-600 underline">
              Register Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
