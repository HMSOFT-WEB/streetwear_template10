import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, User, Search, ArrowRight } from 'lucide-react';
import * as THREE from 'three';
import './index.css';

import logo from './assets/logo.png';
import heroImg from './assets/hero.png';
import prodImg from './assets/prod1.png';

// 3D Abstract Streetwear Element (e.g., Metallic Chain/Link)
function AbstractChain() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusGeometry args={[2, 0.6, 32, 100]} />
        <meshStandardMaterial 
          color="#111111" 
          metalness={0.9} 
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>
      <mesh ref={meshRef} position={[2, 2, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[2, 0.6, 32, 100]} />
        <meshStandardMaterial 
          color="#ff3300" 
          metalness={0.6} 
          roughness={0.2}
          emissive="#ff3300"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="ticker">
        <div className="ticker-content">
          [ LIMITED DROP ] FW26 COLLECTION OUT NOW // FREE GLOBAL SHIPPING OVER $200 // [ LIMITED DROP ] FW26 COLLECTION OUT NOW // FREE GLOBAL SHIPPING OVER $200 //
        </div>
      </div>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <div className="logo">
            <img src={logo} alt="HMSOFT HYPE" onError={(e) => e.target.style.display='none'} />
          </div>
          
          <nav className="nav-links">
            <a href="#">SHOP</a>
            <a href="#">COLLECTIONS</a>
            <a href="#">ARCHIVE</a>
          </nav>
          
          <div className="nav-icons">
            <button><Search size={26} strokeWidth={2.5} /></button>
            <button><User size={26} strokeWidth={2.5} /></button>
            <button><ShoppingBag size={26} strokeWidth={2.5} /></button>
          </div>
        </div>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img src={heroImg} alt="Streetwear Collection" />
      </div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          DEFY <br/> <span>GRAVITY</span>
        </motion.h1>
        <motion.div 
          className="hero-subtitle"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          FW26 TECHWEAR CAPSULE
        </motion.div>
        <motion.button 
          className="btn-hype"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ENTER THE DROP
        </motion.button>
      </div>
    </section>
  );
}

function Drop3D() {
  return (
    <section className="drop-section">
      <div className="drop-text">
        <motion.h2
          initial={{ x: -100 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          HYPEBEAST <span>CULTURE</span>
        </motion.h2>
        <motion.h2
          initial={{ x: 100 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <span>ENGINEERED</span> FOR THE STREETS
        </motion.h2>
      </div>
      
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} style={{ position: 'absolute', zIndex: 5 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#fff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#ff3300" />
        <Environment preset="city" />
        
        <PresentationControls global rotation={[0, 0, 0]} polar={[-0.4, 0.4]} azimuth={[-Math.PI/2, Math.PI/2]} config={{ mass: 2, tension: 500 }}>
          <AbstractChain />
        </PresentationControls>
      </Canvas>
    </section>
  );
}

function Products() {
  const items = [
    {
      badge: "NEW",
      name: "TITAN V1 SNEAKER",
      category: "FOOTWEAR",
      price: "$395",
      img: prodImg
    },
    {
      badge: "SOLD OUT",
      name: "CARGO HARNESS PANT",
      category: "APPAREL",
      price: "$210",
      img: prodImg
    },
    {
      badge: "RESTOCK",
      name: "HYPE HEAVY HOODIE",
      category: "APPAREL",
      price: "$180",
      img: prodImg
    }
  ];

  return (
    <section className="products">
      <div className="section-header">
        <h2 className="section-title">LATEST DROPS</h2>
        <a href="#" style={{ fontFamily: 'Anton', fontSize: '1.5rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          VIEW ALL <ArrowRight size={24} />
        </a>
      </div>
      
      <div className="product-grid">
        {items.map((item, idx) => (
          <motion.div 
            className="product-card" 
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className="product-img-box">
              {item.badge && <div className="product-badge">{item.badge}</div>}
              <img src={item.img} alt={item.name} />
            </div>
            <div className="product-info">
              <div>
                <h3 className="product-name">{item.name}</h3>
                <div className="product-category">{item.category}</div>
              </div>
              <div className="product-price">{item.price}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Drop3D />
        <Products />
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <h2>HMSOFT<br/>HYPE</h2>
          </div>
          <div className="footer-col">
            <h4>SHOP</h4>
            <ul>
              <li><a href="#">ALL PRODUCTS</a></li>
              <li><a href="#">FOOTWEAR</a></li>
              <li><a href="#">ACCESSORIES</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>INFO</h4>
            <ul>
              <li><a href="#">SHIPPING</a></li>
              <li><a href="#">RETURNS</a></li>
              <li><a href="#">CONTACT</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 HMSOFT HYPEWEAR WORLDWIDE. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </>
  );
}

export default App;
