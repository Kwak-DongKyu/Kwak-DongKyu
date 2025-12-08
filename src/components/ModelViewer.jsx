import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { STLLoader, OBJLoader, MTLLoader } from 'three-stdlib';
import { OrbitControls, Center, Html, useGLTF } from '@react-three/drei';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.error("ThreeJS Error caught:", error);
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ModelViewer Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ef4444' }}>
                    <p>⚠️ 3D Error</p>
                </div>
            );
        }
        return this.props.children;
    }
}

function Loader() {
    return <Html center><span style={{ color: 'white' }}>Loading Model...</span></Html>
}

function Model({ url, materialUrl }) {
    if (!url) return null; // Safety check

    const lowerUrl = url.toLowerCase();
    const isGLTF = lowerUrl.endsWith('.glb') || lowerUrl.endsWith('.gltf');
    const isOBJ = lowerUrl.endsWith('.obj');

    if (isGLTF) {
        const gltf = useGLTF(url);
        return <primitive object={gltf.scene} />;
    }

    if (isOBJ) {
        const materials = useLoader(MTLLoader, materialUrl || '');
        const obj = useLoader(OBJLoader, url, (loader) => {
            if (materials) {
                materials.preload();
                loader.setMaterials(materials);
            }
        });
        return <primitive object={obj} />;
    }

    // Fallback for STL
    const geometry = useLoader(STLLoader, url);
    return (
        <mesh geometry={geometry}>
            <meshStandardMaterial color="#38bdf8" roughness={0.5} metalness={0.5} />
        </mesh>
    );
}

const ModelViewer = ({ modelUrl, materialUrl }) => {
    return (
        <div className="model-viewer-wrapper">
            <ErrorBoundary>
                <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 150], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />

                    <Suspense fallback={<Loader />}>
                        <Center>
                            <Model url={modelUrl} materialUrl={materialUrl} />
                        </Center>
                    </Suspense>
                    <OrbitControls autoRotate />
                </Canvas>
            </ErrorBoundary>
        </div>
    );
};

export default ModelViewer;
