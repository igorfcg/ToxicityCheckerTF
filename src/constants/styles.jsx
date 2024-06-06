import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({

   container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1b1027'


    },
    content:{
        marginTop: 300,
    },  
    botao:{
        color: 'white',
        backgroundColor: '#99272d',
        borderRadius: 999,
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 60,
        fontSize: 30, 
        marginTop: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: -3, height: 5},
            shadowOpacity: 0.70,
           
    },
    placeholderText:{
        color:'white',
        fontSize: 40,
        marginBottom: 50,
    },
    input:{
        color: 'white',
        width: 300,
        height: 100,
        marginLeft: 60,
        borderRadius: 35,
        justifyContent: 'center',
        justifyItems: 'center',
        backgroundColor: '#280d3e',
        shadowColor: 'black',
        shadowOffset: {
            width: -3, height: 5},
            shadowOpacity: 0.70,
    },
    initialText:{
           
            color:'white',
            fontSize: 40,
            marginBottom: 50,
    },
    textoListaVazia:{
        color:'white',
        fontSize: 12,
        marginBottom: 50,
        marginTop: 10,
        marginLeft: 60,
    }

})