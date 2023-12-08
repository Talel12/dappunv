import axios from "axios";
import { PDFDocument, rgb } from "pdf-lib";
import logoUrl from "../../assets/logo.png";

export const createToExportElement = async ({ student, university, hash }) => {
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([841.89, 595.276]); // A4 format in points
  const { height } = page.getSize();

  // Add the logo to the PDF
  const logoImageBytes = await axios.get(logoUrl, {
    responseType: "arraybuffer",
  });
  const logoImage = await pdfDoc.embedPng(logoImageBytes.data);
  page.drawImage(logoImage, {
    x: 50,
    y: height - 200,
    width: 150,
    height: 140,
  });
  // page.drawImage(logoImage, { x: 50, y: height - 80, width: 500, height: auto });

  // Apply styles
  const styles = {
    title: {
      fontSize: 26,
      color: rgb(0, 0, 0),
      fontWeight: 700,
      marginBottom: 50,
    },
    label: {
      fontSize: 16,
      color: rgb(0, 0, 0),
      fontWeight: 500,
      marginBottom: 10,
    },
    value: { fontSize: 14, color: rgb(0, 0, 0), marginBottom: 20 },
  };

  // University License Information
  const drawStyledText = (text, x, y, style) => {
    page.drawText(text, { x, y, ...style });
  };

  const drawUniversityLicenseInfo = () => {
    const startY = height - 180;

    drawStyledText("University License", 300, startY, styles.title);

    drawStyledText(`Student ID: ${student.id}`, 50, startY - 60, styles.label);
    drawStyledText(
      `Student Name:  ${student.nom} ${student.prenom}`,
      50,
      startY - 80,
      styles.label
    );
    drawStyledText(
      `Date of Birth:  ${formatTimestamp(student.dateNaissance)}`,
      50,
      startY - 100,
      styles.label
    );
    drawStyledText(
      `Phone Number:  ${student.phoneNumber}`,
      50,
      startY - 120,
      styles.label
    );
    drawStyledText(
      `University Name:  ${university.nom}`,
      50,
      startY - 140,
      styles.label
    );
    drawStyledText(
      `University Location:  ${university.lieu}`,
      50,
      startY - 160,
      styles.label
    );
    drawStyledText(
      `Director Name: ${university.directeurs.nom} ${university.directeurs.prenom}`,
      50,
      startY - 180,
      styles.label
    );
  };

  drawUniversityLicenseInfo();

  // Save the PDF as a Buffer
  const pdfBytes = await pdfDoc.save();

  // Upload the PDF to IPFS
  const pinatakey = process.env.REACT_APP_PINATA_API_KEY;
  const pinatasecret = process.env.REACT_APP_PINATA_API_SECRET;
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

  const formData = new FormData();
  formData.append(
    "file",
    new Blob([pdfBytes], { type: "application/pdf" }),
    "university_license.pdf"
  );

  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
      pinata_api_key: pinatakey,
      pinata_secret_api_key: pinatasecret,
    },
  };

  try {
    const res = await axios.post(url, formData, options);
    return res;
  } catch (error) {
    console.error("Error uploading PDF to IPFS:", error);
  }
};

// Call the function
// createToExportElement();
