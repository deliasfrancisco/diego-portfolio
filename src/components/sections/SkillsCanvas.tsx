'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import type { Skill } from '@/data/content'

interface SkillNodeProps {
  position: [number, number, number]
  skill: Skill
  hovered: string | null
  setHovered: (name: string | null) => void
  isMobile: boolean
}

function SkillNode({ position, skill, hovered, setHovered, isMobile }: SkillNodeProps) {
  const Icon = skill.icon
  const isHovered = hovered === skill.name
  const iconSize  = isMobile ? 24 : 36

  return (
    <Html position={position} center distanceFactor={8} style={{ pointerEvents: 'auto' }}>
      <div
        onMouseEnter={() => setHovered(skill.name)}
        onMouseLeave={() => setHovered(null)}
        className="skill-icon-wrapper"
        style={{ transform: isHovered ? 'scale(1.35)' : 'scale(1)' }}
      >
        <Icon
          size={iconSize}
          style={{
            color: skill.color,
            filter: isHovered ? `drop-shadow(0 0 8px ${skill.color})` : 'none',
            transition: 'filter 0.2s',
          }}
        />
        <span
          className="skill-icon-label"
          style={{ opacity: isHovered ? 1 : 0.7 }}
        >
          {skill.name}
        </span>
      </div>
    </Html>
  )
}

function RotatingGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15
      ref.current.rotation.x += delta * 0.03
    }
  })
  return <group ref={ref}>{children}</group>
}

interface SkillsCanvasProps {
  skills: Skill[]
  positions: [number, number, number][]
  hovered: string | null
  setHovered: (name: string | null) => void
  isMobile: boolean
}

export default function SkillsCanvas({ skills, positions, hovered, setHovered, isMobile }: SkillsCanvasProps) {
  const cameraZ = isMobile ? 14 : 11
  const fov     = isMobile ? 60 : 50

  return (
    <Canvas
      camera={{ position: [0, 0, cameraZ], fov }}
      gl={{ alpha: true, antialias: true }}
      className="bg-transparent w-full h-full max-w-full"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />

        <RotatingGroup>
          <lineSegments>
            <edgesGeometry args={[new THREE.IcosahedronGeometry(isMobile ? 2.8 : 3.6, 2)]} />
            <lineBasicMaterial color="#166534" transparent opacity={0.7} />
          </lineSegments>

          {skills.map((skill, i) => (
            <SkillNode
              key={skill.name}
              position={positions[i]}
              skill={skill}
              hovered={hovered}
              setHovered={setHovered}
              isMobile={isMobile}
            />
          ))}
        </RotatingGroup>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.6}
        />
      </Suspense>
    </Canvas>
  )
}
