'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xf9f9f9);
    mount.appendChild(renderer.domElement);

    // Crear partículas
    const particleCount = 3000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({ color: 0x3498db, size: 0.02 });

    const positions = [];
    for (let i = 0; i < particleCount; i++) {
      positions.push((Math.random() - 0.5) * 10); // x
      positions.push((Math.random() - 0.5) * 10); // y
      positions.push((Math.random() - 0.5) * 10); // z
    }
    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animar partículas
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.001; // Rotación lenta
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mount.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed', // Fijo para que siempre esté en el fondo
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Fondo más bajo
        pointerEvents: 'none', // Evita bloquear interacciones con otros elementos
      }}
    />
  );
};

export default ParticleBackground;
