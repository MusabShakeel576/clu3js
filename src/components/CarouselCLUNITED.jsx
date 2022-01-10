import React, { useEffect, useRef } from "react";
import gsap, { Power2 } from "gsap";

function CarouselCLUNITED() {

  const carouselText = useRef(null)
  gsap.defaults({ease: Power2.easeInOut, duration: .5})

  useEffect(() => {
    gsap.fromTo(carouselText.current, {opacity: 0, y: 100}, {opacity: 1, y: 0})
  }, [carouselText])

  return (
    <div ref={carouselText}>
      <h3>
        CLUNITED
      </h3>
      <p>
        CLUNITED is a non-profit 501(c) organization
      </p>
    </div>
  )
}

export default CarouselCLUNITED;