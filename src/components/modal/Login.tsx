import { useState } from 'react';
import { ILoginModal } from '../../interface/ILogin';
import Signup from './Signup';
import { useForm } from 'react-hook-form';
import Button from '../Button';

// Define the form data type
interface LoginFormData {
  email: string;
  password: string;
}

const Login = ({ show, setShow }: ILoginModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [signUp, setSignUp] = useState(false);

  const handleOpenSignup = () => {
    setSignUp(true);
  };

  // Add type to the data parameter
  const onSubmit = (data: LoginFormData) => {
    console.log(data, "login data");
  };

  return (
    <>
      <div className={`modal ${show ? 'modal-open' : ''}`}>
        <div className="modal-box relative bg-base-100 shadow-2xl max-w-md w-full p-6 rounded-xl">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 hover:bg-base-200"
            onClick={() => setShow(false)}
          >
            ✕
          </button>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to BlinkBuy
            </h3>
            <p className="text-base-content/70 mt-2">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full focus:input-primary"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && (
                <span className="text-error text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full focus:input-primary"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
              />
              {errors.password && (
                <span className="text-error text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full btn-lg mt-6 hover:btn-primary-focus transition-all duration-300"
            >
              Sign In
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-base-content/70">
              Don't have an account?{' '}
              {/* <button
                type="button"
                className="text-primary font-medium hover:underline"
                onClick={handleOpenSignup}
              >
                Create Account
              </button> */}
              <a className='link link-primary' onClick={handleOpenSignup}>Signup</a>
            </p>
          </div>

          {/* For future oauth */}
          {/* <div className="divider my-6">OR</div> */}
          {/* <div className="grid grid-cols-2 gap-4">
            <button className="btn btn-outline btn-sm">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.24 10.32V14.4h4.62c-.18 1.14-.66 2.1-1.38 2.82l2.22 1.74c1.38-1.32 2.28-3.3 2.28-5.56 0-.66-.06-1.32-.18-1.98h-7.56z" />
                <path fill="currentColor" d="M12 18c-2.28 0-4.32-1.2-5.46-3l-2.22 1.74C6 19.08 8.88 21 12 21c2.34 0 4.44-.9 6-2.28l-2.22-1.74c-.72.66-1.68 1.02-2.58 1.02z" />
                <path fill="currentColor" d="M6.54 15c-.66-.9-1.02-2.04-1.02-3.18s.36-2.28 1.02-3.18L4.32 6.9C3 8.88 2.28 11.28 2.28 12s.72 3.12 2.04 5.1l2.22-1.74z" />
                <path fill="currentColor" d="M12 6c.9 0 1.86.36 2.58 1.02l2.22-1.74C15.42 3.9 13.32 3 11.76 3c-3.12 0-6 1.92-7.68 4.26l2.22 1.74C7.44 7.2 9.48 6 12 6z" />
              </svg>
              Google
            </button>
            <button className="btn btn-outline btn-sm">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M9.12 14.46V9.54H7.2v-2.1h1.92V5.76c0-1.68 1.14-3.18 2.76-3.18h2.04v2.1h-1.38c-.66 0-1.14.48-1.14 1.14v1.62h2.46l-.36 2.1h-2.1v4.92H9.12z" />
              </svg>
              Facebook
            </button>
          </div> */}
        </div>

        {show && (
          <div
            className="modal-backdrop bg-base-300/50 backdrop-blur-sm"
            onClick={() => setShow(false)}
          />
        )}
      </div>

      {signUp && <Signup show={signUp} setShow={setSignUp} />}
    </>
  );
};

export default Login;