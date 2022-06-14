import React, {useState} from 'react';
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions
}
from 'react-native'

import Icon from 'react-native-vector-icons/Octicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MainPartyPaymentPresenter(props) {
    console.log('@MainPartyPaymentPresenter');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
            </View>
        </SafeAreaView>
    );
}

export default MainPartyPaymentPresenter;

const Timeline = ({props}) => {
    let timeline = [];
    for (const [key, value] of Object.entries(props.state.timeline).reverse()) {
        timeline.push(
            <TouchableOpacity style={{
                padding: 10,
            }}
                key={key}
                onPress={() => props.state.setSelectedTimeline(key)}
            >

                <View style={{
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    backgroundColor: props.state.selectedTimeline == key ? 'powderblue' : 0,
                }}>
                    <View style={{
                        //flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'deepskyblue',
                        padding: 5,
                    }}>
                        <Text style={{
                            flex: 1,
                            marginLeft: 5,
                            fontSize: 17,
                            fontWeight: '700',
                            color: 'black',
                        }}>{key}</Text>

                        <Text style={{
                            flex: 1,
                            fontSize: 14,
                            fontWeight: '500',
                            color: 'black',
                            textAlign: 'right',
                        }}>{'신청마감: ' + value.deadline}</Text>
                    </View>


                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 2,
                    }}>
                        <IconEntypo name="price-tag" size={15} />
                        <Text style={{
                            marginLeft: 5,
                        }}>{"남: " + value.pricem}</Text>
                        <Text style={{
                            marginLeft: 5,
                        }}>{"여: " + value.pricew}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginLeft: 4,
                        marginTop: 2,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <Icon name="dot-fill" size={15} color="blue" />
                                <Text style={{
                                    marginLeft: 5,
                                }}>{value.signm + "/" + value.attendm + ' (' + value.minagem + '~' + value.maxagem + ')'}</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginLeft: 10,
                            }}>
                                <Icon name="dot-fill" size={15} color="red" />
                                <Text style={{
                                    marginLeft: 5,
                                }}>{value.signw + "/" + value.attendw + ' (' + value.minagew + '~' + value.maxagew + ')'}</Text>
                            </View>
                        </View>

                        <View style={{
                            marginRight: 5,
                        }}>
                            <TouchableOpacity>
                                <Text>참석명단 확인</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        );
    }

    return(
        <View>
            {timeline}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      //backgroundColor: isDarkMode ? Colors.white : Colors.black,
    },
    main: {
        flex: 1,
        margin: 2,
    },
});