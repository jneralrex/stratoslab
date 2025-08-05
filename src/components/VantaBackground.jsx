"use client"; // Ensure it's a client component

import { useEffect, useRef, useState } from "react";
import * as THREE from "three"; // Required for Vanta.js
import RINGS from "vanta/dist/vanta.rings.min"; // Choose your effect

const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        RINGS({
          el: vantaRef.current,
          THREE, // Pass the THREE library
          color: 0xff3f81, // Custom color
          waveHeight: 20, // Adjust wave height
          backgroundColor:0x23153c,
          shininess: 100, // Adjust shininess
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy(); // Cleanup
    };
  }, [vantaEffect]);

  return <div
  ref={vantaRef}
  className="fixed top-0 left-0 h-screen w-screen z-[-1] overflow-hidden"
/>

};

export default VantaBackground;
