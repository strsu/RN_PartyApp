import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export function openCamera() {
    let options = {
        storageOptions: {
            path: 'images',
            mediaType: 'photo',
        },
        includeBase64: true,
    };

    launchCamera(options, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if(response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if(response.customeButton) {
            console.log('User tapped custom button: ', response.customeButton);
        } else {
            //const source = {uri: 'data:image/jpeg;base64,' + response.base64};
            //setimageUri(response.assets[0].base64);
            console.log(response);
            return response.assets[0].base64;
        }
    });
};

export function openGallery() {
    let options = {
        storageOptions: {
            path: 'images',
            mediaType: 'photo',
        },
        includeBase64: true,
    };

    launchImageLibrary(options, response => {
        //console.log('Response = ', response);
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if(response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if(response.customeButton) {
            console.log('User tapped custom button: ', response.customeButton);
        } else {
            //const source = {uri: 'data:image/jpeg;base64,' + response.base64};
            //setimageUriGallary(...imageUriGallary, response.assets[0].base64);
            console.log(response.assets[0].height);
            console.log(response.assets[0].width);
            console.log(response.assets[0].fileSize);

            return response.assets[0].base64;
        }
    });
};