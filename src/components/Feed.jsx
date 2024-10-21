import axios from 'axios';
import { useEffect, useState } from 'react';

const Feed = () => {
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/feed')
        .then(feed => setFeed(feed.data))
        .catch(error => console.error(error));
    },[]);

    return (
        <>
            <table>
                <tbody>
                    {
                        feed.map(feed => {
                            return (
                                <tr>
                                    <td>{feed.profile}</td>
                                    <td>{feed.url}</td>
                                    <td>{feed.description}</td>
                                    <td><img src={feed.image_url || 'https://via.placeholder.com/150'} 
                                             alt={feed.description} 
                                             onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }}
                                             style={{height:"60px",borderRadius: '5px!important', overflow: 'hidden'}}    
                                        >
                                        </img>
                                    </td>
                                    <td>{feed.timestamp}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    );
}

export default Feed;