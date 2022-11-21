import { Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';

import { storage } from 'fitra/firebase.config';

export default function useDownloadImage(filepath, photoId) {
    const [downloadedFile, setDownloadedFile] = useState(null);

    const fileRef = ref(storage, filepath + photoId);

    // console.log(filepath + photoId);

    useEffect(() => {
        const downloadImage = async () => {
            try {
                const downloaded = await getDownloadURL(fileRef);
                if (downloaded) {
                    setDownloadedFile(downloaded);
                    // console.log(downloaded);
                }

            } catch (err) {
                let message = "";
                switch (err.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        message = "File does not exist.";
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        message = "Permission denied. You don't have access to this file.";
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        message = "Upload unsuccessful.";
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        message = 'Unknown error occurred. Try again later.';
                        break;
                }

                Alert.alert(Error, message);
            };
        };

        if (filepath && photoId) {
            downloadImage();
        }

    }, []);

    if (!downloadedFile) return null;

    return downloadedFile;

}