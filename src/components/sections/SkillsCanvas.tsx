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
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          transform: isHovered ? 'scale(1.35)' : 'scale(1)',
          transition: 'transform 0.2s',
          willChange: 'transform',
        }}
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
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            color: 'rgba(255,255,255,0.8)',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            opacity: isHovered ? 1 : 0.7,
            textShadow: '0 0 4px rgba(0,0,0,0.9)',
            transition: 'opacity 0.2s',
          }}
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
  const cameraZ = isMobile ? 12 : 9
  const fov     = isMobile ? 60 : 50

  return (
    <Canvas
      camera={{ position: [0, 0, cameraZ], fov }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%', maxWidth: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />

        <RotatingGroup>
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
