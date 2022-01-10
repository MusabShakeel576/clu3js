import React, { useEffect, useRef } from "react";
import gsap, { Power2 } from "gsap";

function CarouselDescription() {

  const carouselText = useRef(null)
  gsap.defaults({ease: Power2.easeInOut, duration: .5})

  useEffect(() => {
    gsap.fromTo(carouselText.current, {opacity: 0, y: 100}, {opacity: 1, y: 0})
  }, [carouselText])

  return (
    <div ref={carouselText}>
      <h3>
        Goobers
      </h3>
      <p>
        Goobers NFT are 15,000 uniquely generated arts
      </p>
    </div>
  )
}

export default CarouselDescription;