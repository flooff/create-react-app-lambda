import React, {Suspense, useEffect, useRef} from 'react';
import {Canvas,useFrame,} from 'react-three-fiber'
import Header from './components/Header';
import './App.css'
import {Html, useGLTF} from '@react-three/drei'
import { Section } from './components/section';
import { directionalLight, } from 'three';

//State Page
import state from './components/state';

const Model = ({modelPath}) => {
  const gltf = useGLTF(modelPath, true)   
  return <primitive object={gltf.scene} dispose={null}   /> 
}
const Lights = () => {
  return (
   <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <spotLight intensity={1} position={[0, 100, 0]} />
   </> 
  )
}
const HTMLContent = ({ domContent ,children, modelPath, positionY}) =>{
  const ref = useRef()
  useFrame(() => (ref.current.rotation.y += 0.01))
  return(
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} scale={9} position={[0,-35,0]}>
          <Model modelPath={modelPath} />
        </mesh>
      <Html portal={domContent} fullscreen>
        {children}
      </Html>
      </group>
    </Section>
  )
}



function App() {
  const domContent = useRef()
  const scrollArea = useRef()
  const onScroll = (e) => (state.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current}),[])
  return( 
  <>
    <Header />
    <Canvas colorManagement camera={{position:[0,0,120],fov:70,}}>
      <Lights />
    <Suspense fallback={null}>
    <HTMLContent
      domContent={domContent}
       modelPath="/cyber.gltf"
       positionY={400}>
         <div className='container'>
            <h1 className='title'>Why Metacapsule ? </h1>
        </div>
      </HTMLContent>
      <HTMLContent
       domContent={domContent}
       modelPath="/mystic.gltf"
       positionY={200}>
         <div className='container'>
            <h1 className='title'>Stream Like Never Before</h1>
        </div>
      </HTMLContent>
      <HTMLContent
      domContent={domContent}
       modelPath="/halo.gltf"
       positionY={-370}>
         <div className='container'>
            <h1 className='title'>Philou </h1>
        </div>
      </HTMLContent>
    </Suspense>     
    </Canvas>
    <div className='scrollArea' ref={scrollArea} onScroll={onScroll}>
      <div style={{position: 'sticky', top:'0'}} ref={domContent}></div>
      <div style={{height:`${state.pages * 100}`}}></div>
    </div>
  </>);
}

export default App;
