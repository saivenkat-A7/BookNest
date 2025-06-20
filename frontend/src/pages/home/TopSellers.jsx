import React, { useState, useRef } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlistItem } from '../../redux/features/wishlist/wishlistSlice';

const categories = [
  'Choose a genre',
  'Business',
  'Fiction',
  'Horror',
  'Adventure',
  'Full stack',
  'Programming'
];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState('Choose a genre');
  const { data: books = [] } = useFetchAllBooksQuery();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  const isWished = (book) => wishlist.some((item) => item._id === book._id);

  const toggleWishlist = (book) => {
    dispatch(toggleWishlistItem(book));
  };

  const filteredBooks =
    selectedCategory === 'Choose a genre'
      ? books
      : books.filter((book) => book.category === selectedCategory.toLowerCase());

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="py-5 relative px-2">
      {/* Heading */}
      <h2 className="text-3xl font-semibold mb-4 text-left">Top Sellers</h2>

      {/* Category Filter */}
      <div className="mb-8 flex justif-start">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Swiper Carousel */}
      <div className="relative px-4">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (swiper.params.navigation) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              }
            });
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 }
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {filteredBooks.map((book) => (
            <SwiperSlide key={book._id}>
              <BookCard
                book={book}
                isWished={isWished(book)}
                toggleWishlist={() => toggleWishlist(book)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          ref={prevRef}
          className="swiper-button-prev absolute top-1/2 -left-6 transform -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md"
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>
        <button
          ref={nextRef}
          className="swiper-button-next absolute top-1/2 -right-6 transform -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md"
          aria-label="Next"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TopSellers;
