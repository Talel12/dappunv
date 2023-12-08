import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { PDFDocument, rgb } from "pdf-lib";
import axios from "axios";
import { updateStudent } from "../../redux/studentSlice";
import { createDiploma } from "../../redux/diplomaSlice";

const ListDiplome = () => {
  const diplomas = useSelector((store) => store?.diplomas?.list);
  const dispatch = useDispatch();

  // Function to modify the PDF by adding an image
  const addImageToPdf = async (pdfBuffer, imageUrl) => {
    try {
      // Load the existing PDF
      const pdfDoc = await PDFDocument.load(pdfBuffer);

      // Load and embed the image
      const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());
      const image = await pdfDoc.embedPng(imageBytes);

      // Get the first page of the PDF
      const page = pdfDoc.getPage(0);

      // Add the image to the center of the page
      const { width, height } = page.getSize();
      const imageSize = { width: 100, height: 100 }; // Adjust the size as needed
      const x = width - imageSize.width - 50;
      const y = 50;

      page.drawImage(image, {
        x,
        y,
        width: imageSize.width,
        height: imageSize.height,
      });

      // Save the modified PDF
      const modifiedPdfBytes = await pdfDoc.save();
      return modifiedPdfBytes;
    } catch (error) {
      console.error("Error adding image to PDF:", error);
      throw error;
    }
  };

  // Function to fetch a PDF from IPFS
  const fetchPdfFromIPFS = async (ipfsUrl) => {
    try {
      // Append a random query parameter to prevent caching
      const timestamp = Date.now();
      const urlWithQuery = `${ipfsUrl}?timestamp=${timestamp}`;

      const response = await fetch(urlWithQuery);
      const pdfBuffer = await response.arrayBuffer();
      return pdfBuffer;
    } catch (error) {
      console.error("Error fetching PDF from IPFS:", error);
      throw error;
    }
  };

  // Function to upload a modified PDF to IPFS
  const uploadModifiedPdfToIPFS = async ({ modifiedPdfBuffer, diplom }) => {
    const pinatakey = process.env.REACT_APP_PINATA_API_KEY;
    const pinatasecret = process.env.REACT_APP_PINATA_API_SECRET;
    try {
      const formData = new FormData();
      const blob = new Blob([modifiedPdfBuffer], { type: "application/pdf" });
      formData.append("file", blob, "modified-pdf.pdf");
      console.log(diplomas);
      // Replace 'your-ipfs-upload-url' with the actual IPFS upload URL
      const response = await axios
        .post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: pinatakey,
            pinata_secret_api_key: pinatasecret,
          },
        })
        .then((res) =>
          dispatch(createDiploma({ ...diplom, hash: res.data.Hash })).then(
            (res) => {
              console.log(res);
              dispatch(
                updateStudent({
                  studentId: diplom?.student?.id,
                  student: {
                    ...diplom.student,
                    diploma: { id: res?.payload?.id },
                  },
                })
              );
            }
          )
        );

      const ipfsHash = response.data.Hash;

      return ipfsHash;
    } catch (error) {
      console.error("Error uploading modified PDF to IPFS:", error);
      throw error;
    }
  };

  // Example usage
  const handleButtonClick = async ({ ipfsUrl, diplom }) => {
    const imageUrl =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Justin_Timberlake_signature.svg/320px-Justin_Timberlake_signature.svg.png";
    try {
      // Step 1: Fetch the PDF from IPFS
      const originalPdfBuffer = await fetchPdfFromIPFS(
        `https://ipfs.io/ipfs/${ipfsUrl}`
      );

      // Step 2: Add image to the PDF
      const modifiedPdfBuffer = await addImageToPdf(
        originalPdfBuffer,
        imageUrl
      );

      // Step 3: Upload the modified PDF to IPFS
      const ipfsHash = await uploadModifiedPdfToIPFS({
        modifiedPdfBuffer,
        diplom,
      });

      // Log the IPFS hash of the modified PDF
      console.log(
        "Modified PDF with added image uploaded to IPFS with hash:",
        ipfsHash
      );
    } catch (error) {
      console.error("Error processing PDF with added image:", error);
    }
  };

  const modifyDiplome = ({ id, hash, diplom }) => {
    handleButtonClick({ ipfsUrl: hash, diplom: diplom });
  };

  const deleteDiploma = (diplomaId) => {
    // Replace the following line with your actual delete logic
    console.log(`Deleting diploma with ID: ${diplomaId}`);
  };

  return (
    <div className="container">
      <h2 className="text-center"> List Diplomes </h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Id Diplome</th>
            <th>Id Etudiant</th>
            <th>N° CIN</th>

            <th></th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {diplomas.map((diploma) => (
            <tr key={diploma?.id}>
              <td>{diploma?.id}</td>
              <td>{diploma?.student?.id}</td>
              <td>{diploma?.student?.phoneNumber}</td>

              <td>
                {" "}
                <a
                  style={{ padding: "30px 50px" }}
                  class="cart-btn"
                  href={`https://ipfs.io/ipfs/${diploma?.hash}`}
                  target="_blanc"
                >
                  <i class="cart-icon ion-bag"></i>
                  <FontAwesomeIcon icon={faGraduationCap} size="1x" /> Affiche
                  le diplôme
                </a>
              </td>
              <td>
                <button
                  className={`btn btn-${
                    diploma?.signed ? "success" : "danger"
                  }`}
                  disabled={diploma?.signed}
                  onClick={() =>
                    modifyDiplome({
                      id: diploma?.id,
                      hash: diploma?.hash,
                      diplom: diploma,
                    })
                  }
                >
                  {diploma?.signed ? "Signé" : "Non Signé"}
                </button>
              </td>
              <td>
                <Link
                  className="btn btn-info"
                  to={`/edit-diploma/${diploma?.id}`}
                >
                  Modifier
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteDiploma(diploma?.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDiplome;
