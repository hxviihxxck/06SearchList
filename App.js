import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import SearchBar from './Components/SearchBar';
import { Dimensions } from 'react-native'
import MapViewComp from './Components/MapViewComp';
import SearchResults from './Components/SearchResults';
import BottomSheetView from './Components/BottomSheetView';


let width = Dimensions.get('window').width; //full width
let height = Dimensions.get('window').height; //full height

export default function App() {

  return (
    <View style={styles.container} width={width} >
      {/* <SearchBar></SearchBar> */}
      <MapViewComp></MapViewComp>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
