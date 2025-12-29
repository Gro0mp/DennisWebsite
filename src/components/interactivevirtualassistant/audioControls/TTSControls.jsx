import { useEffect, useRef } from 'react';

export default function TTSControls({ audioData, autoPlay = true, onPlayingStateChange }) {
    // Refs to manage audio element and state
    const audioRef = useRef(null);
    const processedAudioRef = useRef(null); // Track which audio we've already processed

    // Effect to handle audio data changes
    useEffect(() => {
        // If audio is not valid, exit.
        if (!audioData || audioData.length === 0) {
            return;
        }

        // Prevent processing the same audio data twice
        if (audioData === processedAudioRef.current) {
            console.log('Audio already processed, skipping...');
            return;
        }

        // Begin processing new audio data
        console.log('Processing new audio data...');
        processedAudioRef.current = audioData;

        try {
            // If audioData is a Base64 string, decode it
            let uint8Array;
            if (typeof audioData === 'string') {
                // Decode Base64 string to binary
                const binaryString = atob(audioData);
                uint8Array = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    uint8Array[i] = binaryString.charCodeAt(i);
                }
            } else {
                // If it's already an array
                uint8Array = new Uint8Array(audioData);
            }

            console.log('Creating audio blob, size:', uint8Array.length, 'bytes');

            // Create blob from bytes
            const audioBlob = new Blob([uint8Array], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);

            // Debug log
            console.log('Audio URL created:', audioUrl);

            // Clean up previous audio if it exists
            if (audioRef.current) {
                console.log('Cleaning up previous audio');
                audioRef.current.pause();
                audioRef.current.onplay = null;
                audioRef.current.onended = null;
                audioRef.current.onpause = null;
                audioRef.current.onerror = null;
                URL.revokeObjectURL(audioRef.current.src);
            }

            // Create and play new audio
            const audio = new Audio(audioUrl);
            audioRef.current = audio;

            audio.onloadeddata = () => {
                console.log('Audio loaded successfully, duration:', audio.duration);
            };

            audio.onplay = () => {
                console.log('Audio started playing');
                if (onPlayingStateChange) {
                    onPlayingStateChange(true);
                }
            };

            audio.onended = () => {
                console.log('Audio playback finished');
                URL.revokeObjectURL(audioUrl);
                if (onPlayingStateChange) {
                    onPlayingStateChange(false);
                }
            };

            audio.onpause = () => {
                // Only notify if audio naturally paused (not during cleanup)
                if (audio.currentTime > 0 && audio.currentTime < audio.duration) {
                    console.log('Audio paused at', audio.currentTime);
                    if (onPlayingStateChange) {
                        onPlayingStateChange(false);
                    }
                }
            };

            audio.onerror = (e) => {
                console.error('Error playing audio:', e);
                console.error('Audio error details:', audio.error);
                URL.revokeObjectURL(audioUrl);
                if (onPlayingStateChange) {
                    onPlayingStateChange(false);
                }
            };

            // Auto-play if enabled
            if (autoPlay) {
                // Small delay to ensure everything is set up
                setTimeout(() => {
                    audio.play()
                        .then(() => {
                            console.log('Audio playing...');
                        })
                        .catch(err => {
                            console.error('Failed to auto-play audio:', err);
                            if (onPlayingStateChange) {
                                onPlayingStateChange(false);
                            }
                            // Browser might block autoplay, user needs to interact first
                        });
                }, 100);
            }

        } catch (error) {
            console.error('Error processing audio data:', error);
            if (onPlayingStateChange) {
                onPlayingStateChange(false);
            }
        }

    }, [audioData]); // Only depend on audioData, not autoPlay or callback

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            console.log('TTSControls unmounting, cleaning up audio');
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.onplay = null;
                audioRef.current.onended = null;
                audioRef.current.onpause = null;
                audioRef.current.onerror = null;
                if (audioRef.current.src) {
                    URL.revokeObjectURL(audioRef.current.src);
                }
            }
            if (onPlayingStateChange) {
                onPlayingStateChange(false);
            }
        };
    }, []);

    // This component doesn't render anything visible
    // It just handles audio playback in the background
    return null;
}