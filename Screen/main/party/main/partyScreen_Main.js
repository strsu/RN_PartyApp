import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
    BackHandler,
    ToastAndroid,
    Dimensions,
    RefreshControl
}
from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { useInfiniteQuery, useQuery } from 'react-query'
import axios from 'axios';

import useStore from '../../../../AppContext';

import {getData}        from "../../../../API/crud";
import GlobalStyles     from "../../globalStyles";
import {Header, Footer} from '../../Bar';

//import DropDownPicker from 'react-native-dropdown-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import { useIsFocused } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function errorScreen({navigation}, state) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={GlobalStyles.Header}>
                <Text style={styles.headerTitle}>울림</Text>
            </View>
            <View style={styles.main}>
                <Text>{state}</Text>
            </View>
            <Footer navigation={navigation} />
        </SafeAreaView>
    );
}


const boardCard = ({navigation, item}) => {
    // 여기서 if로 boardCard 구분 가능
    item = item["item"];
    return (
            <View style={styles.line}>
                <TouchableOpacity
                    //style={styles.col}
                    onPress={() => navigation.navigate('S_MainShow')}
                >

                    <View style={styles.lineTop}>
                        <Image
                            style={styles.lineTopImg}
                            source={{uri: item["images"]}}
                            onLoad={ () => {console.log('loaded', item["title"])}}
                            onLoadStart={ () => {console.log('loading', item["title"])}}
                        />
                    </View>

                    <View style={styles.lineBtm}>
                        <View style={styles.lineBtmTop}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "700",
                                }}
                            >{item["title"]}</Text>
                        </View>
                        <View style={styles.lineBtmMid}>
                            <Icon name="calendar" size={15} color="#BAE7AF" />
                            <Text
                                style={{
                                    marginLeft: 10,
                                }}
                            >{item["mdate"]}</Text>
                        </View>
                        <View style={styles.lineBtmBtm}>
                            <Icon name="location" size={15} color="#BAE7AF" />
                            <Text
                                style={{
                                    marginLeft: 10,
                                }}
                            >{item["place"]}</Text>
                        </View>
                    </View>
                    
                    
                </TouchableOpacity>
            </View>
        
    );
};

const boardCardFilter = () => {
    // https://www.npmjs.com/package/react-native-modal-dropdown
    const [filterValue, setfilterValue] = useState([
        '전체', 
        '후원', 
        '정기', 
        '번개', 
        '기타'
    ]);
    const [selectValue, setselectValue] = useState(0);
    return(
        <ModalDropdown 
            options={filterValue}
            onSelect={(val) => {
                setselectValue(val)
            }}
            defaultIndex={selectValue}
            defaultValue={filterValue[selectValue]}
            style={{
                height: 30,
                width: 130,
                backgroundColor: 'white',
                borderRadius: 10,
                elevation: 3,
                justifyContent: 'center',
                paddingLeft: 15,
                marginLeft: 15,
                marginTop: 10,
            }}
            textStyle={{
                fontSize: 15,
                fontWeight: "500",
            }}
            dropdownStyle={{
                width: 110,
                height: 40*3,
                fontSize: 13,
                fontWeight: "400",
            }}
            dropdownTextStyle={{
                borderBottomWidth: 1,

            }}
            dropdownTextHighlightStyle={{
                fontWeight: "700",
            }}
            showsVerticalScrollIndicator={true}
        >
            <View style={{
                flexDirection: 'row',
            }}>
                <View style={{
                    width: "80%",
                }}><Text>{filterValue[selectValue]}</Text></View>
                
                <View style={{
                    width: "20%",
                }}><Icon name="chevron-down" size={20} color="#BAE7AF"/></View>
                
            </View>
        </ModalDropdown>
    );
}

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function PartyScreen_Main({navigation, route}) {
    console.log('@PartyScreen_Main');
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(true);

    const [filterValue, setfilterValue] = useState(0);
    const [filter, setFilter] = useState([0, 1]);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    let url = "http://192.168.1.243:4000/mainParty/board/";

    let headerParams = {
        'navigation' : {navigation},
        'sort' : 0,
        'title' : 'main'
    }

    const setHideTabBar = useStore(state => state.setHideTabBar);


    /*useEffect(() => {
        // 부모 속성을 가져온 다음에 옵션으로 bar를 안 보이게 처리해야 한다.
        navigation.getParent().setOptions({
            headerShown: false
        });
    }, []);*/
    
    
    const isFocused = useIsFocused();
    React.useLayoutEffect(() => {
        if(isFocused) {
            setHideTabBar(false);
            navigation.getParent().getParent().setOptions({
                tabBarStyle: { display: "flex" }, //이건 탭을 삭제
            });
        }

    }, [isFocused]);

    /*useEffect(() => {
        const fetchBoard = async () => {
            try {
                const newDatas = await getData(url+"0/0");
                if(newDatas == 404 || newDatas == 500) {
                    setLoading(true);
                    setTimeout(fetchBoard, 500);
                } else {
                    setData((d) => {
                        setLoading(false);
                        setData(newDatas);
                    });
                }
            } catch (e) {
                console.log('ERROR!!, ', e);
                setTimeout(fetchBoard, 500);
            }
        };

        fetchBoard();
    }, [loading]);*/

    useQuery("mainParty", async () => {
        await getData(url+'0/0')
        .then(res => {
                setData(res);
            }
        );
    });

    /*const fetchProjects = ({ pageParam = 0 }) => {
        axios.get(url+"2/"+pageParam);
    };

    const {
        data2,
        error2,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery('projects', fetchProjects, {
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
      })
    
    console.log(data2)*/

    /*if (loading) return errorScreen({navigation}, "loading");
    if (error) return errorScreen({navigation}, error);
    if (!data) return errorScreen({navigation}, "null");*/

    const loadMoreOlderData = async () => {
        if (data[data.length-1]["index"] == undefined) return;

        const fetchBoard = async () => {
            try {
                const newDatas = await getData(url+"2/"+data[data.length-1]["index"]);
                if(newDatas == 404 || newDatas == 500) {
                    setError(true);
                    setTimeout(fetchBoard, 500);
                } else {
                    setData((d) => {
                        setError(false);
                        return d.concat(newDatas);
                    });
                }
            } catch (e) {
                console.log('ERROR!!, ', e);
                setTimeout(fetchBoard, 500);
            }
        };

        fetchBoard();
    };

    const loadMoreRecentData = async () => {
        console.log('!@',data[0]["index"]);
        const newDatas = await getData(url+"1/"+data[0]["index"]);
        if(newDatas == 404 || newDatas == 500) {
            setError("Server error")
        } else {
            setData((d) => {
                return newDatas.concat(d);
            });
        }
    };

    return (

        <SafeAreaView style={styles.container}>
            {/*<Header headerParams={headerParams}/>*/}
            
            <View style={styles.main}>
                
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    extraData={filterValue}
                    onEndReached={loadMoreOlderData}
                    ListHeaderComponent={boardCardFilter}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                    }
                    renderItem={item => {
                        if (filterValue == 0) return boardCard({navigation, item});
                    }}
                />
            </View>
            {/*<Footer navigation={navigation} />*/}
        </SafeAreaView>
    );
}

export default PartyScreen_Main;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    main: {
        flex: 1,
    },
    col : {
        flexDirection: 'column',
    },
    
    line: {
        height: parseInt(windowHeight/2.5),
        margin: 15,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 5,
    },
    lineTop : {
        height: "65%",
    },
    lineTopImg : {
        height: "100%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        resizeMode: 'cover',
    },
    lineBtm : {
        height: "35%",
        paddingLeft: 15,
    },
    lineBtmTop : {
        height: "50%",
        justifyContent: 'center',
    },
    lineBtmMid : {
        flexDirection: 'row',
        height: "25%",
        justifyContent: 'flex-start',
    },
    lineBtmBtm : {
        flexDirection: 'row',
        height: "25%",
        justifyContent: 'flex-start',
    },

  });