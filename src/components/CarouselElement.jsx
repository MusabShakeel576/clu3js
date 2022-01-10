import React, { useEffect, useRef } from "react";
import gsap, { Power2 } from "gsap";

function CarouselElemement({title, description, reference}) {

  gsap.defaults({ease: Power2.easeOut, duration: .8})

  useEffect(() => {
    gsap.set(reference.current, {opacity:0, display: 'none'})
    gsap.fromTo(reference.current, {opacity: 0, y: 100}, {opacity: 1, y: 0, display: 'block'})
  }, [reference])

  return (
    <div ref={reference}>
      <h3>
        {title}
      </h3>
      <p>
        {description}
      </p>
    </div>
  )
}

export default CarouselElemement;