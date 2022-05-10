import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MainPartyStyle = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      //backgroundColor: isDarkMode ? Colors.white : Colors.black,
    },
    main: {
        flex: 1,
        margin: 2,
    },
    col : {
        flex: 1,
        flexDirection: 'column',
    },
    
    line: {
        flex: 1,
        height: parseInt(windowHeight/4),
        margin: 5,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 5,
    },
    lineTop : {
        flex: 2,
        flexDirection: 'row',
    },
    lineTopImg : {
        flex: 1,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderRadius: 20,
        resizeMode: 'stretch',
    },
    content : {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    contentTop : {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contentTopRight: {
        flexDirection: 'row',
        paddingRight: 10,

    },  
    contentMid : {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
    },
    contentBtm : {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
    },

});

export default MainPartyStyle;