import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">

        <h1 className="text-7xl font-bold text-gray-800">404</h1>

        <h2 className="text-xl font-semibold mt-4 text-gray-700">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-2">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {/* <button
            onClick={() => navigate("/")}
            className="bg-gray-800 text-white py-2 rounded-xl hover:bg-gray-700 transition"
          >
            Go to Home
          </button> */}

          <button
            onClick={() => navigate(-1)}
            className="border border-gray-300 text-gray-700 py-2 rounded-xl hover:bg-gray-100 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
