import React, { useState } from "react";

const IpfsPreviewer = () => {
  const [ipfsUrl, setIpfsUrl] = useState("");

  const handleUrlChange = (event) => {
    setIpfsUrl(event.target.value);
  };

  return (
    <div>
      <div
        style={{
          padding: 20,
          margin: "auto",
          display: "flex",
          gap: 10,
          alignItems: "center",
          width: "100%",
        }}
      >
        <label style={{ fontSize: 20 }} htmlFor="ipfsUrl">
          Code de Diplome pour Verifier:
        </label>
        <input
          style={{ padding: 10, width: "30%", fontSize: 20 }}
          type="text"
          id="ipfsUrl"
          value={ipfsUrl}
          onChange={handleUrlChange}
          placeholder="Enter Diplome code"
        />
      </div>

      {ipfsUrl && (
        <iframe
          title="IPFS Preview"
          src={`https://ipfs.io/ipfs/${ipfsUrl}`}
          width="100%"
          height="90%"
          frameBorder="0"
          allowFullScreen
          style={{
            border: "2px solid #ccc",
            minHeight: "300px",
            minWidth: "400px",
          }}
        />
      )}
    </div>
  );
};

export default IpfsPreviewer;
