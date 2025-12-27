import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    SoftShadows,
    Float,
    CameraControls,
    Sky,
    PerformanceMonitor
} from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { easing } from "maath";
import {Model as Room} from "../Room.jsx";
import { Leva } from "leva";

function Light() {
    const ref = useRef(null);
    useFrame((state, delta) => {
        easing.dampE(
            ref.current.rotation,
            [(state.pointer.y * Math.PI) / 50, (state.pointer.x * Math.PI) / 20, 0],
            0.2,
            delta
        );
    });
    return (
        <group ref={ref}>
            <directionalLight
                position={[5, 5, -8]}
                castShadow
                intensity={5}
                shadow-mapSize={2048}
                shadow-bias={-0.001}
            >
                <orthographicCamera
                    attach="shadow-camera"
                    args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
                />
            </directionalLight>
        </group>
    );
}

function Sphere({ color = "hotpink", floatIntensity = 15, position = [0, 5, -8], scale = 1 }) {
    return (
        <Float floatIntensity={floatIntensity}>
            <mesh castShadow position={position} scale={scale}>
                <sphereGeometry />
                <meshStandardMaterial color={color} roughness={1} />
            </mesh>
        </Float>
    );
}

export default function BackgroundRoom() {
    const [bad, set] = useState(false);
    const { debug, enabled, samples, ...config } = useControls({
        debug: false,
        enabled: false,
        size: { value: 35, min: 0, max: 100, step: 0.1 },
        focus: { value: 0.5, min: 0, max: 2, step: 0.1 },
        samples: { value: 16, min: 1, max: 40, step: 1 }
    });

    return (
        <>
            <div className={`scene-container`}>
                <Canvas shadows camera={{ position: [5, 2, 7], fov: 50 }} gl={{ alpha: true }}>
                    {/*{debug && <Perf position="bottom-left" />}*/}
                    {/*<PerformanceMonitor onDecline={() => set(true)} />*/}
                    {enabled && <SoftShadows {...config} samples={bad ? Math.min(6, samples) : samples} />}
                    <color attach="background" args={["transparent"]} />
                    <fog attach="fog" args={["#d0d0d0", 8, 35]} />
                    <ambientLight intensity={0.4} />
                    <Light />
                    <Room scale={0.5} position={[0, -1, 0]} />
                    <Sphere />
                    <Sphere position={[2, 4, -8]} scale={0.9} />
                    <Sphere position={[-2, 2, -8]} scale={0.8} />
                    <Sky inclination={0.52} scale={20} />
                </Canvas>
            </div>
            <Leva collapsed />
        </>
    );
}

