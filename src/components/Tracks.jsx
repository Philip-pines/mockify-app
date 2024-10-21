import axios from 'axios';
import { useEffect, useState } from 'react';

// const Tracks = () => {
//     const [tracks, setTracks] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/tracks')
//         .then(tracks => setTracks(tracks.data))
//         .catch(error => console.error(error));
//     },[]);

//     return (
//         <>
//             <table>
//                 <tbody>
//                     {
//                         tracks.map(feed => {
//                             return (
//                                 <tr>
//                                     <td>{feed.name}</td>
//                                     <td>{feed.uri}</td>
//                                     <td>{feed.description}</td>
//                                     <td><img src={feed.image || 'https://via.placeholder.com/150'} 
//                                              onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }}
//                                              style={{height:"60px",borderRadius: '5px!important', overflow: 'hidden'}}    >
//                                         </img>
//                                     </td>
//                                 </tr>
//                             );
//                         })
//                     }
//                 </tbody>
//             </table>
//         </>
//     );
// }

const Tracks = (props) => {
    const [tracks, setTracks] = useState([]);

    // Fetch tracks from your API
    useEffect(() => {
        axios.get('http://localhost:5000/api/tracks')
            .then(response => setTracks(response.data))
            .catch(error => console.error(error));
    }, []);

    // Function to play a track using the Spotify Web API
    const playTrack = async (uri) => {
        try {
            const response = await axios.put(
                'https://api.spotify.com/v1/me/player/play',
                {
                    uris: [uri],
                    offset: {
                        position: 0,
                    },
                    position_ms: 0,
                },
                {
                    headers: {
                        Authorization: `Bearer ${props.token}`,  // Use the token passed as a prop
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Track played successfully', response);
        } catch (error) {
            console.error('Error playing track:', error);
        }
    };

    return (
        <>
            <table>
                <tbody>
                    {tracks.map(track => (
                        <tr key={track.uri}>
                            <td>{track.name}</td>
                            <td>{track.uri}</td>
                            <td>{track.description}</td>
                            <td>
                                <img 
                                    src={track.image || 'https://via.placeholder.com/150'} 
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }}
                                    style={{ height: "60px", borderRadius: '5px', overflow: 'hidden' }}
                                    alt={track.name}
                                />
                            </td>
                            <td>
                                <button onClick={() => playTrack(track.uri)}>Play</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};


export default Tracks;