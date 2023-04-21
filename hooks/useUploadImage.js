import { Alert } from 'react-native';
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

import { storage } from 'fitra/firebase.config';

/*
    PROPS 
- id - unique id from uuid for filename
- filepath - location in firebase storage (e.g transaction/) , dont forget "/" to identify it as a folder
- metadata - in case we need to add meta data in the image

returns 
 - image - the uri holder for displaying image
 - chooseImage - the function the picks an image
 - uploadImage - the function responsible for uploading the chosen image
 - filename - returns the filename from expo

*/

export default function useUploadImage(id, filepath, metadata = {}) {
    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [filename, setFilename] = useState("");

    const chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        let source = { uri: result.assets[0].uri };
        // console.log(result);
        if (!result.canceled) {
            const filename = source.uri.substring(source.uri.lastIndexOf("/") + 1);
            setImage(source);
            setFilename(filename);
        } else {
            console.log("Choosing an Image Failed");
            Alert.alert("Error", "Something went wrong when picking an image");
            setImage(null);
            setFilename("");
        }
    };

    const resetState = () => {
        setImage(null);
        setIsUploading(false);
        setFilename("");
    };

    const uploadImage = async () => {
        // START UPLOADING
        setIsUploading(true);
        // GET THE FILE BLOB
        const response = await fetch(image.uri);
        const fileBlob = await response.blob();
        // CREATE AN ID FOR THE COMMENT ID
        const fileId = id;
        // GET A REFERENCE IN THE STORAGE WITH FILEPATH (e.g transactions/) and the unique ID
        const storageRef = ref(storage, filepath + fileId);

        let fileExtension = image.uri.substring(image.uri.lastIndexOf('.') + 1);

        try {
            const snapshot = await uploadBytes(storageRef, fileBlob, { ...metadata, fileExtension });
            const imgUrl = await getDownloadURL(snapshot.ref);

            // RESET THE STATE
            resetState();
            Alert.alert("Upload Completed", "The image upload was successful.");
            // returns the image url string , the imgRef string and fileExtension (optional)
            return { imgUri: imgUrl, imgRef: `${filepath}${fileId}`, mediaType: fileExtension };
        } catch (err) {
            console.log(err);
            // console.log("UPLOAD FAILED");
            Alert.alert(
                'Error',
                "Something went wrong in uploading the image. Try again."
            );
            resetState();
        }
        // console.log(blob);
        // console.log("file:", filename);
    };

    return [image, chooseImage, uploadImage, filename];
}