import { useNavigate } from 'react-router-dom';
import Button from './Button'; // Adjust the import path based on your project structure

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="text-center space-y-6 p-6">
        {/* 404 Header */}
        <h1 className="text-6xl md:text-8xl font-bold text-error">404</h1>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-semibold text-base-content">
          Oops! Page Not Found
        </h2>
        <p className="text-base md:text-lg text-base-content/80 max-w-md mx-auto">
          It seems we can’t find the page you’re looking for. Don’t worry, let's get you back to shopping!
        </p>

        {/* Back to Home Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/")} // Simple redirect; use your router if applicable
        >
          Back to Home
        </Button>

        {/* Optional Illustration */}
        <div className="mt-8">
          <svg
            className="w-48 h-48 md:w-64 md:h-64 mx-auto text-base-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm text-base-content/60 mt-2">
            A confused face because we’re lost too!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;