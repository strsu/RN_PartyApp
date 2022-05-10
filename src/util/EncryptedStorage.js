import EncryptedStorage from 'react-native-encrypted-storage';

export async function storeUserSession(email, token) {
    try {
        await EncryptedStorage.setItem(
            "user_session",
            JSON.stringify({
                email : email,
                token : token,
                //username : "emeraldsanto",
                //languages : ["fr", "en", "de"]
            })
        );

        // Congrats! You've just stored your first value!
    } catch (error) {
        // There was an error on the native side
    }
}

export async function retrieveUserSession() {
    try {   
        
        return await EncryptedStorage.getItem("user_session")
        .then((res) => {
            return res;
        }).catch((err) => {
            return null;
        });

        /*const session = await EncryptedStorage.getItem("user_session");
    
        if (session !== undefined) {
            // Congrats! You've just retrieved your first value!
            return session;
        }*/
    } catch (error) {
        // There was an error on the native side
        return null;
    }
}

export async function removeUserSession() {
    try {
        await EncryptedStorage.removeItem("user_session");
        // Congrats! You've just removed your first value!
    } catch (error) {
        // There was an error on the native side
    }
}

export async function clearStorage() {
    try {
        await EncryptedStorage.clear();
        // Congrats! You've just cleared the device storage!
    } catch (error) {
        // There was an error on the native side
    }
}