import React from 'react';
import {
    StyleSheet, 
    Text, 
    Button, 
    View,
    TouchableOpacity,
    Alert
} from 'react-native';

const onPress = function(param) {
    return 1;
}


function AuthScreen({navigation}) {
    return(
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity 
                    style={styles.authBtn}
                    onPress={onPress}
                >
                    <Text>학력 인증</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.authBtn}
                    onPress={onPress}
                >
                    <Text>직업 인증</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity 
                    style={styles.authBtn}
                    onPress={onPress}
                >
                    <Text>개인소득 인증</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.authBtn}
                    onPress={onPress}
                >
                    <Text>개인자산 인증</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity 
                    style={styles.authBtn}
                    onPress={onPress}
                >
                    <Text>자동차 인증</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.authBtn}
                    onPress={onPress}
                >
                    <Text>집안자산 인증</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                style={styles.nextBtn}
                onPress={() => navigation.navigate('PartyScreen_Main')}
            >
                <Text>다 음</Text>
            </TouchableOpacity>
        </View>
        
        
    );
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'skyblue'
        },
        row: {
            flex: 4,
            flexDirection: "row"
        },
        authBtn: {
            flex: 1,
            margin: 10,
            backgroundColor: 'white'
        },
        nextBtn: {
            flex: 1,
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'white'
        }
    }
);

export default AuthScreen;