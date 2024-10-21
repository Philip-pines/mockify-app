import React, { useState, useEffect } from 'react';
import { assets } from "./assets/assets";

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function WebPlayback(props) {

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(undefined);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK - Mockify',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ( state => {

                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });

            }));

            player.connect();

        };
    }, []);

    if (!is_active) { 
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <b> Instance not active. Transfer your playback using your app </b>
                    </div>
                </div>
            </>
            )
    } else {
        return (
            <>
                <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
                    <div className="hidden lg:flex items-center gap-4">
                        <img className="w-12 m-2" src={current_track.album.images[0].url} alt="" />
                        <div>
                            <p>{current_track.name}</p>
                            <p className="text-xs">{current_track.artists[0].name}</p>
                        </div>
                    </div>
                    <div className="flex flex-col item-center gap-1 m-auto">
                        <div className="flex gap-4">
                            <button onClick={() => { player.previousTrack() }} >
                                <img className="w-4 cursor-pointer" src={assets.prev_icon} alt="" />
                            </button>
                            <button onClick={() => { player.togglePlay() }} >
                                { is_paused ? <img className="w-4 cursor-pointer" src={assets.play_icon} alt="" /> : <img className="w-4 cursor-pointer" src={assets.pause_icon} alt="" />}
                            </button>             
                            <button onClick={() => { player.nextTrack() }} >
                                <img className="w-4 cursor-pointer" src={assets.next_icon} alt="" />
                            </button>
                        </div>
                        <div className="flex items-center gap-5">
                            {/* <p>1:06</p> */}
                            {/* <div className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
                                <hr className="h-1 border-none w-0 bg-green-800 rounded-full"/>
                            </div> */}
                            {/* <p>3:20</p> */}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default WebPlayback
