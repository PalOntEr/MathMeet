import { useEffect, useRef } from 'react';
import './VideoChat.css'
import { HubConnectionBuilder } from '@microsoft/signalr';

const VideoChat = () => {
    const connectionRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const hasReceivedOfferRef = useRef(false); // Change to useRef
    const targetConnectionIdRef = useRef(null); // Change to useRef
    const localConnectionIdRef = useRef(null); // Change to useRef
    const hasReceivedAnswerRef = useRef(false); // Change to useRef

    useEffect(() => {
        const connect = async () => {
            const newConnection = new HubConnectionBuilder()
                .withUrl("/VideochatHub")
                .withAutomaticReconnect()
                .build();

            newConnection.on("ReceiveOffer", handleReceiveOffer);
            newConnection.on("ReceiveAnswer", handleReceiveAnswer);
            newConnection.on("ReceiveIceCandidate", handleNewICECandidate);
            newConnection.on("CallStartedBy", (_callerConnectionId) => {
                console.log("Call Started By, ", _callerConnectionId);
                targetConnectionIdRef.current = _callerConnectionId; // Set ref value
                console.log("Sending to targetConnectionId:", targetConnectionIdRef.current);
            });

            await newConnection.start();

            const localConnection = newConnection.connectionId;
            localConnectionIdRef.current = localConnection; // Set ref value
            connectionRef.current = newConnection;
            console.log("Connected to SignalR.");
        };

        connect();
        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop(); // Or whatever cleanup is necessary
            }
        };
    }, []);

    const initializeMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideoRef.current.srcObject = stream;

            const pc = new RTCPeerConnection({
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
            });

            stream.getTracks().forEach(track => {
                console.log(`Sending Track - ID: ${track.id}, Kind: ${track.kind}, Muted: ${track.muted}`);
                pc.addTrack(track, stream)
            });

            pc.onicecandidate = (event) => {
                try {
                    if (event.candidate && connectionRef.current && targetConnectionIdRef.current) {
                        connectionRef.current.invoke("SendIceCandidate", JSON.stringify(event.candidate), targetConnectionIdRef.current);
                    }
                }
                catch (error) {
                    console.log("Error on Ice Candidate: ", error);
                }
            };

            pc.ontrack = (event) => {
                if (event.streams && event.streams[0]) {
                    remoteVideoRef.current.srcObject = event.streams[0];
                    console.log("Remote stream set:", remoteVideoRef.current.srcObject);
                    console.log("Remote stream received:", event.streams[0]);
                    console.log("Stream active:", event.streams[0].active);
                    const receivedTrack = event.track;
                    console.log("Received Track:", receivedTrack);
                    console.log("Is track enabled:", receivedTrack.enabled);
                    console.log("Is track muted:", receivedTrack.muted);
                    if (receivedTrack.kind === 'video' || receivedTrack.kind === 'audio') {
                        receivedTrack.enabled = true; // Unmute the track
                        console.log("Is track muted:", receivedTrack.muted);
                        console.log("Is track enabled:", receivedTrack.enabled);
                        console.log(`Unmuted ${receivedTrack.kind} track:`, receivedTrack.track);
                    }

                    // Set the remote video source to the received stream
                    if (event.streams && event.streams[0]) {
                        remoteVideoRef.current.srcObject = event.streams[0];
                        console.log("Remote stream set:", remoteVideoRef.current.srcObject);
                    }
                }
            };

            peerConnectionRef.current = pc;
            console.log("PeerConnection initialized", pc);
        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
    };

    const handleReceiveOffer = async (offer, senderConnectionId) => {
        if (senderConnectionId === localConnectionIdRef.current) return;

        if (!hasReceivedOfferRef.current) {
            hasReceivedOfferRef.current = true; // Set ref value

            console.log(senderConnectionId);
            // Step 2: Initialize media if peer connection doesn't exist
            if (!peerConnectionRef.current) {
                await initializeMedia();
            }

            // Step 3: Set the remote description with the caller's offer
            const parsedOffer = JSON.parse(offer);
            console.log("Offer Received:", parsedOffer);

            try {
                await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(parsedOffer));

                // Step 4: Create an answer
                const answer = await peerConnectionRef.current.createAnswer();

                // Step 5: Set local description with the created answer
                await peerConnectionRef.current.setLocalDescription(answer);

                // Step 6: Send the answer back to the caller using targetConnectionId
                if (targetConnectionIdRef.current) {
                    console.log(peerConnectionRef);

                    console.log("Answer sent to caller", answer);
                    connectionRef.current.invoke("SendAnswer", JSON.stringify(answer), targetConnectionIdRef.current);
                } else {
                    console.error("targetConnectionId not set for sending answer.");
                }
            } catch (error) {
                console.error("Error handling offer:", error);
            }
        }
    };

    const handleReceiveAnswer = async (answer, senderConnectionId) => {
        if (senderConnectionId === localConnectionIdRef.current) return;
        if (!hasReceivedAnswerRef.current) {
            hasReceivedAnswerRef.current = true;
            if (peerConnectionRef.current) {
                console.log("Answer Received", JSON.parse(answer));
                try {
                    const ParsedAnswer = JSON.parse(answer);
                    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(ParsedAnswer));
                console.log(peerConnectionRef);
                }
                catch (error) {
                    console.log("Chingas a tu madre cabron", error)
                }

            }
        }
    };

    const handleNewICECandidate = async (candidate) => {
        if (peerConnectionRef.current) { 
            try {
                const ParsedCandidate = JSON.parse(candidate);
                await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(ParsedCandidate));
            }
            catch (error) {
                console.log("CHINGASATUMADRE CABRON", error);
            }
        }
    };

    const startCall = async () => {
        if (connectionRef.current) {
            await connectionRef.current.invoke("StartCall");
        }

        console.log("Starting call.");
        await initializeMedia();

        if (peerConnectionRef.current && targetConnectionIdRef.current) {
            const offer = await peerConnectionRef.current.createOffer();
            await peerConnectionRef.current.setLocalDescription(offer);
            console.log("Offer to send:", offer);
            console.log("Target Connection to send: ", targetConnectionIdRef.current);
            // Include targetConnectionId when sending offer
            try {
                connectionRef.current.invoke("SendOffer", JSON.stringify(offer), targetConnectionIdRef.current);
            }
            catch (error) {
                console.log("Error sending the offer", error);
            }
        }
    };


    useEffect(() => {
        const currentVideo = remoteVideoRef.current;
        if (currentVideo && currentVideo.srcObject) {
            const mediaStream = currentVideo.srcObject; // Get the MediaStream from srcObject
            console.log("Current srcObject of remote video:", mediaStream);

            // Iterate over tracks in the MediaStream
            mediaStream.getTracks().forEach(track => {
                console.log(`Track ID: ${track.id}, Kind: ${track.kind}, Muted: ${track.muted} , enabled ${track.enabled}`);
            });
        }
    }, []);


    const refreshRemoteVideo = () => {
        if (remoteVideoRef.current) {
            const remoteTracks = remoteVideoRef.current.srcObject.getTracks();
            remoteTracks.forEach(track => {
                if (track.kind === 'video' || track.kind === 'audio') {
                    // Check if the track is muted and enable it
                    track.enabled = true; // Unmute the track
                    console.log("Track unmuted!");
                }
            });
        }
    };
    return (
        <div>
            <video className="w-full h-auto" ref={localVideoRef} autoPlay muted/>
            <video ref={remoteVideoRef} autoPlay playsInline/> 
            <button onClick={startCall} className="text-color">Start Call</button>
            <button onClick={refreshRemoteVideo} className="text-color">Refresh Remote Video</button>
        </div>
    );
};

export default VideoChat;
