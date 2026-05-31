import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAction,
  getBuyProductAction,
  getMyProductsAction,
} from "../../store/feature/products/productAction";
import { productStyles } from "../../styles/product.styles";
import { FaCartPlus, FaEdit, FaShoppingCart, FaTrash } from "react-icons/fa";
import { AppDispatch, RootState } from "../../store";
import { MdBolt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { addToCartAction } from "../../store/feature/cart/cartAction";
import React, { useCallback } from "react";

interface ProductProps {
  product: {
    _id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    subCategory: string;
    unit: string;
    description: string;
    image: string;
  };

  onEdit?: (product: any) => void;
}

const ProductCard = ({ product, onEdit }: ProductProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.user?.role);
  // console.log("ProductCart", role);
  console.log("ProductCartProduct", product);

  const handleDelete = useCallback(async () => {
    try {
      await dispatch(deleteProductAction(product._id));
      dispatch(getMyProductsAction());
    } catch (error) {
      console.log("Delete failed:", error);
    }
  }, [product._id]);

  /*
    const handleBuyCart = async() => {
    try {
      await dispatch(getBuyProductAction(product._id));
      navigate("/seller/checkout", { state: product }); 
      //  dispatch(getMyProductsAction());
     } catch (error) {
       console.log("Delete failed:", error);
     }
  };
  */

  const handleBuyCart = () => {
    navigate("/checkout", { state: product });
  };
  const handleEdit = useCallback(() => {
    onEdit?.(product);
  }, [onEdit]);

  const inStock = product.stock > 0;
  const isBuyer = role === "buyer";

  return (
    <div
      style={{
        ...productStyles.card,
        ...(isBuyer && {
          opacity: inStock ? 1 : 0.5,
          cursor: inStock ? "pointer" : "not-allowed",
        }),
      }}
    >
      <div style={productStyles.imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          style={productStyles.image}
        />

        <span
          style={{
            ...productStyles.stockBadge,
            ...(product.stock > 0
              ? productStyles.inStock
              : productStyles.outStock),
          }}
        >
          {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
        </span>
      </div>

      <div style={productStyles.content}>
        <div style={productStyles.badges}>
          <span style={productStyles.badge}>{product.category}</span>

          <span
            style={{
              ...productStyles.badge,
              ...productStyles.subBadge,
            }}
          >
            {product.subCategory}
          </span>
        </div>

        <h2 style={productStyles.productTitle}>{product.name}</h2>

        <p style={productStyles.description}>{product.description}</p>

        <div style={productStyles.details}>
          <div style={productStyles.detailBox}>
            <span style={productStyles.detailLabel}>Price</span>

            <h3 style={productStyles.price}>₹{product.price}</h3>
          </div>

          <div style={productStyles.detailBox}>
            <span style={productStyles.detailLabel}>Unit</span>

            <h4 style={productStyles.detailValue}>{product.unit}</h4>
          </div>
        </div>

        {/* ACTIONS */}
        {role === "seller" ? (
          <div style={productStyles.actions}>
            <button style={productStyles.editButton} onClick={handleEdit}>
              <FaEdit />
              Edit
            </button>

            <button style={productStyles.deleteButton} onClick={handleDelete}>
              <FaTrash />
              Delete
            </button>
          </div>
        ) : (
          <div style={productStyles.actions}>
            <button
              style={{
                ...productStyles.editButton,
                ...(isBuyer && {
                  cursor: inStock ? "pointer" : "not-allowed",
                }),
              }}
              disabled={isBuyer && !inStock}
              onClick={handleBuyCart}
            >
              <FaShoppingCart />
              Buy
            </button>

            <button
              style={{
                ...productStyles.editButton,
                ...(isBuyer && {
                  cursor: inStock ? "pointer" : "not-allowed",
                }),
              }}
              disabled={isBuyer && !inStock}
              onClick={() => dispatch(addToCartAction(product._id))}
            >
              <FaCartPlus />
              Add To Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
