import * as fp from 'fingerpose'

const fingerJoints = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
};

const fingerColors = {
    thumb: 'red',
    indexFinger: 'blue',
    middleFinger: 'green',
    ringFinger: 'orange',
    pinky: 'purple',
};


// Obtain known gestures
const knownGestures = [
    fp.Gestures.ThumbsUpGesture,
    fp.Gestures.VictoryGesture,
    createMiddleFingerGesture(),
];

const gestureStrings = {
    thumbs_up: '👍',
    victory: '✌️',
    middle_finger: '🖕',
}

function createMiddleFingerGesture() {
    const middleFingerGesture = new fp.GestureDescription('middle_finger');

    middleFingerGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl);
    middleFingerGesture.addDirection(
        fp.Finger.Middle,
        fp.FingerDirection.VerticalUp,
        1.0
    );
    middleFingerGesture.addDirection(
        fp.Finger.Middle,
        fp.FingerDirection.DiagonalUpLeft,
        0.9
    );
    middleFingerGesture.addDirection(
        fp.Finger.Middle,
        fp.FingerDirection.DiagonalUpRight,
        0.9
    );

    // Other fingers should be curled
    [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Ring, fp.Finger.Pinky].forEach(finger => {
        middleFingerGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
        middleFingerGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
    });
    return middleFingerGesture;
}

export const drawHand = (predictions, ctx) => {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Loop through each prediction (each hand)
    if (predictions.length > 0) {
        predictions.forEach((prediction) => {
            // Grab keypoints
            const keypoints = prediction.keypoints;

            // Draw connections between joints
            for (let finger in fingerJoints) {
                const joints = fingerJoints[finger];
                for (let j = 0; j < joints.length - 1; j++) {
                    const firstJoint = keypoints[joints[j]];
                    const secondJoint = keypoints[joints[j + 1]];

                    // Draw line
                    ctx.beginPath();
                    ctx.moveTo(firstJoint.x, firstJoint.y);
                    ctx.lineTo(secondJoint.x, secondJoint.y);
                    ctx.strokeStyle = fingerColors[finger];
                    ctx.lineWidth = 3;
                    ctx.stroke();
                }
            }

            // Draw keypoints (dots)
            for (let i = 0; i < keypoints.length; i++) {
                // Get x and y coordinates
                const x = keypoints[i].x;
                const y = keypoints[i].y;

                // Start drawing
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 2 * Math.PI);

                // Set dot color
                ctx.fillStyle = "white";
                ctx.fill();
            }
        });
    }
};

export const gestureDetection = async (predictions, gestures) => {
    const detectedGestures = [];

    if (predictions.length > 0) {
        const gestureEstimator = new fp.GestureEstimator(gestures);

        // Process each hand
        predictions.forEach((hand, index) => {
            if (hand.keypoints3D) {
                // Convert keypoints3D to the format fingerpose expects
                const landmarks = hand.keypoints3D.map(kp => [kp.x, kp.y, kp.z]);

                const est = gestureEstimator.estimate(landmarks, 7.5);

                if (est.gestures.length > 0) {
                    // Find gesture with the highest confidence
                    let result = est.gestures.reduce((p, c) => {
                        return (p.score > c.score) ? p : c;
                    });

                    if (result.score > 9.0) {
                        detectedGestures.push({
                            name: result.name,
                            emoji: gestureStrings[result.name] || '👋',
                            confidence: result.score,
                            handedness: hand.handedness || 'Unknown',
                            handIndex: index
                        });
                    }
                }
            }
        });
    }

    return detectedGestures.length > 0 ? detectedGestures : null;
}

export { knownGestures, gestureStrings };