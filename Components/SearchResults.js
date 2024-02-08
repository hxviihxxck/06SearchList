import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import fetchNearbyDetails from '../Backend/api'; // Assuming api.js is in the same directory

import * as Location from 'expo-location';


const SearchResults = ({ query }) => {
  const [results, setResults] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setError(null);
        
            try {


                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return; // Should return Text Component telling user to allow in settings
                }

                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);

                let lat = location?.coords?.latitude
                let lng =  location?.coords?.longitude

                // console.log(lat)
                // console.log(lng)

                const nearbyDetails = await fetchNearbyDetails(query, lat, lng);
                const filteredResults = nearbyDetails.filter(item => item.name !== 'Parking lot');
                const featuredResults = nearbyDetails.filter(item => item.rating >= 3.5);
                setResults(filteredResults);
                setFeatured(featuredResults)

            } catch (error) {
                setError(error.message || 'An error occurred.');
            } finally {
                setIsLoading(false);
            }
        }
    

    if (query) {
      fetchData();
    }
  }, [query]);

  // Render content based on loading, error, or results states
  return (
    <View style={styles.container}>
      {isLoading}
      {error && results.length == 0 && <Text style={styles.noResults}>No Results Found. 403.</Text>}
      {results.length > 0 && query.length > 0 && (
        <>
        <Text style={styles.header}>Featured</Text>
        <FlatList
            data={featured}
            renderItem={({ item }) => (
            <>
                <View style={styles.row}>
                    <Text style={styles.text} key={item.place_id}>
                    {item.name || item.text},
                        </Text>
                    <Text style={styles.secondary}>Rating: {item.rating || 0}</Text>
                </View>
            </>
            )}
            keyExtractor={(item) => item.place_id.toString()}
            ListEmptyComponent={() => <Text style={styles.header}>No results found.</Text>}
            
        />
        <Text style={styles.header}>Results</Text>
        <FlatList
            data={results}
            renderItem={({ item }) => (
            <>
                <View style={styles.row}>
                    <Text style={styles.text} key={item.place_id}>
                    {item.name || item.text},
                        </Text>
                    <Text style={styles.secondary}>Rating: {item.rating || 0}</Text>
                </View>
            </>
            )}
            keyExtractor={(item) => item.place_id.toString()}
            ListEmptyComponent={() => <Text style={styles.header}>No results found. 429.</Text>}
            
        />
        </> )}
        {results.length == 0 && query.length > 0 && (
            <Text style={styles.noResults}>No Results Found. 429.</Text>
        )}
    </View>
  );
};

export default SearchResults;


const styles = StyleSheet.create({
    container: {
        flex: 6/7,
        justifyContent: 'flex-end',
        backgroundColor: '#141414'
    },
    row: {
        padding: 15,
        marginBottom: 1,
        backgroundColor: '#212121',
        borderBottomColor: '#121212',
        borderBottomWidth: 1,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600'
    },
    secondary: {
        color: '#fff',
        fontSize: 10,
    },
    header: {
        color: '#fff',
        fontSize: 15,
        margin: 15,
        fontWeight: '600'
    },
    noResults: {
        flex: 1,
        color: '#fff',
        fontSize: 15,
        margin: 15,
        fontWeight: '600',
    }
})