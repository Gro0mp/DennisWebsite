import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { Leva, useControls } from 'leva';
import * as THREE from 'three';

import Model from './Model.jsx';
import ModernRoom from './ModernRoom.jsx';

/* ---------------- HDRI MAP ---------------- */

const backgrounds = new Map([
    ['night_street', '/hdris/cobblestone_street_night_4k.hdr'],
    ['outdoors', '/hdris/lilienstein_4k.hdr'],
]);

/* ---------- HDRI VISUAL SPHERE ---------- */

function HDRISphere({ y = -1.2, hdri }) {
    const texture = useLoader(RGBELoader, backgrounds.get(hdri));

    return (
        <mesh position={[0, y, 0]}>
            <sphereGeometry args={[60, 64, 64]} />
            <meshBasicMaterial
                map={texture}
                side={THREE.BackSide}
                toneMapped={false}
            />
        </mesh>
    );
}

/* ---------------- SCENE ---------------- */

export function Scene({ isSpeaking = false, pose = null, expressions = null }) {
    const {
        hdri,
        envIntensity,
        envBlur,
        sphereY,
        shadowOpacity,
        shadowBlur,
        shadowScale,
        camFov,
        modelY,
    } = useControls('Scene Controls', {
        hdri: {
            value: 'outdoors',
            options: {
                Outdoors: 'outdoors',
                NightStreet: 'night_street',
            },
        },

        envIntensity: { value: 1, min: 0, max: 5, step: 0.1 },
        envBlur: { value: 0.4, min: 0, max: 1, step: 0.01 },

        sphereY: { value: -2, min: -5, max: 0, step: 0.1 },

        shadowOpacity: { value: 0.35, min: 0, max: 1, step: 0.01 },
        shadowBlur: { value: 2.5, min: 0, max: 10, step: 0.1 },
        shadowScale: { value: 10, min: 1, max: 30, step: 1 },

        camFov: { value: 60, min: 30, max: 90, step: 1 },

        modelY: { value: 0, min: -1, max: 1, step: 0.01 },
    });

    return (
        <div className="scene-container">
            {/* LEVA GUI */}
            <Leva collapsed />

            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{
                    position: [0, 2, 3],
                    fov: camFov }}
            >
                {/* HDRI LIGHTING */}
                <Environment
                    files={backgrounds.get(hdri)}
                    intensity={envIntensity}
                    blur={envBlur}
                />

                {/* VISUAL HDRI */}
                <HDRISphere
                    key={hdri}
                    hdri={hdri}
                    y={sphereY}
                />

                {/* CONTACT SHADOWS */}
                <ContactShadows
                    position={[0, 0.01, 0]}
                    opacity={shadowOpacity}
                    scale={shadowScale}
                    blur={shadowBlur}
                    far={4}
                />

                {/* MODEL - Pass props from chatbot */}
                <Model
                    position={[0, modelY, 0]}
                    castShadow
                    isSpeaking={isSpeaking}
                    poseFromChat={pose}
                    morphsFromChat={expressions}
                />
                <ModernRoom />

                {/* CAMERA */}
                <OrbitControls
                    target={[0, 1, 0]}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 3}
                    enablePan={false}
                />
            </Canvas>
        </div>
    );
}