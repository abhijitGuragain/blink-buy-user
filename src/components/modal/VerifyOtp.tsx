import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '../Button';
import { useQueryClient } from '@tanstack/react-query';
import { authService } from '../../services/AuthService';

// Define OTP form data interface
interface OtpFormData {
  otp: string[];
}

interface VerifyOtpProps {
  show: boolean;
  setShow: (show: boolean) => void;
  onVerify?: (otp: string) => void;
  email?: string; // Add email as an optional prop
}

const VerifyOtp = ({ show, setShow, onVerify, email }: VerifyOtpProps) => {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<OtpFormData>({
    defaultValues: {
      otp: ['', '', '', '', '', ''],
    },
  });

  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes

  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

  // Use the verifyOtp mutation from authService
  const verifyOtpMutation = authService.useVerifyOtp({
    onSuccess: (data) => {
      console.log('OTP verified successfully:', data);
      if (onVerify) {
        onVerify(data.otp); // Call parent callback if provided
      }
      reset(); // Clear OTP inputs
      setShow(false); // Close modal
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error) => {
      console.error('OTP verification failed:', error.response?.data.message);
    },
  });

  // Countdown effect
  useEffect(() => {
    if (!show) {
      setTimeLeft(300);
      reset();
      return;
    }

    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [show, timeLeft, reset]);

  // Format time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Handle form submission
  const onSubmit = (data: OtpFormData) => {
    const otp = data.otp.join('');
    const emailToSend = email || localStorage.getItem('email') || ''; // Use prop or fallback to localStorage
    verifyOtpMutation.mutate({ otp, email: emailToSend }); // Include email in the payload
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    const emailToResend = email || localStorage.getItem('email') || '';
    authService.useRegister({
      onSuccess: () => {
        setTimeLeft(300); // Reset timer
        reset(); // Clear current OTP inputs
        console.log('OTP resent successfully');
      },
      onError: (error) => {
        console.error('Failed to resend OTP:', error.response?.data.message);
      },
    }).mutate({
      email: emailToResend,
    });
  };

  // Handle individual input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (value.length <= 1 && /^\d*$/.test(value)) {
      setValue(`otp.${index}`, value);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    if (pastedData.length > 0) {
      const otpArray = pastedData.split('').slice(0, 6);
      otpArray.forEach((digit, index) => {
        setValue(`otp.${index}`, digit);
      });
      inputRefs.current[Math.min(pastedData.length - 1, 5)]?.focus();
    }
  };

  // Auto-focus first input when modal opens
  useEffect(() => {
    if (show) {
      inputRefs.current[0]?.focus();
    }
  }, [show]);

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
            Verify OTP
          </h3>
          <p className="text-base-content/70 mt-2">
            Enter the 6-digit code sent to your email/phone
          </p>
          {verifyOtpMutation.isError && (
            <p className="text-error mt-2">
              {verifyOtpMutation.error?.response?.data.message || 'Invalid OTP. Please try again.'}
            </p>
          )}
          <div className="mt-3 flex gap-4 justify-center items-center">
            <span>OTP valid till:</span>
            <span
              className={`countdown font-mono text-lg ${timeLeft <= 30 ? 'text-error' : 'text-base-content'}`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center gap-2">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Controller
                  key={index}
                  name={`otp.${index}`}
                  control={control}
                  rules={{ required: 'All digits are required' }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      maxLength={1}
                      className="input input-bordered w-12 h-12 text-center text-lg focus:input-primary"
                      onChange={(e) => handleInputChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                    />
                  )}
                />
              ))}
          </div>

          {errors.otp && (
            <span className="text-error text-sm text-center block">
              {errors.otp[0]?.message || 'Please enter a valid OTP'}
            </span>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full btn-lg mt-6 hover:btn-primary-focus transition-all duration-300"
            disabled={timeLeft <= 0 || verifyOtpMutation.isPending}
          >
            {verifyOtpMutation.isPending ? 'Verifying...' : 'Verify OTP'}
          </Button>
        </form>

        <div className="text-center mt-4">
          <p className="text-base-content/70">
            Didn't receive a code?{' '}
            <button
              type="button"
              className={`font-medium hover:underline ${timeLeft <= 0 ? 'text-primary' : 'text-base-content/50 pointer-events-none'}`}
              disabled={timeLeft > 0}
              onClick={handleResendOtp}
            >
              Resend OTP
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
  );
};

export default VerifyOtp;