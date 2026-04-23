client/
│── node_modules/
│── public/

│── src/
│   │── api/
│   │   └── axios.ts

│   │── components/
│   │   │── common/
│   │   │   └── Logout.tsx
│   │   │
│   │   │── guard/
│   │   │   ├── PrivateRoute.tsx
│   │   │   └── PublicRoute.tsx
│   │   │
│   │   └── layout/
│   │       └── Navbar.tsx

│   │── context/
│   │   └── AuthContext.tsx

│   │── hooks/
│   │   └── (future custom hooks)

│   │── pages/
│   │   │── auth/
│   │   │   ├── Login.tsx
│   │   │   └── Signup.tsx
│   │   │
│   │   │── buyer/
│   │   │   ├── Home.tsx
│   │   │   ├── ProductDetails.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── Checkout.tsx
│   │   │   ├── Orders.tsx
│   │   │   └── BuyerProfile.tsx
│   │   │
│   │   │── seller/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── AddProducts.tsx
│   │   │   ├── EditProduct.tsx
│   │   │   ├── Order.tsx
│   │   │   └── SellerProfile.tsx
│   │   │
│   │   └── shared/
│   │       └── NotFound.tsx

│   │── routes/
│   │   └── AppRoutes.tsx   (recommended)

│   │── types/
│   │   └── auth.types.ts

│   │── utils/
│   │   └── helpers.ts      (future)

│   │── App.tsx
│   │── main.tsx

│── .gitignore
│── package.json
│── package-lock.json
│── tsconfig.json
│── vite.config.ts
