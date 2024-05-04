import { FaFolderOpen } from "react-icons/fa6";
import { useRef, useState } from "react";

import "../styles/MainPage.css";
import {useNavigate} from "react-router-dom";

function MainPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const onSubmit = (files: File[]) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/chat");
    }, 2000);
  }

  return (
    <div className={"d-flex vh-100"}>
      <div className="m-auto d-flex flex-column">
        <h1 className="fw-bold text-center upload-text">
          {loading ? "Finishing up..." : "Upload your files to start."}
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
