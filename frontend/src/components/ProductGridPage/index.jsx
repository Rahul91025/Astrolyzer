import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StarRating = ({ rating }) => (
  <div
    className="flex justify-center space-x-0.5 text-orange-400 text-sm select-none"
    aria-label={`Rating: ${rating} out of 5`}
  >
    {[1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        className={`w-4 h-4 fill-current ${
          i <= rating ? "text-orange-400" : "text-orange-200"
        }`}
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.562-.955L10 0l2.948 5.955 6.562.955-4.755 4.635 1.123 6.545z" />
      </svg>
    ))}
  </div>
);

const parseSalePrice = (salePriceStr) => {
  // Parse rupees value (₹ symbol) with decimal handling
  const match = salePriceStr.match(/₹([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
};

const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.6,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const ProductCard = ({ image, title, originalPrice, salePrice, rating }) => (
  <motion.div
    layout
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    whileHover={{ scale: 1.04, boxShadow: "0 12px 20px rgba(0,0,0,0.12)" }}
    whileFocus={{ scale: 1.04, boxShadow: "0 12px 20px rgba(0,0,0,0.12)" }}
    tabIndex={0}
    aria-label={`${title}, priced at ${salePrice}, rated ${rating} stars`}
    className="bg-white shadow-sm flex flex-col overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-orange-300
      border border-gray-200
      "
  >
    <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-5 select-none">
      <img
        src={image}
        alt={title}
        className="max-h-full max-w-full object-contain pointer-events-none"
        loading="lazy"
        draggable={false}
      />
      <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-600 to-orange-400 text-white text-xs font-semibold px-3 py-1 shadow select-none">
        SALE
      </div>
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <StarRating rating={rating} />
      <h3
        className="text-gray-900 font-semibold text-md mt-3 truncate"
        title={title}
      >
        {title}
      </h3>
      <p className="mt-auto text-sm text-gray-600">
        <span className="line-through text-gray-400 mr-3">{originalPrice}</span>
        <span className="text-orange-600 font-semibold">{salePrice}</span>
      </p>
    </div>
  </motion.div>
);

const products = [
  { image: "/images/p1.jpg", title: "Gold Crown Treasure", originalPrice: "₹6,400", salePrice: "₹4,000 (37.5% Off)", rating: 5 },
  { image: "/images/p2.jpg", title: "Silver Star Pendant", originalPrice: "₹4,800", salePrice: "₹3,360 (30% Off)", rating: 4 },
  { image: "/images/p7.jpg", title: "Emerald Elegance Ring", originalPrice: "₹9,600", salePrice: "₹6,720 (30% Off)", rating: 4 },
  { image: "/images/p4.jpg", title: "Ruby Radiance Necklace", originalPrice: "₹12,000", salePrice: "₹8,400 (30% Off)", rating: 3 },
  { image: "/images/p5.jpg", title: "Diamond Dazzle Bracelet", originalPrice: "₹16,000", salePrice: "₹11,200 (30% Off)", rating: 5 },
  { image: "/images/p6.jpg", title: "Sapphire Shine Earrings", originalPrice: "₹7,200", salePrice: "₹5,040 (30% Off)", rating: 2 },
  { image: "/images/p7.jpg", title: "Pearl Perfection Set", originalPrice: "₹8,800", salePrice: "₹6,160 (30% Off)", rating: 4 },
  { image: "/images/p1.jpg", title: "Topaz Treasure Ring", originalPrice: "₹6,000", salePrice: "₹4,200 (30% Off)", rating: 3 },
  { image: "/images/p2.jpg", title: "Amethyst Aura Pendant", originalPrice: "₹6,800", salePrice: "₹4,760 (30% Off)", rating: 4 },
  { image: "/images/p3.jpg", title: "Garnet Glory Bracelet", originalPrice: "₹7,600", salePrice: "₹5,320 (30% Off)", rating: 3 },
  { image: "/images/p4.jpg", title: "Citrine Charm Necklace", originalPrice: "₹5,600", salePrice: "₹3,920 (30% Off)", rating: 4 },
  { image: "/images/p5.jpg", title: "Onyx Opulence Earrings", originalPrice: "₹5,200", salePrice: "₹3,850 (30% Off)", rating: 5 },
  { image: "/images/p6.jpg", title: "Aquamarine Allure Set", originalPrice: "₹10,400", salePrice: "₹7,280 (30% Off)", rating: 4 },
  { image: "/images/p7.jpg", title: "Zircon Zenith Ring", originalPrice: "₹8,000", salePrice: "₹5,600 (30% Off)", rating: 3 },
  { image: "/images/p1.jpg", title: "Lapis Lazuli Luxury Pendant", originalPrice: "₹9,200", salePrice: "₹6,350 (30% Off)", rating: 4 },
  { image: "/images/p2.jpg", title: "Turquoise Treasure Bracelet", originalPrice: "₹7,200", salePrice: "₹5,040 (30% Off)", rating: 2 },
];

const ProductGridPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");

  const productsPerPage = 12;

  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    if (sortOption === "price-asc") {
      sorted.sort((a, b) => parseSalePrice(a.salePrice) - parseSalePrice(b.salePrice));
    } else if (sortOption === "price-desc") {
      sorted.sort((a, b) => parseSalePrice(b.salePrice) - parseSalePrice(a.salePrice));
    } else if (sortOption === "stars-desc") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [sortOption]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <p className="text-sm text-gray-600 select-text">
          Showing {startIndex + 1}–{Math.min(startIndex + productsPerPage, products.length)} of {products.length} results
        </p>

        <select
          aria-label="Sort products"
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-auto border border-gray-300 px-3 py-2 text-gray-700 font-medium bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
        >
          <option value="default">Default sorting</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="stars-desc">Rating: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-7">
        <AnimatePresence>
          {currentProducts.map((product, i) => (
            <ProductCard key={product.title + i} {...product} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      <nav
        aria-label="Pagination"
        className="mt-14 flex justify-center space-x-4"
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-5 py-2 font-semibold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300 ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed bg-gray-100 border border-gray-300"
              : "bg-orange-100 text-orange-600 hover:bg-orange-200 border border-transparent"
          }`}
        >
          Prev
        </motion.button>

        {[...Array(totalPages)].map((_, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.95 }}
            onClick={() => goToPage(i + 1)}
            aria-current={currentPage === i + 1 ? "page" : undefined}
            className={`px-4 py-2 font-semibold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300 ${
              currentPage === i + 1
                ? "bg-orange-600 text-white shadow"
                : "bg-orange-100 text-orange-600 hover:bg-orange-200"
            } border border-transparent`}
          >
            {i + 1}
          </motion.button>
        ))}

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-5 py-2 font-semibold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300 ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed bg-gray-100 border border-gray-300"
              : "bg-orange-100 text-orange-600 hover:bg-orange-200 border border-transparent"
          }`}
        >
          Next
        </motion.button>
      </nav>
    </section>
  );
};

export default ProductGridPage;
