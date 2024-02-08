import { View, Text, TextInput, StyleSheet} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import SearchResults from './SearchResults';
import BottomSheet from '@gorhom/bottom-sheet';


const SearchBar = ({style}) => {

  const [text, setText] = React.useState(''); // State variable to store the input

  const ChangeText = (newText) => {
    setText(newText);
    // console.log('Search Query')
  };

  return (
    <>
    <View style={styles.container}>
        <View style={[styles.container3, style]}>
            <View style={styles.container2}>
                <TextInput
                placeholder='Search'
                style={styles.searchField}
                onChangeText={ChangeText}
                value={text}></TextInput>
                <Icon name='search' style={styles.icon} size={20}/>
            </View>
            <Text style={styles.cancel}>Cancel</Text>
        </View>
    </View>
    <SearchResults 
    style={styles.results}
    query={text}></SearchResults>
    </>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#141414',
        flex: 1/7,
        flexDirection: 'column',
        position: 'relative'
    },
    container3: {
        flexDirection: 'row',
        position: 'absolute',
        top: '40%', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    container2: {
        margin: 15,
        flex: 8/10,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#181818',
        color: '#d3d3d3',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 5,
    },
    cancel: {
        flex: 2/10,
        color: '#005b96',
        marginLeft: 15
    },
    text: {
        flex: 1,
        color: 'lightBlue',
        fontSize: 30,
        position: 'absolute',
        top: '20%'
    },
    searchField: {
        flex: 5/6,
        fontSize: 23,
        color: '#fff'
    },
    icon: {
        flex: 1/6,
        color: '#fff',
        textAlign: 'right',
        paddingRight: 10,
    }
})