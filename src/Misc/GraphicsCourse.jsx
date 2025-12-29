import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls, Sparkles} from "@react-three/drei";
import {useRef} from "react";


const Cube = ({position, size, color}) => {

    const ref = useRef(null); 

    return (
        <mesh ref={ref} position={position}>
            <boxGeometry args={size} />
            <meshLambertMaterial color={color} emissive={color} />

            <Sparkles count={100} scale={1} size={6} speed={0.002} noise={0.2} color={`pink`}/>
        </mesh>
    );
}



export const GraphicsCourse = () => {

    const cubes = [];
    for (let i = 0; i < 10; i++) {
        cubes.push(
            <Cube position={[0, i, 0]} size={[1, 1, 1]} color={`#468585`}/>
        )
    }

    return (
        <Canvas style={{height:'100vh',width:'100vw', display:'flex',justifyContent:'center', alignItems: 'center'}}>
            <OrbitControls enableZoom={true} enablePan></OrbitControls>
            <directionalLight position={[1, 1, 1]} intensity={10} color={0x9CDBA6}/>

            <color attach={`background`} args={[`#F0F0F0`]}></color>

            <Cube position={[0, 0, 0]} size={[1, 1, 1]} color={`#468585`}/>
            <Cube position={[0, 2, 0]} size={[1, 1, 1]} color={`#468585`}/>

            {cubes}



        </Canvas>
    );
}