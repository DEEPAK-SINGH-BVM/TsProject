{
  /*
  // backend file structure
  C:.
│   .env
│   .gitignore
│   env
│   package-lock.json
│   package.json
│   tsconfig.json
│   
└───src
    │   index.ts
    │   
    ├───config
    │       cloudinary.ts
    │       db.ts
    │       mailer.ts
    │       socket.ts
    │       sqldb.ts
    │       
    ├───controllers
    │       cart.controllers.ts
    │       order.controllers.ts
    │       product.controllers.ts
    │       shop.controllers.ts
    │       user.controllers.ts
    │       
    ├───middlewares
    │       auth.middleware.ts
    │       multer.middleware.ts
    │       shop.middleware.ts
    │       upload.middleware.ts
    │       validate.middleware.ts
    │       
    ├───models
    │       cart.model.ts
    │       order.model.ts
    │       products.model.ts
    │       shop.model.ts
    │       user.model.ts
    │       
    ├───routes
    │       cart.routes.ts
    │       index.routes.ts
    │       order.routes.ts
    │       product.routes.ts
    │       shop.routes.ts
    │       user.routes.ts
    │       
    ├───utils
    │       cartUtils.ts
    │       sendEmail.ts
    │       uploadToCloudinary.ts
    │       
    └───validators
            auth.validator.ts
            shop.validator.ts
    // Frontend file structure
    C:.
│   .env
│   .gitignore
│   eslint.config.js
│   index.html
│   package-lock.json
│   package.json
│   postcss.config.js
│   README.md
│   tailwind.config.js
│   tsconfig.app.json
│   tsconfig.app.tsbuildinfo
│   tsconfig.json
│   tsconfig.node.json
│   vite.config.ts
│   
├───dist
│   │   index.html
│   │   
│   └───assets
│           index-BcVGrXLP.js
│           
└───src
    │   App.tsx
    │   global.d.ts
    │   main.css
    │   main.tsx
    │   Root.tsx
    │   vite-env.d.ts
    │   
    ├───api
    │       axios.ts
    │       endPoint.ts
    │       
    ├───components
    │   ├───common
    │   │       DashboardSkeleton.tsx
    │   │       Loader.tsx
    │   │       MyShopSkeleton.tsx
    │   │       ProductCardSkeleton.tsx
    │   │       ProfileSkeleton.tsx
    │   │       sellerOrderSkeleton.tsx
    │   │       
    │   ├───guard
    │   │       BuyerRoute.tsx
    │   │       ProtectedRoute.tsx
    │   │       PublicRoute.tsx
    │   │       SellerShopRoute.tsx
    │   │       
    │   ├───layout
    │   │       AuthLayout.tsx
    │   │       BuyerLayout.tsx
    │   │       Navbar.tsx
    │   │       SellerLayout.tsx
    │   │       
    │   └───product
    │           ProductCard.tsx
    │           
    ├───context
    │       AuthContext.tsx
    │       SocketContext.tsx
    │       
    ├───hook
    │       useAuth.ts
    │       
    ├───pages
    │   │   try.tsx
    │   │   
    │   ├───auth
    │   │       ForgotPassword.tsx
    │   │       Login.tsx
    │   │       OtpPage.tsx
    │   │       ResetPassword.tsx
    │   │       Signup.tsx
    │   │       
    │   ├───buyer
    │   │       Cart.tsx
    │   │       Checkout.tsx
    │   │       Home.tsx
    │   │       Invoice.tsx
    │   │       MyOrder.tsx
    │   │       ProductDetails.tsx
    │   │       ProductShow.tsx
    │   │       
    │   ├───seller
    │   │       AddProducts.tsx
    │   │       CreateShop.tsx
    │   │       Dashboard.tsx
    │   │       EditProduct.tsx
    │   │       MyShop.tsx
    │   │       Order.tsx
    │   │       Products.tsx
    │   │       
    │   ├───shared
    │   │       NotFound.tsx
    │   │       ScanQr.tsx
    │   │       
    │   └───user
    │           Profile.tsx
    │
               Diagram url = https://dbdiagram.io/d/667527b45a764b3c720d75da
               Product Url = https://drive.google.com/drive/folders/1fi_QTn6ANqPLUS6EytYp_PFJbFJZiJ0Q
*/
}

/*
// SELLER SIDE
Seller Dashboard =  Total Customer order, total Sales , Pending Order , Complete Order   
Seller Order = Status Update


// BUYER SIDE 
My Order = Status Update 



Seller Dashboard – high priority
New orders appear instantly
Order status updates reflect live
Inventory changes (optional)
Order Status Page (Customer) – high priority
Product Listing Page / Cart Page (Customer) – medium priority
Stock updates reflected live
“Add to Cart” or quantity changes automatically
Only if you want live featured products or live scan session updates
Home Screen / QR Scan / Analytics – optional


Step progress bar updates in real-time

Both User Ui glitch 
Issue Code Strucuture 
ReUsable 
Share app QR code 
Insert Proper Date 
Validation 
repeated code make it dynamic 

Seller
Dashboard:
          Pending orders 
Product :
         Update Product UI 
         base on order product was decrease stock  
Order:
      changes order status 
      
Buyer 
Home: 
      Filter shop base on Category
Cart:
      invoice show cart , buy 
      download invoice
Order:

//

Code Reusability:
Use custom hooks for repeated API calls and logic.
Shared utility functions: formatCurrency, formatDate, calculateTotals.

Performance:
Use lazy loading for images/products.
Use React.memo or useMemo/useCallback for expensive components.

Security:
Protect routes for seller vs buyer.
Sanitize inputs and validate data both backend/frontend.

Testing:
Unit tests for critical functions (calculations, status changes)
Component tests for reusable UI
Optional: e2e tests with Cypress for order flow


1. Home Screen (Customer)  - done 
Search bar (“Search products…”)
Categories grid:
Grocery
Dairy
Snacks
Drinks
Featured store section
“Scan QR to Start” button (large CTA button)

2.Product Listing Page - done
Product cards with:
Image
Name
Price
Add to Cart(+)
Category filter
Sticky bottom buy button

3. Cart Page - done 
Selected items list
Quantity update buttons (+ / -)
Total price summary
“Place Order” large CTA button

4. Order Status Page - done
Order Placed
Preparing
Completed
Green highlight for “Ready” status

5. Seller Dashboard - done 
New orders list
Order details section
Action buttons:
Stock decrease
Today Orders
Revenue

6. QR Scan Screen 
Large QR scanner frame at center
Text: “Scan Store QR to Start Ordering”
Minimal dark background focus mode
*/

/*
If seller has only one shop

You can do aggregation in MongoDB to combine steps:

const orders = await Order.aggregate([
  { $unwind: "$items" }, // break items array into multiple docs
  {
    $lookup: {
      from: "products",
      localField: "items.productId",
      foreignField: "_id",
      as: "productDetails"
    }
  },
  { $unwind: "$productDetails" },
  { $match: { "productDetails.shopId": new mongoose.Types.ObjectId(sellerId) } },
  { $sort: { createdAt: -1 } }
]);
*/

import { useEffect, useState } from "react";
import {
  FiShoppingBag,
  FiMapPin,
  FiCreditCard,
  FiTruck,
  FiCheckCircle,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { AppDispatch } from "../store";
import { getCartProductsAction } from "../store/feature/cart/cartAction";
import { createOrderAction } from "../store/feature/order/orderAction";

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cart, subtotal, deliveryFee, total } = useSelector(
    (state: any) => state.cart,
  );
  const buyNowProduct = useSelector(
    (state: any) => state.product.buyNowProduct,
  );
  console.log("buyNowProductNew", buyNowProduct);

  const isBuyNow = buyNowProduct ? true : false;
  console.log("CartItems", cart);

  const productToShow = isBuyNow
    ? [{ ...buyNowProduct.product, quantity: 1 }]
    : cart.map((item: { productId: any; quantity: any }) => ({
        ...item.productId,
        quantity: item.quantity,
      }));
  console.log("productToShoproductToShow", productToShow);

  const subtotalProduct = isBuyNow ? buyNowProduct.product.price : subtotal;
  const deliveryFeeProduct = isBuyNow ? buyNowProduct.deliveryFee : deliveryFee;
  const totalProduct = isBuyNow ? buyNowProduct.product.price : total;

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "Online">("COD");
  console.log("CheckoutPaymentMethod", paymentMethod);

  useEffect(() => {
    if (!isBuyNow) {
      dispatch(getCartProductsAction());
    }
  }, [dispatch, isBuyNow]);

  const orderItems = productToShow.map((item: any) => ({
    productId: item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image[0],
  }));

  console.log("OrderItems", orderItems);

  const handlePlaceOrder = async () => {
    try {
      if (!fullName || !phone || !city || !stateName || !address) {
        toast.error("Please fill all delivery fields");
        return;
      }
      if (orderItems.length === 0) {
        toast.error("Cart is empty");
        return;
      }
      const orderData = {
        items: orderItems,
        deliveryAddress: {
          fullName: fullName,
          phone: phone,
          city: city,
          state: stateName,
          address: address,
        },
        paymentMethod: paymentMethod,
        subtotal: subtotalProduct,
        deliveryFee: deliveryFeeProduct,
        total: totalProduct,
      };

      const res = await dispatch(createOrderAction(orderData));
      console.log("OrderResponse", res);

      if (paymentMethod === "COD") {
        toast("Order Place Successfully !!");
        navigate("/invoice", { state: orderData });
      } else {
        toast("Rediret to payment page");
        navigate("/online-payment");
      }
    } catch (error) {
      console.log("Order failed:", error);
      alert("Order failed, try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

        <p className="text-gray-500 mt-1">Complete your order securely</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gray-100 p-3 rounded-xl">
                <FiMapPin className="text-2xl text-gray-700" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Delivery Address
                </h2>

                <p className="text-sm text-gray-500">
                  Enter your shipping details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-200 rounded-xl p-3 outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="border border-gray-200 rounded-xl p-3 outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                type="text"
                placeholder="City"
                className="border border-gray-200 rounded-xl p-3 outline-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <input
                type="text"
                placeholder="State"
                className="border border-gray-200 rounded-xl p-3 outline-none"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
              />

              <textarea
                placeholder="Full Address"
                className="border border-gray-200 rounded-xl p-3 outline-none sm:col-span-2 h-28 resize-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gray-100 p-3 rounded-xl">
                <FiCreditCard className="text-2xl text-gray-700" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Method
                </h2>

                <p className="text-sm text-gray-500">Select payment option</p>
              </div>
            </div>

            {/* COD */}
            <div className="space-y-5">
              <div
                className={`border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer  ${
                  paymentMethod === "COD" ? "border-2 border-gray-500" : ""
                }`}
                onClick={() => setPaymentMethod("COD")}
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Cash on Delivery
                  </h3>
                  <p className="text-sm text-gray-500">
                    Pay after receiving order
                  </p>
                </div>
                <FiTruck className="text-2xl text-gray-700" />
              </div>

              {/* Online */}
              <div
                className={`border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer ${
                  paymentMethod === "Online" ? "border-2 border-gray-500" : ""
                }`}
                onClick={() => setPaymentMethod("Online")}
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Online Payment
                  </h3>
                  <p className="text-sm text-gray-500">
                    UPI / Card / Net Banking
                  </p>
                </div>
                <FiCreditCard className="text-2xl text-gray-700" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 h-fit sticky top-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gray-100 p-3 rounded-xl">
              <FiShoppingBag className="text-2xl text-gray-700" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Order Summary
              </h2>

              <p className="text-sm text-gray-500">Review your product</p>
            </div>
          </div>

          {/* PRODUCTS */}

          <div className="space-y-4 max-h-[330px] overflow-y-auto">
            {orderItems?.map((item: any) => {
              console.log("orderItemsItem", item);
              return (
                <div
                  key={item._id}
                  className="flex gap-4 border border-gray-100 rounded-2xl p-3"
                >
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="w-24 h-24 rounded-xl object-cover border"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {item?.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Qty : {item.quantity}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-3">
                      ₹{item?.price * item.quantity}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PRICE DETAILS */}
          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>

              <span>₹{subtotalProduct}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery Charges</span>

              <span>₹{deliveryFeeProduct}</span>
            </div>

            <div className="border-t pt-4 flex justify-between">
              <span className="text-lg font-semibold text-gray-900">Total</span>

              <span className="text-2xl font-bold text-gray-900">
                ₹{totalProduct}
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <button
            className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            onClick={handlePlaceOrder}
          >
            <FiCheckCircle className="text-xl" />
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
//  My sql 
{
  /*
  SQL 
PASSWORD :MySqlBVM007@
  SQL (STRUCTURED QUERY LANGUAGE)
SQL is used to interact with relational databases (RDBMS).
Used for CRUD operations: Create, Read, Update, Delete

DATABASE CONCEPTS
Database → collection of data
Table → rows + columns structure
Row → single record
Column → field/attribute

DATABASE COMMANDS (DDL)
CREATE DATABASE college;
USE college;
DROP DATABASE college;

TABLE CREATION
CREATE TABLE student (
id INT PRIMARY KEY,
name VARCHAR(50),
age INT NOT NULL
);

INSERT DATA (DML)
INSERT INTO student VALUES (1, 'AJEX', 26);
SELECT DATA (DQL)
SELECT * FROM student;
DATA TYPES (MYSQL)
CHAR(50) → fixed length string (0–255)
VARCHAR(50) → variable length string (0–255)
BLOB → large binary data
INT → integer number
TINYINT → -128 to 127 (signed), 0 to 255 (unsigned)
BIGINT → large integer values
BIT(1–64) → bit values (0 or 1)
FLOAT → approximate decimal (~7 digits precision)
DOUBLE → higher precision than FLOAT
BOOLEAN → 0 (false), 1 (true)
DATE → 1000-01-01 to 9999-12-31
YEAR → 1901 to 2155
SIGNED vs UNSIGNED
Signed → allows positive and negative values
Unsigned → only positive values
SQL COMMAND TYPES
DDL (Data Definition Language)
CREATE, ALTER, DROP, TRUNCATE
DQL (Data Query Language)
SELECT
DML (Data Manipulation Language)
INSERT, UPDATE, DELETE
DCL (Data Control Language)
GRANT, REVOKE
TCL (Transaction Control Language)
START TRANSACTION, COMMIT, ROLLBACK
  */
}





///////////
{
  /*
SQL 
PASSWORD :MySqlBVM007@
structure Query lanagauge
SQL PL used to interact with relational database
CRUD 
SEQL structure English query language 
setup Mysql 
what is tabel row , column 
create datatabsse drop databaase 
COMMAND ===
CREATE DATABASE college ,craete database 
DROP DATABASE college , remove database 
USE college , for use database

create table 
CREATE TABLE table (
    column_name1 datatype constraint
)

CREATE TABLE student (
   id INT PRIMARY KEY {unq key},
   name VARCHAR(50)
   age INT NOT NULL 
)

for instert data 
INSERT INTO student VALUES (1,"AJEX",26)


for print 
SELECT * FROM student 


DATA TYPE 
CHAR(50) it reserver whole 50 (size 0-255)
VARCHAR(50) it only reserve only needed (size 0-255)
BLOB store large binnary object (size 0-65535)
INT interger , number (??)
TINYINT interger (-128 to 127)
BIGINT interger for bigger values (??)
BIT store X-bit values , X can range from 1 to 64 
Example BIT(1) only one can store 0 , 1 
FLOAT decimal number - A FLOAT is a floating-point number used to store decimal values, including positive,negative number
DOUBLE - FLOAT but Big values 
BOOLEAN - 0(false) - 1(true) 
DATE - date format 1000-01-01 to 9999-12-31
YEAR - 4 digits 1901 to 2155

SQL DATATYPE 

Signed(both value -, +) & Unsigned (we already know +)

TINYINT UNSIGNED (0 to 255)
TINYINT (-128 to 127)

type of SQL Commands 
DDL (Data Defination Langauge) : create , alter , rename , truncate & drop 
DQL (Data Query language) : select
DML (Data Manipulation language) : insert,update, delete
DCL (Data control language ) : grant & revoke permission to user 
TCL () :start transatction , commit , rollback 

export const bulkUploadProducts = async (req: AuthRequest, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Excel file is required" });
    }

    const workBook = XLSX.read(file.buffer, { type: "buffer" });
    const sheetName = workBook.SheetNames?.[0];
    if (!sheetName) {
      return res.status(400).json({ message: "No sheet found in Excel file" });
    }

    const sheet = workBook.Sheets[sheetName];
    if (!sheet) {
      return res.status(400).json({ message: "Invalid sheet data" });
    }

    const data: any[] = XLSX.utils.sheet_to_json(sheet);
    if (!data.length) {
      return res.status(400).json({ message: "Empty Excel file" });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ message: "Shop id not found" });
    }

    const [shopRows]: any = await db.query("SELECT * FROM shops WHERE owner = ?", [userId]);
    const shop = shopRows[0];
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    let inserted = 0;
    let updated = 0;

    for (const item of data) {
      const [result]: any = await db.query(
        `INSERT INTO products (name, price, stock, category, subCategory, unit, description, image, shopId)
         VALUES (?,?,?,?,?,?,?,?,?)
         ON DUPLICATE KEY UPDATE
         price=VALUES(price),
         stock=VALUES(stock),
         category=VALUES(category),
         subCategory=VALUES(subCategory),
         unit=VALUES(unit),
         description=VALUES(description),
         image=VALUES(image)`,
        [item.name, item.price, item.stock, item.category, item.subCategory, item.unit, item.description, JSON.stringify(item.image ? [item.image] : []), shop.id]
      );
      result.affectedRows === 1 ? inserted++ : updated++;
    }

    return res.status(200).json({
      message: "Product Upload SuccessFully",
      inserted,
      updated,
      total: data.length,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Bulk upload failed",
    });
  }
};
*/
}







