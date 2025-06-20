import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
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
            {wishlist.map((book) => (
              <SwiperSlide key={book._id}>
                <BookCard
                  book={book}
                  isWished={true}
                  toggleWishlist={() => {}} // optional if not removing from wishlist here
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
      )}
    </div>
  );
};

export default Wishlist;
