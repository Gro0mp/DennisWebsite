import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import * as fp from 'fingerpose'
import Webcam from 'react-webcam';
import { drawHand, gestureDetection, knownGestures } from './utilities.js';

export default function VideoControls() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const [status, setStatus] = useState('Initializing...');
    const [error, setError] = useState(null);
    const [detectedGestures, setDetectedGestures] = useState([]);

    const detect = async (detector) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            try {
                // Make Detections
                const hands = await detector.estimateHands(video, {
                    flipHorizontal: false
                });

                if (hands.length > 0) {
                    console.log(`Detected ${hands.length} hand(s)`);

                    // Detect gestures for all hands
                    const gestures = await gestureDetection(hands, knownGestures);
                    if (gestures) {
                        console.log('Detected gestures:', gestures);
                        setDetectedGestures(gestures);
                    } else {
                        setDetectedGestures([]);
                    }
                } else {
                    setDetectedGestures([]);
                }

                // Draw all detected hands
                const ctx = canvasRef.current.getContext("2d");
                drawHand(hands, ctx);
            } catch (err) {
                console.error("Detection error:", err);
            }
            // return setDetectedGestures([setDetectedGestures.length]);
        }
    };

    useEffect(() => {
        const runHandPoseDetection = async () => {
            try {
                setStatus('Initializing TensorFlow...');

                // Wait for TensorFlow backend to be ready
                await tf.ready();
                console.log('TensorFlow backend:', tf.getBackend());

                setStatus('Loading MediaPipe Hands model...');

                const model = handPoseDetection.SupportedModels.MediaPipeHands;
                const detectorConfig = {
                    runtime: 'mediapipe',
                    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
                    maxHands: 2,
                    modelType: 'full'
                };

                const detector = await handPoseDetection.createDetector(model, detectorConfig);

                console.log("Hand pose model loaded with multi-hand detection.");
                setStatus('Model loaded - show your hands to the camera!');

                // Detect hands
                const interval = setInterval(() => {
                    detect(detector);
                }, 100);

                return () => clearInterval(interval);
            } catch (err) {
                console.error("Error loading model:", err);
                setError(`Failed to load hand pose model: ${err.message}`);
                setStatus('Error');
            }


        };

        runHandPoseDetection().then(r => {});
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center">Hand Pose Detection with Gestures</h1>

                <div className="mb-6">
                    <div className="flex items-center justify-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${error ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></div>
                        <span className="text-base text-gray-600">{status}</span>
                    </div>
                </div>

                {/* Gesture Display */}
                {detectedGestures.length > 0 && (
                    <div className="mb-4 flex gap-4 justify-center flex-wrap">
                        {detectedGestures.map((gesture, idx) => (
                            <div
                                key={idx}
                                className="p-4 bg-blue-100 border-2 border-blue-500 rounded-lg text-center min-w-[200px]"
                            >
                                <div className="text-sm font-semibold text-blue-600 mb-1">
                                    {gesture.handedness} Hand
                                </div>
                                <div className="text-5xl mb-2">{gesture.emoji}</div>
                                <div className="text-lg font-bold text-blue-800">
                                    {gesture.name.replace('_', ' ').toUpperCase()}
                                </div>
                                <div className="text-xs text-blue-600">
                                    Confidence: {gesture.confidence.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="relative w-full mx-auto" style={{ maxWidth: '960px', height: '720px' }}>
                    <Webcam
                        ref={webcamRef}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            transform: 'scaleX(-1)',
                            zIndex: 1,
                        }}
                    />

                    <canvas
                        ref={canvasRef}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 2,
                            transform: 'scaleX(-1)',
                        }}
                    />
                </div>

                <div className="mt-6 space-y-3">
                    <p className="text-base text-gray-600 text-center">
                        Show gestures with either or both hands: 👍 Thumbs Up or ✌️ Victory/Peace Sign
                    </p>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-3 justify-center mt-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-red-500 rounded"></div>
                            <span className="text-sm">Thumb</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                            <span className="text-sm">Index</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span className="text-sm">Middle</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-orange-500 rounded"></div>
                            <span className="text-sm">Ring</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-purple-500 rounded"></div>
                            <span className="text-sm">Pinky</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}