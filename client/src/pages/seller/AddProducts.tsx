import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
// import {
// bulkUploadProductsAction,
// getMyProductsAction,
// } from "../../store/feature/unused/proAction";
import { AppDispatch } from "../../store";
import { cardStyles, overlay } from "../../styles/card.styles";
import { bulkUploadProductsAction, getMyProductsAction } from "../../store/feature/products/productAction";
import { toast } from "react-toastify";
type Props = {
  modelProps?: {
    onClose: () => void;
  };
};
const AddProducts = ({ modelProps }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, result, error } = useSelector((state: any) => state.product);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const [message, setMessage] = useState("");
  console.log("ProductsFile", file);
  console.log("ProductsMessage", message);
  console.log("fileInputRefProduct", fileInputRef);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      return setMessage("File not Select");
    }

    const formData = new FormData();
    formData.append("file", file);

    await dispatch(bulkUploadProductsAction(formData));
    await dispatch(getMyProductsAction());
    setFile(null);
    toast.success("Upload Product SuccessFully")
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    modelProps?.onClose();
  };

  return (
    <div style={overlay}>
      <div
        style={{
          ...cardStyles.card,
          width: "100%",
          maxWidth: "500px",
          borderRadius: "24px",
          padding: "28px",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              ...cardStyles.title,
              fontSize: "28px",
              marginBottom: "6px",
            }}
          >
            Upload Products
          </h2>

          <p style={cardStyles.subtitle}>
            Upload Excel file (.xlsx / .xls)
          </p>
        </div>

        <div
          style={{
            border: "2px dashed #d1d5db",
            borderRadius: "18px",
            padding: "24px",
            textAlign: "center",
            backgroundColor: "#f9fafb",
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFile}
            style={{
              width: "100%",
              cursor: "pointer",
            }}
          />

          {file && (
            <div
              style={{
                marginTop: "14px",
                padding: "10px 14px",
                backgroundColor: "#dbeafe",
                color: "#1d4ed8",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {file.name}
            </div>
          )}
        </div>

        {message && (
          <p
            style={{
              ...cardStyles.text,
              marginTop: "14px",
              color: "#dc2626",
            }}
          >
            {message}
          </p>
        )}

        {error && (
          <p
            style={{
              ...cardStyles.text,
              marginTop: "14px",
              color: "#dc2626",
            }}
          >
            {error}
          </p>
        )}

        {result && (
          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              borderRadius: "12px",
              backgroundColor: "#dcfce7",
              color: "#166534",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {result.inserted} inserted |{" "}
            {result.updated} updated
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "24px",
          }}
        >
          <button
            onClick={handleUpload}
            disabled={loading}
            style={{
              ...cardStyles.buttonPrimary,
              flex: 1,
              height: "48px",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

          <button
            onClick={() => modelProps?.onClose()}
            style={{
              ...cardStyles.buttonOutline,
              flex: 1,
              height: "48px",
            }}
          >
            Close
          </button>
        </div>
      </div>   
    </div>
  );
};

export default AddProducts;
