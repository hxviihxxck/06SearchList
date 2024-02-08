// api.js (or any suitable name)
import axios from 'axios'

const fetchNearbyDetails = async (query, lat, lng) => {
    
    const options = {
      method: 'GET',
      url: 'https://map-places.p.rapidapi.com/nearbysearch/json',
      params: {
        location: `${lat},${lng}`, 
        radius: '1500',
        keyword: query,
        type: 'parking'
      },
      headers: {
        'X-RapidAPI-Key': '3f9ce5ef09msh1369f52d3d998bbp1371b7jsn7ae04729fbbd',
        'X-RapidAPI-Host': 'map-places.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        // console.log(response.data);
        const data = response.data.results.map((item) => ({
            ...item,
            id: item.place_id, // Assigning place_id as id
          }));

        return data
    } catch (error) {
        console.error(error);
    }
}

export default fetchNearbyDetails