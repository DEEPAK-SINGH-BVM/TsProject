import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import { getShopProductAction } from "../../store/feature/products/productAction";
import ProductCard from "../../components/product/ProductCard";
import { productStyles } from "../../styles/product.styles";
import { ProductCardSkeleton } from "../../components/common/ProductCardSkeleton";

const ProductShow = () => {
  const { shopId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  console.log("ProductshowShopId", shopId);
  const productState = useSelector((state: any) => state.product);
  console.log("ProductshowProductState", productState);

  const product = productState.products.data || [];
  const loading = productState.loading;

  console.log("productShop", product);

  useEffect(() => {
    if (shopId) {
      dispatch(getShopProductAction(shopId));
    }
  }, [shopId]);

  // if(loading){
  //   return <ProductCardSkeleton/>
  // }
  return (
    <>
      {product?.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <div
            style={{
              padding: "30px",
              borderRadius: "16px",
              background: "#f9fafb",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              textAlign: "center",
              width: "320px",
            }}
          >
            <h2>No Products Found</h2>

            <p>This shop has not added any products yet.</p>
          </div>
        </div>
      ) : (
        <div
          style={{
            ...productStyles.grid,
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {loading
            ? Array(product?.length || 0)
                .fill(0)
                .map((_, idx) => <ProductCardSkeleton key={idx} />)
            : product?.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
      )}
    </>
  );
};
export default ProductShow;
