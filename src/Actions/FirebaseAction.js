import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, `EAD_Glammod/${generateUniqueIdentifier()}`);

  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
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
