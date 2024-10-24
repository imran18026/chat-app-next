import firebaseApp from "@/config/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const UploadImageToFirebaeAndReturnUrl = async (file: any) => {
  try {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
