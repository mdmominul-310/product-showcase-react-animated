import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleWheel = (event: { deltaY: number }) => {
      if (event.deltaY > 0) {
        setActiveIndex((prev) => (prev + 1) % products.length);
      } else {
        setActiveIndex(
          (prev) => (prev - 1 + products.length) % products.length
        );
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <motion.div
      className="container"
      style={{ backgroundColor: products[activeIndex].bgColor }}
      animate={{ backgroundColor: products[activeIndex].bgColor }}
      transition={{ duration: 0.5 }}
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
