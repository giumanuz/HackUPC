import { FaFolderOpen } from "react-icons/fa6";
import React, { useRef, useState } from "react";

import "../styles/MainPage.css";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../axiosInstance.ts";
import LangContext from "../LangContext.ts";

function MainPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {locale} = React.useContext(LangContext)

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = (files: File[]) => {
    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    axiosInstance.post("/upload_file", formData).then(() => {
      navigate("/chat");
      setLoading(false)
    }).catch((error) => {
      console.error("Failed to upload file:", error);
      setLoading(false);
    });
  }

  return (
    <div className={"d-flex vh-100"}>
      <div className="m-auto d-flex flex-column">
        <h1 className="fw-bold text-center upload-text">
          {loading ? locale["loadingText"] : locale["initialText"]}
        </h1>
        {loading ? (
          <div className="spinner-border upload-loading-spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button className={"upload-file-btn"} onClick={handleClick}>
            <FaFolderOpen />
          </button>
        )}
        <input
          ref={fileInputRef}
          type={"file"}
          multiple
          className={"d-none"}
          onChange={(e) => onSubmit(Array.from(e.target.files || []))}
        ></input>
      </div>
    </div>
  );
}

export default MainPage;
