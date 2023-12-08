import React, { useEffect, useState } from "react";
import axios from "axios";
import { uploadFileToIPFS } from "../ipfs";
import getWeb3 from "../Ethereum";
import VerificationContratEtudiant from "../contracts/VerifierContratEtudiant.json";

// axios.interceptors.request.use(
//   (config) => {
//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3ODZjZGY3Ni04MzcxLTRhZjYtOTJlZS05MTRlOTZkODAzZDAiLCJlbWFpbCI6InRhbGVsYmVuYmVsZ2FjZW0xMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNDI3NDMxY2U0M2VlMzJmNTdjYWUiLCJzY29wZWRLZXlTZWNyZXQiOiI1ODE2NTNlNjJkMmIxZmJhN2Y1NDkxMmQ5ZDUzYTE0NDJmNDYxOGYxNmYzYTMzMTcyZjdmYWI4ZDFjMmJmMmMzIiwiaWF0IjoxNzAxNjE2MTc5fQ.xyceSPN8lM52XlcqrKLTT_EuV-rm88ELE0iv_eZ6xNE";
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const UploadFileToIPFSView = ({ account }) => {
  const [fileImg, setFileImg] = useState(null);
  const [hashImage, setHashImage] = useState("");

  const sendFileToIPFS = async (e) => {
    e.preventDefault();
    if (fileImg) {
      try {
        //   const formData = new FormData();
        //   formData.append("file", fileImg);

        const resFile = await uploadFileToIPFS(fileImg);
        //  await axios({
        //   method: "post",
        //   url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        //   data: formData,
        //   headers: {
        //     pinata_api_key: "427431ce43ee32f57cae", //`${process.env.REACT_APP_PINATA_API_KEY}`,
        //     pinata_secret_api_key:
        //       "581653e62d2b1fba7f54912d9d53a1442f4618f16f3a33172f7fab8d1c2bf2c3",
        //   },
        // });

        const ImgHash = `ipfs://${resFile}`;
        setHashImage(`${resFile}`);
        console.log(ImgHash);
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  // ------------------------------------------------------------------

  // -------------------------------------------------------------------

  return (
    <div>
      <form onSubmit={sendFileToIPFS} style={{ paddingTop: 50 }}>
        <input
          type="file"
          onChange={(e) => setFileImg(e.target.files[0])}
          required
        />
        <button type="submit">Mint NFT</button>
      </form>
      <a href={hashImage}>{hashImage}</a>
      <img src={`https://ipfs.io/ipfs/${hashImage}`} alt="image" />
    </div>
  );
};

// export default UploadFileToIPFSView;
