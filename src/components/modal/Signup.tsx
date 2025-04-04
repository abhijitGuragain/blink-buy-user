import { useForm } from 'react-hook-form';
import Button from '../Button';
import { ILoginModal } from '../../interface/ILogin';
import { useState } from 'react';
import VerifyOtp from './VerifyOtp';
// import { authService } from '../../services/authService'; // Import authService
import { useQueryClient } from '@tanstack/react-query';
import { authService } from '../../services/AuthService';

// Define form data interface
interface SignupFormData {
  firstname: string;
  lastname: string;
  email: string;
  phoneno: string;
  password: string;
  re_password: string;
}

interface SignupProps extends ILoginModal {
  onSignup?: (data: SignupFormData) => void;
}

const Signup = ({ show, setShow, onSignup }: SignupProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      phoneno: '',
      password: '',
      re_password: '',
    },
  });

  const [showVerifyOtp, setShowVerifyOtp] = useState(false);

  // Watch password for confirm password validation
  const password = watch('password');

  // Use the register mutation from authService
  const registerMutation = authService.useRegister({
    onSuccess: (data) => {
      setShowVerifyOtp(true); // Show OTP verification modal
      reset(); // Reset form
      if (onSignup) {
        onSignup(watch()); // Call parent callback if provided
      }
      console.log('Signup successful:', data);
    },
    onError: (error) => {
      console.error('Signup failed:', error.response?.data.message);
      // You might want to show an error message to the user here
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });

  // Handle form submission
  const onSubmit = (data: SignupFormData) => {
    const { ...registerData } = data;
    localStorage.setItem("email", data.email)
    registerMutation.mutate(registerData);
  };

  // Handle OTP verification success
  const handleVerifyOtp = (otp: string) => {
    authService.useVerifyOtp({
      onSuccess: () => {
        setShowVerifyOtp(false);
        setShow(false); // Close signup modal after successful verification
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      },
    }).mutate({ otp, email: localStorage.getItem("email") });
  };

  return (
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
            Join BlinkBuy
          </h3>
          <p className="text-base-content/70 mt-2">Create your account</p>
          {registerMutation.isError && (
            <p className="text-error mt-2">
              {registerMutation.error?.response?.data.message || 'Signup failed. Please try again.'}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">First Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="input input-bordered w-full focus:input-primary"
              {...register('firstname', {
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message: 'First name must be at least 2 characters',
                },
              })}
            />
            {errors.firstname && (
              <span className="text-error text-sm mt-1">
                {errors.firstname.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="input input-bordered w-full focus:input-primary"
              {...register('lastname', {
                required: 'Last name is required',
                minLength: {
                  value: 2,
                  message: 'Last name must be at least 2 characters',
                },
              })}
            />
            {errors.lastname && (
              <span className="text-error text-sm mt-1">
                {errors.lastname.message}
              </span>
            )}
          </div>

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
            />
            {errors.email && (
              <span className="text-error text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Phone</span>
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="input input-bordered w-full focus:input-primary"
              {...register('phoneno', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Please enter a valid 10-digit phone number',
                },
              })}
            />
            {errors.phoneno && (
              <span className="text-error text-sm mt-1">
                {errors.phoneno.message}
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
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && (
              <span className="text-error text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="input input-bordered w-full focus:input-primary"
              {...register('re_password', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
            />
            {errors.re_password && (
              <span className="text-error text-sm mt-1">
                {errors.re_password.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full btn-lg mt-6 hover:btn-primary-focus transition-all duration-300"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-base-content/70">
            Already have an account?{' '}
            <button
              type="button"
              className="text-primary font-medium hover:underline"
              onClick={() => setShow(false)}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      <VerifyOtp
        show={showVerifyOtp}
        setShow={setShowVerifyOtp}
        onVerify={handleVerifyOtp}
      />

      {show && (
        <div
          className="modal-backdrop bg-base-300/50 backdrop-blur-sm"
          onClick={() => setShow(false)}
        />
      )}
    </div>
  );
};

export default Signup;