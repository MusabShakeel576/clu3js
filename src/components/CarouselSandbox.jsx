import React, { useEffect, useRef } from "react";
import gsap, { Power2 } from "gsap";

function CarouselSandbox() {

  const carouselText = useRef(null)
  gsap.defaults({ease: Power2.easeOut, duration: .8})

  useEffect(() => {
    gsap.set(carouselText.current, {opacity:0, display: 'none'})
    gsap.fromTo(carouselText.current, {opacity: 0, y: 100}, {opacity: 1, y: 0, display: 'block'})
  }, [carouselText])

  return (
    <div ref={carouselText}>
      <h3>
        Sandbox
      </h3>
      <p>
        Sandbox is a game developed in a metaverse
      </p>
    </div>
  )
}

export default CarouselSandbox;