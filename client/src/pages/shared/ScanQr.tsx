import {
    FaStore,
    FaBolt,
    FaTruck,
    FaArrowRight,
  } from "react-icons/fa";
  
  const ScanQr = () => {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-10">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-14 items-center">
          
          {/* Left Side */}
          <div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-md">
                <FaStore />
              </div>
  
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  QuickCart
                </h1>
  
                <p className="text-gray-500 text-sm">
                  Smart QR Ordering Platform
                </p>
              </div>
            </div>
  
            <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              Scan Store QR <br />
              & Start Ordering
            </h2>
  
            <p className="text-gray-500 text-lg leading-8 mb-8 max-w-xl">
              Browse products, place orders instantly, and track
              everything in realtime with a seamless shopping
              experience.
            </p>
  
            {/* <div className="flex gap-4 flex-wrap">
              <button className="bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2 shadow-sm">
                Open App
                <FaArrowRight />
              </button>
  
              <button className="border border-gray-300 hover:bg-gray-100 transition px-6 py-3 rounded-xl font-semibold text-gray-700">
                Continue in Browser
              </button>
            </div> */}
  
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
              
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mb-4">
                  <FaBolt className="text-yellow-500 text-xl" />
                </div>
  
                <h3 className="font-semibold text-gray-900 mb-2">
                  Fast Ordering
                </h3>
  
                <p className="text-sm text-gray-500 leading-6">
                  Instant product browsing & smooth checkout.
                </p>
              </div>
  
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                  <FaStore className="text-indigo-600 text-xl" />
                </div>
  
                <h3 className="font-semibold text-gray-900 mb-2">
                  Multi Store
                </h3>
  
                <p className="text-sm text-gray-500 leading-6">
                  Discover nearby shops easily with QR access.
                </p>
              </div>
  
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <FaTruck className="text-green-600 text-xl" />
                </div>
  
                <h3 className="font-semibold text-gray-900 mb-2">
                  Live Tracking
                </h3>
  
                <p className="text-sm text-gray-500 leading-6">
                  Realtime order updates and delivery status.
                </p>
              </div>
            </div>
          </div>
  
          {/* Right Side */}
          <div className="flex justify-center">
            <div className="relative">
              
              {/* Soft Glow */}
              <div className="absolute inset-0 bg-indigo-200 blur-3xl opacity-40 rounded-full"></div>
  
              {/* QR Card */}
              <div className="relative bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
                
                <div className="w-[320px] h-[320px] bg-white rounded-2xl overflow-hidden border border-gray-200">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://kommodo.ai/i/HtPgSqYry6wIs53L2Bd7"
                    alt="QR Code"
                    className="w-full h-full object-cover"
                  />
                </div>
  
                <p className="text-center mt-6 text-gray-900 text-xl font-semibold">
                  Scan to Open QuickCart
                </p>
  
                <p className="text-center text-gray-500 text-sm mt-2">
                  Secure • Fast • Contactless
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ScanQr;