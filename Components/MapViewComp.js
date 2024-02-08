import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import SearchBar from './SearchBar';
import BottomSheetView from './BottomSheetView';

const MapViewComp = () => {
  return (
    <>
    <View style={styles.container}>
      <MapView 
      style={styles.map}
      provider={PROVIDER_GOOGLE} />
    </View>
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <BottomSheetView style={{
        flex: 1,
        backgroundColor: 'transparent'
      }}></BottomSheetView>
    </View>
    </>
  )
}

export default MapViewComp

const styles = StyleSheet.create({
    container: {
        flex: 6/7,
        borderRadius: 40,
        overflow: 'hidden',
        flexDirection: 'column',
        zIndex: 0,
    },
    map: {
        width: '100%',
        height: '100%'
    },
    
})

