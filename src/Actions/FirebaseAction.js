import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {app} from "../firebase";
export const uploadImage = async (file) => {
  try{
  const storage = getStorage(app);
    const storageRef = ref(storage, `EAD_Glammod/${generateUniqueIdentifier()}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    // console.log("storage",downloadURL);
  
    return downloadURL;
  } catch (error) {
    // console.error("Error updating product:", error.message);
    throw error;}

  
};

export const generateUniqueIdentifier = () => {
  const randomString = Math.random().toString(36).substring(2, 8);

  const timestamp = new Date().getTime();

  const uniqueIdentifier = `${randomString}_${timestamp}`;

  return uniqueIdentifier;
};
