import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const modelPath = '/models/futuristic_room/scene.gltf'

export default function FuturisticRoom(props) {
    const groupRef = useRef(null)
    const { nodes, materials, scene } = useGLTF(modelPath);

    console.log('Nodes:', nodes);
    console.log('Materials:', materials);
    console.log('Scene:', scene);

    return (
        <group ref={groupRef} {...props} dispose={null}>
            <primitive object={scene}/>
        </group>
    );
}

useGLTF.preload(modelPath)