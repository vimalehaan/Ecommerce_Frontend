import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {app} from "../firebase";
export const uploadImage = async (file) => {
  try{
    console.log("hi");
    const storage = getStorage(app);
    const storageRef = ref(storage, `EAD_Glammod/${generateUniqueIdentifier()}`);
    console.log("storage",storageRef);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log("storage",downloadURL);
  
    return downloadURL;
  } catch (error) {
    console.error("Error updating product:", error.message);
    throw error;}

  
};

export const generateUniqueIdentifier = () => {
  // Generate a random string of characters
  const randomString = Math.random().toString(36).substring(2, 8);

  // Get the current timestamp
  const timestamp = new Date().getTime();

  // Combine the random string and timestamp to create a unique identifier
  const uniqueIdentifier = `${randomString}_${timestamp}`;

  return uniqueIdentifier;
};
