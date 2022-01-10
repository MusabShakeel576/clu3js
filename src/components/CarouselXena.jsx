import React, { useEffect, useRef } from "react";
import gsap, { Power2 } from "gsap";

function CarouselXena() {

  const carouselText = useRef(null)
  gsap.defaults({ease: Power2.easeOut, duration: .6})

  useEffect(() => {
    gsap.set(carouselText.current, {opacity:0, display: 'none'})
    gsap.fromTo(carouselText.current, {opacity: 0, y: 100}, {opacity: 1, y: 0, display: 'block'})
  }, [carouselText])

  return (
    <div ref={carouselText}>
      <h3>
        Xena
      </h3>
      <p>
        Xena is a custom game on Rust
      </p>
    </div>
  )
}

export default CarouselXena;