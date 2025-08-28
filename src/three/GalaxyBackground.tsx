import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"

export default function GalaxyBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
    </div>
  )
}
