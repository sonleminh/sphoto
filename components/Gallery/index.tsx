import Image from 'next/image';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import { FaRegTimesCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

interface Props {
  postList: any;
  showGallery: boolean;
  setShowGallery: React.Dispatch<boolean>;
  index?: number;
}

const Gallery: React.FC<Props> = (props) => {
  const router = useRouter();
  const { postList, showGallery, setShowGallery, index } = props;

  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const [swiperIndex, setSwiperIndex] = useState<any>();

  // console.log('indexGallery', index);

  return (
    <React.Fragment>
      <div className='fixed top-0 right-0 bottom-0 left-0 bg-black-rgba'>
        <Swiper
          initialSlide={index}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          onActiveIndexChange={(index) => setSwiperIndex(index)}
          loop={true}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation, Thumbs]}
          grabCursor={true}
          zoom={true}
          className='gallery'>
          {postList.map((item: any, index: number) =>
            item.type === 'image' ? (
              <SwiperSlide key={index}>
                <SwiperSlide key={index}>
                  <Image
                    src={item.url}
                    alt='image'
                    width={1000}
                    height={700}
                    className='w-auto h-[700px] mx-auto object-cover'
                  />
                </SwiperSlide>
              </SwiperSlide>
            ) : (
              <SwiperSlide key={index}>
                <div className=''>
                  <video
                    autoPlay
                    loop
                    muted
                    controls
                    // [calc(100%-80px)]
                    className='max-h-[638px] mx-auto object-cover'>
                    <source src={item.url} />
                  </video>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
        <Swiper
          // loop={true}
          spaceBetween={10}
          slidesPerView={15}
          modules={[Navigation, Thumbs]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          centeredSlides={true}
          // centeredSlidesBounds={true}
          className='gallery-thumbs'>
          {postList.map((item: any, index: number) =>
            item.type === 'image' ? (
              <SwiperSlide key={index}>
                <div className='h-[60px] object-cover flex items-center'>
                  <Image
                    src={item.url}
                    alt='image'
                    width={100}
                    height={100}
                    className='mx-auto'
                  />
                </div>
              </SwiperSlide>
            ) : (
              <SwiperSlide key={index}>
                <div className=''>
                  <video
                    loop
                    muted
                    // [calc(100%-80px)]
                    className='max-h-[60px] mx-auto object-cover'>
                    <source src={item.url} />
                  </video>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
      <FaRegTimesCircle
        onClick={() => setShowGallery(!showGallery)}
        className='fixed top-2 right-2 text-[50px] text-[#ffffff75] cursor-pointer'
      />
    </React.Fragment>
  );
};

export default Gallery;
