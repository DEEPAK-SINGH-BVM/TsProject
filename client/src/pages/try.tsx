// // C:.
// // │   .env
// // │   .gitignore
// // │   eslint.config.js
// // │   index.html
// // │   package-lock.json
// // │   package.json
// // │   postcss.config.js
// // │   README.md
// // │   tailwind.config.js
// // │   tsconfig.app.json
// // │   tsconfig.app.tsbuildinfo
// // │   tsconfig.json
// // │   tsconfig.node.json
// // │   vite.config.ts
// // │
// // ├───dist
// // │   │   index.html
// // │   │
// // │   └───assets
// // │           index-BcVGrXLP.js
// // │
// // └───src
// //     │   App.tsx
// //     │   global.d.ts
// //     │   main.css
// //     │   main.tsx
// //     │   vite-env.d.ts
// //     │
// //     ├───api
// //     │       axios.ts
// //     │       endPoint.ts
// //     │
// //     ├───components
// //     │   ├───common
// //     │   │       Logout.tsx
// //     │   │
// //     │   ├───guard
// //     │   │       ProtectedRoute.tsx
// //     │   │       PublicRoute.tsx
// //     │   │       SellerShopRoute.tsx
// //     │   │
// //     │   └───layout
// //     │           AuthLayout.tsx
// //     │           BuyerLayout.tsx
// //     │           Navbar.tsx
// //     │           SellerLayout.tsx
// //     │
// //     ├───context
// //     │       AuthContext.tsx
// //     │
// //     ├───hook
// //     │       useAuth.ts
// //     │
// //     ├───pages
// //     │   │   try.tsx
// //     │   │
// //     │   ├───auth
// //     │   │       ForgotPassword.tsx
// //     │   │       Login.tsx
// //     │   │       OtpPage.tsx
// //     │   │       ResetPassword.tsx
// //     │   │       Signup.tsx
// //     │   │
// //     │   ├───buyer
// //     │   │       Cart.tsx
// //     │   │       Checkout.tsx
// //     │   │       Home.tsx
// //     │   │       ProductDetails.tsx
// //     │   │
// //     │   ├───seller
// //     │   │       AddProducts.tsx
// //     │   │       CreateShop.tsx
// //     │   │       Dashboard.tsx
// //     │   │       EditProduct.tsx
// //     │   │       MyShop.tsx
// //     │   │       Order.tsx
// //     │   │       Products.tsx
// //     │   │
// //     │   ├───shared
// //     │   │       NotFound.tsx
// //     │   │
// //     │   └───user
// //     │           Profile.tsx
// //     │
// //     ├───routes
// //     │       AppRoutes.tsx
// //     │
// //     ├───store
// //     │   │   index.ts
// //     │   │
// //     │   └───feature
// //     │       ├───auth
// //     │       │       action.ts
// //     │       │       constant.ts
// //     │       │       index.ts
// //     │       │       reducer.ts
// //     │       │
// //     │       └───shop
// //     │               action.ts
// //     │               constant.ts
// //     │               index.ts
// //     │               reducer.ts
// //     │
// //     ├───types
// //     │       auth.types.ts
// //     │
// //     └───utils

// //Backend
// // C:.
// // │   .env
// // │   package-lock.json
// // │   package.json
// // │   tsconfig.json
// // │
// // ├───dist
// // └───src
// //     │   index.ts
// //     │
// //     ├───config
// //     │       cloudinary.ts
// //     │       db.ts
// //     │
// //     ├───controllers
// //     │       shop.controllers.ts
// //     │       user.controllers.ts
// //     │
// //     ├───middlewares
// //     │       auth.middleware.ts
// //     │       multer.middleware.ts
// //     │       shop.middleware.ts
// //     │       validate.middleware.ts
// //     │
// //     ├───models
// //     │       shop.model.ts
// //     │       user.model.ts
// //     │
// //     ├───routes
// //     │       index.routes.ts
// //     │       shop.routes.ts
// //     │       user.routes.ts
// //     │
// //     ├───utils
// //     │       uploadToCloudinary.ts
// //     │
// //     └───validators
// //             auth.validator.ts
// //             shop.validator.ts

// // PS C:\E-Com\backend>

// // const validateFile = (file: File) => {
// //   if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
// //     return "Only Excel files allowed";
// //   }

// //   if (file.size > 2 * 1024 * 1024) {
// //     return "File size must be less than 2MB";
// //   }

// //   return null;
// // };


// import { useState } from "react";
// import * as XLSX from "xlsx";
// import { useDispatch, useSelector } from "react-redux";
// import { bulkUploadProductsAction } from "../../store/feature/product/action";

// const BulkUploadProducts = () => {
//   const dispatch = useDispatch<any>();

//   const { loading, result, error } = useSelector((state: any) => state.product);

//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<any[]>([]);
//   const [message, setMessage] = useState("");

//   //  file select
//   const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = e.target.files?.[0];
//     if (!selected) return;

//     setFile(selected);
//     setMessage("");

//     // preview excel
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = event.target?.result;
//       const workbook = XLSX.read(data, { type: "binary" });

//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];

//       const json = XLSX.utils.sheet_to_json(sheet);

//       setPreview(json.slice(0, 5)); // only first 5 rows
//     };

//     reader.readAsBinaryString(selected);
//   };

//   //  upload
//   const handleUpload = () => {
//     if (!file) {
//       setMessage("Please select file first");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     dispatch(bulkUploadProductsAction(formData));
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl space-y-6">
//       <h2 className="text-2xl font-semibold">Bulk Upload Products</h2>

//       {/* File Input */}
//       <input
//         type="file"
//         accept=".xlsx,.xls"
//         onChange={handleFile}
//         className="border p-2 w-full rounded"
//       />

//       {/* Preview */}
//       {preview.length > 0 && (
//         <div>
//           <h3 className="font-medium mb-2">Preview (first 5 rows)</h3>

//           <table className="w-full border text-sm">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2">Name</th>
//                 <th className="border p-2">Price</th>
//                 <th className="border p-2">Stock</th>
//               </tr>
//             </thead>

//             <tbody>
//               {preview.map((item: any, index: number) => (
//                 <tr key={index}>
//                   <td className="border p-2">{item.name}</td>
//                   <td className="border p-2">{item.price}</td>
//                   <td className="border p-2">{item.stock}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Upload Button */}
//       <button
//         onClick={handleUpload}
//         disabled={loading}
//         className="bg-black text-white px-4 py-2 rounded w-full"
//       >
//         {loading ? "Uploading..." : "Upload Products"}
//       </button>

//       {/* Success / Error */}
//       {result && (
//         <p className="text-green-600">
//           Success: {result.inserted} inserted, {result.updated} updated
//         </p>
//       )}

//       {error && <p className="text-red-500">{error}</p>}

//       {message && <p className="text-gray-600">{message}</p>}
//     </div>
//   );
// };

// export default BulkUploadProducts;