import { useEffect, useState } from "react";
import AddProducts from "./AddProducts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store";
import { getMyProductsAction } from "../../store/feature/products/productAction";
import { cardStyles } from "../../styles/card.styles";
import ProductCard from "../../components/product/ProductCard.tsx";
import { productStyles } from "../../styles/product.styles.ts";
import { updateProductAction } from "../../store/feature/products/productAction";
import { ProductCardSkeleton } from "../../components/common/ProductCardSkeleton.tsx";

const Products = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [editProduct, setEditProduct] = useState<any>(null);

  const { products, loading } = useSelector((state: any) => state.product);

  console.log("ProductsData", products?.data);

  useEffect(() => {
    dispatch(getMyProductsAction());
  }, []);

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
      <div
        className="products-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "28px",
          padding: "22px 26px",
          background: "#ffffff",
          borderRadius: "24px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 18px rgba(15,23,42,0.05)",
        }}
      >
        <div>
          <h1
            className="products-title"
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#1e293b",
              marginBottom: "6px",
            }}
          >
            My Products
          </h1>

          <p
            className="products-subtitle"
            style={{
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Manage your store products easily
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          style={{
            ...cardStyles.buttonPrimary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "14px 22px",
            borderRadius: "16px",
            fontSize: "15px",
            fontWeight: 600,
            minWidth: "170px",
            background: "#1e293b",
            boxShadow: "0 8px 20px rgba(30,41,59,0.14)",
          }}
        >
          <span style={{ fontSize: "20px", marginTop: "-2px" }}>+</span>
          Add Product
        </button>
      </div>

      {open && <AddProducts modelProps={{ onClose: handleClose }} />}

      {/* {loading && (
        <div className="empty-state">
          Loading products...
        </div>
      )} */}

      {products?.data?.length === 0 && (
        <div className="empty-state">No products found</div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "16px",
          alignItems: "start",
          justifyItems: "center",
        }}
      >
        {/* {products?.data?.map((product: any) => (
          <ProductCard
            key={product._id}
            product={product}
            onEdit={(product: any) =>
              setEditProduct(product)
            }
          />
        ))} */}
        {loading
          ? Array(products?.data?.length || 0)
            .fill(0)
            .map((_, idx) => <ProductCardSkeleton key={idx} />)
          : products?.data?.map((product: any) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={(product: any) => setEditProduct(product)}
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
            <div style={{ display: "flex", gap: 4 }}>
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
            </div>
            <div style={{ display: "flex", gap: 4 }}>
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
            </div>
            <div style={{ display: "flex", gap: 4 }}>
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
            </div>
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
              onClick={() => setEditProduct(null)}
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