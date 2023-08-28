// animations using framer-motion
// on button click scale it down to 0.94 while being tapped
export const buttonClick = { whileTap: { scale: 0.94 } };
// fade in and out, inital opacity 0 then animate it to 1
// and fade out by animating from 1 to 0
export const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
// fade in and slide to top
// start by moving the element with this animation down by 30units and set opacity to 0
// and on animation move it to top and set opacity to 1
export const slideTop = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};
export const staggerFadeInOut = (i) => {
  // similar to slideTop but takes a unique key (index) so that every product is animated after the other and it uses x-axis not y
  // for example index=1 slidetotop then index=2 then 3... and each one animates after 0.12 seconds of the previous element (product)
  return {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 60 },
    transition: { duration: 0.4, delay: i * 0.12 },
    key: { i },
  };
};
export const toTopAnim = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
};
// fade in from right
export const slideIn = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};
