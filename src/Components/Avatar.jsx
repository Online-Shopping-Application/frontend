import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three'; // Import THREE for access to DoubleSide

const ShirtModel = ({ count }) => {
    // Correct the path for the assets
    const texture = useTexture('../../public/shirt-texture.jpg'); // Corrected path
    const texture2 = useTexture('../../public/shirt-texture2.jpg'); // Corrected path
    const { nodes, materials } = useGLTF('../../public/T_shirt_gltf.zip.gltf'); // Corrected path

    console.log(nodes); // Debugging: Check model structure

    return (
        <>
            {/* Render all available parts of the shirt, if there are multiple nodes */}
            <mesh geometry={nodes.Body_Front?.geometry} scale={[5, 5, 3]} position={[0, -1, 0]}>
                <meshStandardMaterial map={count > 0 ? texture2 : texture} side={THREE.DoubleSide} />
            </mesh>
            <mesh geometry={nodes.Body_Back?.geometry} scale={[5, 5, 3]} position={[0, -1, 0]}>
                <meshStandardMaterial map={count > 0 ? texture2 : texture} side={THREE.DoubleSide} />
            </mesh>
            {/* Render other parts if available, e.g., sleeves */}
            <mesh geometry={nodes.Sleeve_Left?.geometry} scale={[3, 3, 3]} position={[-1.5, -1, 0]}>
                <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
            </mesh>
            <mesh geometry={nodes.Sleeve_Right?.geometry} scale={[3, 3, 3]} position={[1.5, -1, 0]}>
                <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
            </mesh>
        </>
    );
};

export default function Avatar() {
    // Use useState to manage count
    const [count, setCount] = useState(0);

    const handleCount = () => {
        setCount(prevCount => prevCount + 1); // Update the count and trigger a re-render
        alert(count + 1); // Alert after updating the count
    };

    const handleReduceCount = () => {
        setCount(prevCount => prevCount - 1); // Update the count and trigger a re-render
        alert(count - 1); // Alert after updating the count
    };

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <Canvas camera={{ position: [5, 1, 5], fov: 50 }}>
                {/* Suspense ensures the model is loaded before rendering */}
                <Suspense fallback={<Html>Loading...</Html>}>
                    <ShirtModel count={count} />
                </Suspense>

                {/* OrbitControls for mouse interaction */}
                <OrbitControls />

                {/* Add a simple light source to make the model visible */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
            </Canvas>

            <button onClick={handleCount}>click</button>
            <button onClick={handleReduceCount}>Reduce click</button>
        </div>
    );
}
