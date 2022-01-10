import React, { useEffect, useRef } from "react";
import gsap, { Power2 } from "gsap";

function CarouselDescription() {

  const carouselText = useRef(null)
  gsap.defaults({ease: Power2.easeOut, duration: .8})

  useEffect(() => {
    gsap.set(carouselText.current, {opacity:0, display: 'none'})
    gsap.fromTo(carouselText.current, {opacity: 0, y: 100}, {opacity: 1, y: 0, display: 'block'})
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