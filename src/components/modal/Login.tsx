import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom'; // Added Link import
import { ILoginModal } from '../../interface/ILogin';
import Signup from './Signup';
import Button from '../Button';
import { authService } from '../../services/AuthService';
import { AxiosError } from 'axios'; // For error typing

// Define form data type
interface LoginFormData {
  email: string;
  password: string;
}

// Define expected API response and error types
interface AuthResponse {
  // token: string;
  user: {
    id: string;
    email: string;
  };
}

interface ApiError {
  message: string;
}

const Login = ({ show, setShow }: ILoginModal) => {
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [signUp, setSignUp] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Use mutation with proper typing
  const { mutate, isPending } = authService.useLogin();

  const handleOpenSignup = () => {
    setSignUp(true);
  };

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    mutate(data, {
      onSuccess: (response: AuthResponse) => {
        console.log('Login successful:', response);
        setShow(false);
        // navigate('/');
      },
      onError: (error: AxiosError<ApiError>) => {
        setLoginError(error.response?.data?.message || 'Login failed. Please try again.');
      },
    });
  };

  return (
    <>
      <div className={`modal ${show ? 'modal-open' : ''}`}>
        <div className="modal-box relative bg-base-100 shadow-2xl max-w-md w-full p-6 rounded-xl">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 hover:bg-base-200"
            onClick={() => setShow(false)}
            aria-label="Close modal"
          >
            ✕
          </button>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to BlinkBuy
            </h3>
            <p className="text-base-content/70 mt-2">Sign in to continue</p>
          </div>

          {loginError && (
            <div className="alert alert-error mb-4">
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full focus:input-primary"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                disabled={isPending}
              />
              {errors.email && (
                <span className="text-error text-sm mt-1">{errors.email.message}</span>
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
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                disabled={isPending}
              />
              {errors.password && (
                <span className="text-error text-sm mt-1">{errors.password.message}</span>
              )}
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full btn-lg mt-6 hover:btn-primary-focus transition-all duration-300"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-base-content/70">
              Don’t have an account?{' '}
              <button
                type="button"
                className="text-primary font-medium hover:underline"
                onClick={handleOpenSignup}
                disabled={isPending}
              >
                Create Account
              </button>
            </p>
          </div>
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