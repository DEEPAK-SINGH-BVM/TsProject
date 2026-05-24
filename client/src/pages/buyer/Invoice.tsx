import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation, useNavigate } from "react-router-dom";

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const order: any = location.state;

  const downloadPDF = async () => {
    const input = invoiceRef.current;
    console.log("PDFinput", input);

    if (!input) return;

    const canvas = await html2canvas(input);
    console.log("canvas", canvas);

    const imgData = canvas.toDataURL("image/png");
    console.log("imgData", imgData);

    const pdf = new jsPDF("p", "mm", "a4");
    console.log("pdf", pdf);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    console.log("pdfWidth", pdfWidth);

    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    console.log("pdfHeight", pdfHeight);

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save("invoice.pdf");
  };

  console.log("InvoiceOrder", order);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">No Invoice Data Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* TOP BUTTONS */}
      <div className="max-w-5xl mx-auto flex gap-3 mb-5">
        <button
          onClick={downloadPDF}
          className="bg-black text-white px-5 py-2 rounded-xl"
        >
          Download PDF
        </button>

        <button
          onClick={() => navigate("/home")}
          className="border border-gray-300 bg-white px-5 py-2 rounded-xl"
        >
          Back Home
        </button>
      </div>

      {/* PDF CONTENT */}
      <div
        ref={invoiceRef}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-8"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-5">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Invoice</h1>

            <p className="text-gray-500 mt-2">
              Order Successfully Placed
            </p>
          </div>

          {/* <button
            onClick={() => navigate("/home")}
            className="bg-black text-white px-5 py-2 rounded-xl"
          >
            Back Home
          </button> */}
        </div>

        {/* CUSTOMER + PAYMENT */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* CUSTOMER */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Customer Details
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Name :</span>{" "}
                {order?.deliveryAddress?.fullName}
              </p>

              <p>
                <span className="font-semibold">Phone :</span>{" "}
                {order?.deliveryAddress?.phone}
              </p>

              <p>
                <span className="font-semibold">City :</span>{" "}
                {order?.deliveryAddress?.city}
              </p>

              <p>
                <span className="font-semibold">State :</span>{" "}
                {order?.deliveryAddress?.state}
              </p>

              <p>
                <span className="font-semibold">Address :</span>{" "}
                {order?.deliveryAddress?.address}
              </p>
            </div>
          </div>

          {/* PAYMENT */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Payment Details
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">
                  Payment Method :
                </span>{" "}
                {order?.paymentMethod}
              </p>

              <p>
                <span className="font-semibold">
                  Order Status :
                </span>{" "}
                Pending
              </p>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-5">
            Product Details
          </h2>

          <div className="space-y-5">
            {order?.items?.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-5 border rounded-2xl p-4"
              >
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-24 h-24 rounded-xl object-cover border"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {item?.name}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Quantity : {item?.quantity}
                  </p>

                  <p className="text-gray-500">
                    Price : ₹{item?.price}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    ₹{item?.price * item?.quantity}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOTAL */}
        <div className="mt-10 border-t pt-6">
          <div className="space-y-3 max-w-sm ml-auto">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>

              <span>₹{order?.subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>

              <span>₹{order?.deliveryFee}</span>
            </div>

            <div className="flex justify-between text-2xl font-bold border-t pt-4">
              <span>Total</span>

              <span>₹{order?.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
