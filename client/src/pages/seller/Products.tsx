import { useEffect, useState } from "react";
import AddProducts from "./AddProducts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store";
import { getMyProductsAction } from "../../store/feature/products/productAction";
import { cardStyles } from "../../styles/card.styles";
import ProductCard from "../../components/product/ProductCard.tsx";
import { productStyles } from "../../styles/product.styles.ts";
import { updateProductAction } from "../../store/feature/products/productAction";

const Products = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [editProduct, setEditProduct] =useState<any>(null);
  
  const { products, loading } = useSelector((state: any) => state.product);

  console.log("ProductsData", products?.data);

  useEffect(() => {
    dispatch(getMyProductsAction());
  }, [dispatch]);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    await dispatch(
      updateProductAction(
        editProduct._id,
        editProduct
      )
    );
  
    dispatch(getMyProductsAction());
  
    setEditProduct(null);
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h1 className="products-title">
            My Products
          </h1>

          <p className="products-subtitle">
            Manage your store products easily
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          style={cardStyles.buttonPrimary}
        >
          Add Product
        </button>
      </div>

      {open && (
        <AddProducts
          modelProps={{ onClose: handleClose }}
        />
      )}

      {/* {loading && (
        <div className="empty-state">
          Loading products...
        </div>
      )} */}

      {!loading &&
        products?.data?.length === 0 && (
          <div className="empty-state">
            No products found
          </div>
        )}

      <div
        style={{
          ...productStyles.grid,
          justifyContent: "center",
        }}
      >
        {products?.data?.map((product: any) => (
          <ProductCard
            key={product._id}
            product={product}
            onEdit={(product: any) =>
              setEditProduct(product)
            }
          />
        ))}
      </div>
      {editProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              width: "450px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <h2>Edit Product</h2>

            <input
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              type="text"
              placeholder="Name"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  name: e.target.value,
                })
              }
            />

            <input
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              type="number"
              placeholder="Price"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  price: e.target.value,
                })
              }
            />

            <input
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              type="number"
              placeholder="Stock"
              value={editProduct.stock}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  stock: e.target.value,
                })
              }
            />

            <input
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              type="text"
              placeholder="Category"
              value={editProduct.category}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  category: e.target.value,
                })
              }
            />

            <input
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              type="text"
              placeholder="Sub Category"
              value={editProduct.subCategory}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  subCategory: e.target.value,
                })
              }
            />

            <input
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              type="text"
              placeholder="Unit"
              value={editProduct.unit}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  unit: e.target.value,
                })
              }
            />

            <textarea
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                minHeight: "80px",
              }}
              placeholder="Description"
              value={editProduct.description}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  description: e.target.value,
                })
              }
            />

            <input
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              type="text"
              placeholder="Image URL"
              value={editProduct.image}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  image: [e.target.value],
                })
              }
            />

            <img
              src={editProduct.image}
              alt="preview"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <button
              style={{
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                background: "black",
                color: "white",
                cursor: "pointer",
              }}
              onClick={handleUpdate}
            >
              Update Product
            </button>

            <button
              style={{
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() =>
                setEditProduct(null)
              }
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;