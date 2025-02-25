import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    name: "Primo Creamy Coffee",
    description:
      "Discover a world of vibrant flavors with our premium juice selection. All Fresh & Juicy, we believe in the power of nature's finest ingredients to bring you delicious refreshments.",
    price: "$25.50",
    flavor: "Caramel Flavour",
    image: "/products.png",
    bgColor: "#8B5A2B",
  },
  {
    name: "Berry Blast Juice",
    description:
      "A delicious blend of mixed berries for a refreshing experience. Packed with antioxidants and natural goodness!",
    price: "$22.99",
    flavor: "Mixed Berry",
    image: "/products1.png",
    bgColor: "#A833B9",
  },
  {
    name: "Tropical Mango",
    description:
      "Indulge in the sweet and tangy taste of ripe mangoes. A tropical delight with every sip!",
    price: "$20.99",
    flavor: "Mango Delight",
    image: "/products.png",
    bgColor: "#F4A900",
  },
];

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const lastWheelTime = useRef(0); // Track last wheel event to manage frequency
  //   const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isTouchpad = useRef(false); // Track if device is a touchpad
  const wheelDeltaY = useRef(0); // Track the deltaY for finer control
  const scrollInProgress = useRef(false); // To track ongoing scroll behavior

  // Detect if touchpad is used
  useEffect(() => {
    const testTouchpad = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 10 && event.deltaMode === 0) {
        isTouchpad.current = true; // Detect touchpad by deltaY and deltaMode
      }
    };
    window.addEventListener("wheel", testTouchpad);
    return () => {
      window.removeEventListener("wheel", testTouchpad);
    };
  }, []);

  // Handle mouse/touchpad scroll
  const handleWheel = (event: WheelEvent) => {
    if (scrollInProgress.current) return; // Block if scroll is already in progress

    const currentTime = Date.now();
    const timeDiff = currentTime - lastWheelTime.current;

    if (timeDiff < 100) return; // Prevent rapid scroll

    wheelDeltaY.current = event.deltaY;

    // Check if scroll value is significant enough to trigger a change
    if (Math.abs(wheelDeltaY.current) > 20) {
      scrollInProgress.current = true; // Start scroll action

      if (wheelDeltaY.current > 0) {
        setActiveIndex((prev) => (prev + 1) % products.length);
      } else {
        setActiveIndex(
          (prev) => (prev - 1 + products.length) % products.length
        );
      }

      lastWheelTime.current = currentTime; // Update last wheel event time
      setTimeout(() => {
        scrollInProgress.current = false; // Allow further scroll after timeout
      }, 500); // Adjust the timeout duration as needed
    }
  };

  // Handle touch events for mobile (swipe detection)
  const handleTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    lastWheelTime.current = touch.pageY;
  };

  const handleTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    const touchEnd = touch.pageY;
    const touchDiff = lastWheelTime.current - touchEnd;

    if (Math.abs(touchDiff) > 50) {
      if (touchDiff > 0) {
        setActiveIndex((prev) => (prev + 1) % products.length);
      } else {
        setActiveIndex(
          (prev) => (prev - 1 + products.length) % products.length
        );
      }
      lastWheelTime.current = touchEnd; // Update touch start position
    }
  };

  // Smooth transition for product change
  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <motion.div
      className="container"
      style={{ backgroundColor: products[activeIndex].bgColor }}
      layout
      animate={{ opacity: 1 }} // Smooth fade transition
      initial={{ opacity: 0 }} // Initial fade-in
      transition={{ duration: 0.5 }} // Smooth fade transition duration
    >
      <div className="content">
        <div className="text-content">
          <AnimatePresence mode="wait">
            <motion.h2
              key={products[activeIndex].name}
              className="title"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {products[activeIndex].name}
            </motion.h2>
          </AnimatePresence>
          <p className="size">500 ml</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={products[activeIndex].description}
              className="description"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {products[activeIndex].description}
            </motion.p>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={products[activeIndex].price}
              className="price"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {products[activeIndex].price}
            </motion.p>
          </AnimatePresence>
          <button className="buy-button">Buy Now</button>
        </div>
        <div className="image-container">
          <AnimatePresence mode="wait">
            <motion.img
              key={products[activeIndex].image}
              src={products[activeIndex].image}
              alt={products[activeIndex].name}
              className="product-image"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
