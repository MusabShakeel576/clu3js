import React, { useEffect, useRef } from "react";
import gsap, { Power2 } from "gsap";

function CarouselSandbox() {

  const carouselText = useRef(null)
  gsap.defaults({ease: Power2.easeInOut, duration: .5})

  useEffect(() => {
    gsap.fromTo(carouselText.current, {opacity: 0, y: 100}, {opacity: 1, y: 0})
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