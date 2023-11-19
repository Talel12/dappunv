import axios from 'axios';
//fonction utlise axios pour envoyer un fichier a un noeud IPFS via l'API PINATA CLOUD
export async function uploadFileToIPFS(file,pinatakey,pinatasecret){
    const fromData =new FormData();//Permet de creer facilement des donnees a envoyer via une requete HTTP
    const url ="https://api.pinata.cloud/pinFileToIPFS";//URL a laquelle la requete HTTP sera envoyee ; dans ce cas ill s'agit de l'API
    fromData.append("file",file);//le fichier est  passe en tant que parametre "file" dans une instance de FromData
    //la reponse de la requete renvoyee sous forme de json. qui contient le hachade ipfs du fichier
    const opts=JSON.stringify({
        cidVersion: 0,//cle:la version de la cle CID ( content ID) QUI est cle unique pour chaque fichier stocke sur IPFS
    });
FormData.append('pinataOptions', opts);
const options={
    maxBodyLenth:"Infinity",
    headers: {
        "Content-Type": `multipart/form-data;boundary=${formData._boundary}`, 
              'pinata_api_key': API_KEY,
              'pinata_secret_api_key': API_SECRET,
    Accept:'text/plain',

    }
}

//envoi de la requete HTTP POST en utilusant Axios avec le ficher et les options definis
const res =await axios.post(url,fromData,options);
return res.data.IpfsHash;
}
