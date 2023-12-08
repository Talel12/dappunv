import axios from "axios";
//fonction utlise axios pour envoyer un fichier a un noeud IPFS via l'API PINATA CLOUD
export async function uploadFileToIPFS(file) {
  const pinatakey = process.env.REACT_APP_PINATA_API_KEY;
  const pinatasecret = process.env.REACT_APP_PINATA_API_SECRET;
  let formData = new FormData(); //Permet de creer facilement des donnees a envoyer via une requete HTTP
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS"; //URL a laquelle la requete HTTP sera envoyee ; dans ce cas ill s'agit de l'API
  formData.append("file", file); //le fichier est  passe en tant que parametre "file" dans une instance de FromData
  //la reponse de la requete renvoyee sous forme de json. qui contient le hachade ipfs du fichier
  const opts = JSON.stringify({
    cidVersion: 0, //cle:la version de la cle CID ( content ID) QUI est cle unique pour chaque fichier stocke sur IPFS
  });
  formData.append("pinataOptions", opts);
  console.log(pinatakey);
  const options = {
    maxBodyLenth: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
      pinata_api_key: pinatakey,
      pinata_secret_api_key: pinatasecret,
      Accept: "text/plain",
    },
  };

  //envoi de la requete HTTP POST en utilusant Axios avec le ficher et les options definis
  const res = await axios.post(url, formData, options);
  return res.data.IpfsHash;
}
