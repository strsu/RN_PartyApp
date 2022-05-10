import {
    StyleSheet,
    Dimensions,
    useWindowDimensions // Dimensions 대신에 이거 쓰라는데, Hook이라 글로벌로 못 씀.
    } from 'react-native';

//const { windowHeight, windowWidth } = useWindowDimensions();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GlobalStyles = StyleSheet.create({
    Header: {
        height: parseInt(windowHeight/15),
        backgroundColor: '#ebb728',
        flexDirection: 'row',
        alignItems: 'center'
    },
    HeaderText: {
        fontSize: 20,
        color: "black",
        fontWeight: '700',
        letterSpacing: 1,
        paddingLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
        //textAlign: 'center',
    },
    // https://oblador.github.io/react-native-vector-icons/
    HeaderIcon: {
        paddingLeft: 5,
    },
    HeaderBtn: {
        fontSize: 20,
        color: "#d4d6d5",
        fontWeight: '700',
        letterSpacing: 1,
        paddingLeft: 8,
    },
    HeaderSelected: {
        fontSize: 20,
        color: "black",
        fontWeight: '700',
        letterSpacing: 1,
        paddingLeft: 5,
    },
    HeaderAdmin: {
        position: 'absolute',
        right: 10,
    },
    HeaderAdminBtn: {
        fontSize: 20,
        color: "black",
        fontWeight: '700',
        paddingTop: 5,
        paddingLeft: 5,
    },
    Bar: {
        height: parseInt(windowHeight/15),
        flexDirection: "row",
        marginTop: 5,
        backgroundColor: '#faf9f5',
    },
    BarBtn: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GlobalStyles;