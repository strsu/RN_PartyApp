import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
}
from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GlobalStyles from "./globalStyles";

function Header_mainsub({navigation}, title) {
    if(title == "main") {
        return (
            <>
                <View style={GlobalStyles.Header}>
                    <TouchableOpacity>
                        <Text style={GlobalStyles.HeaderSelected}>{"Main"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PartyScreen_Sub')}
                    >
                        <Text style={GlobalStyles.HeaderBtn}>{"Sub"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={GlobalStyles.HeaderAdmin}
                        onPress={() => navigation.navigate('PartyScreen_MainWriting')}
                    >
                        <Icon style={GlobalStyles.HeaderAdminBtn} name="plus" size={25} color="black" />
                    </TouchableOpacity>
                </View>
            </>
        );
    } else{
        return (
            <>
                <View style={GlobalStyles.Header}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PartyScreen_Main')}
                    >
                        <Text style={GlobalStyles.HeaderBtn}>{"Main"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={GlobalStyles.HeaderSelected}>{"Sub"}</Text>
                    </TouchableOpacity>
                </View>
            </>
        );   
    }
}

function Header_back({navigation}) {
    return (
        <>
            <View style={GlobalStyles.Header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon style={GlobalStyles.HeaderIcon} name="chevron-left" size={25} color="black" />
                </TouchableOpacity>
            </View>
        </>
    );
}

function Header_Basic({navigation}, title) {
    return (
        <>
            <View style={GlobalStyles.Header}>
                <Text style={GlobalStyles.HeaderSelected}>{title}</Text>
            </View>
        </>
    );
}

export function Header({headerParams}) {
    if(headerParams['sort'] == 0) {
        return Header_mainsub(headerParams['navigation'], headerParams['title']);
    } else if(headerParams['sort'] == 1){
        return Header_Basic(headerParams['navigation'], headerParams['title']);
    } else if(headerParams['sort'] == 2){
        return Header_back(headerParams['navigation']);
    }
}

export function Footer({navigation}) {
    console.log('@Bar.js <Footer>');
    return (
        <>
            <View style={GlobalStyles.Bar}>
                <TouchableOpacity
                    style={GlobalStyles.BarBtn}
                    onPress={() => navigation.navigate('RecommandScreen')}
                >
                    <Icon name="heartbeat" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={GlobalStyles.BarBtn}
                    onPress={() => navigation.navigate('HistoryScreen')}
                >
                    <Icon name="history" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={GlobalStyles.BarBtn}
                    onPress={() => navigation.navigate('PartyScreen_Main')}
                >
                    <Icon name="th-large" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={GlobalStyles.BarBtn}
                    onPress={() => navigation.navigate('AnonymousScreen')}
                >
                    <Icon name="user-secret" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={GlobalStyles.BarBtn}
                    onPress={() => navigation.navigate('RateProfileScreen')}
                >
                    <Icon name="user" size={25} color="black" />
                </TouchableOpacity>
            </View>
        </>
    );
}

export function AnonyFooter({footerParams}) {
    console.log('@Bar.js <AnonyFooter>');
    const navigation = footerParams["navigation"];
    return (
        <>
            <View style={GlobalStyles.Bar}>
                <TouchableOpacity
                    style={[GlobalStyles.BarBtn, {flexDirection: 'row'}]}
                    //onPress={() => navigation.navigate('RecommandScreen')}
                >
                    <Icon name="heart" size={25} color="#F29396" />
                    <Text style={{marginLeft: 10,}}>{footerParams["like"]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[GlobalStyles.BarBtn, {flexDirection: 'row'}]}
                    //onPress={() => navigation.navigate('HistoryScreen')}
                >
                    <Icon name="paper-plane" size={25} color="#A9E1ED" />
                    <Text style={{marginLeft: 10,}}>{footerParams["replyCnt"]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={GlobalStyles.BarBtn}
                >
                </TouchableOpacity>
                <TouchableOpacity
                    style={GlobalStyles.BarBtn}
                >
                </TouchableOpacity>
                <TouchableOpacity
                    style={GlobalStyles.BarBtn}
                    //onPress={() => navigation.navigate('RateProfileScreen')}
                >
                    <Icon name="bell" size={25} color="#D05D5A" />
                </TouchableOpacity>
            </View>
        </>
    );
}
