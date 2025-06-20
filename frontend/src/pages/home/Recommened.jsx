import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlistItem } from '../../redux/features/wishlist/wishlistSlice';

const Recommened = () => {
  const { data: books = [] } = useFetchAllBooksQuery();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  const isWished = (book) => wishlist.some((item) => item._id === book._id);
  const handleToggleWishlist = (book) => {
    dispatch(toggleWishlistItem(book));
  };

  return (
    <div className='py-16 px-4'>
      <h2 className='text-3xl font-semibold mb-6 text-left'>Recommended for you</h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 2, spaceBetween: 50 },
          1180: { slidesPerView: 3, spaceBetween: 50 },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {books.length > 0 &&
          books.slice(8, 18).map((book) => (
            <SwiperSlide key={book._id}>
              <BookCard
                book={book}
                isWished={isWished(book)}
                toggleWishlist={() => handleToggleWishlist(book)}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Recommened;
