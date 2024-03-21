const {  getDownloadURL, uploadBytesResumable, ref } = require('firebase/storage');
const { firebaseStorage } = require('./config');

const insertFileintoFirebase = async (fileName, buffer, metadata) => {
    try {
        const storageRef = ref(firebaseStorage, fileName);
        const snapshot = await uploadBytesResumable(storageRef, buffer, metadata) 
        const downloadUrl = await getDownloadURL(snapshot.ref);
        if (downloadUrl) {
            return downloadUrl;
        } else {
            return null;
        }
    } catch (error) {
        console.log(`error while uploading file in fireabase`, error);
        return null;
    }
}

module.exports = { insertFileintoFirebase }