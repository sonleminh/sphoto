import { useState, useEffect } from 'react';
import axiosClient from '@/api/axiosClient';
import Header from '@/components/Header';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import Image from 'next/image';
import Gallery from '@/components/Gallery';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Link from 'next/link';

const ImagePage = () => {
  const [imageList, setImageList] = useState<any>([]);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [index, setIndex] = useState<number>();

  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axiosClient.get('/api/image');
        setImageList(res);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [isLoad]);

  const handleClickImage = (index: number) => {
    setShowGallery(!showGallery);
    setIndex(index);
  };
  return (
    <main>
      <Header isLoad={isLoad} setIsLoad={setIsLoad} />
      <div className='columns-4 gap-[15px] p-[15px] bg-black'>
        {imageList?.map((item: any, index: number) => (
          // <Link
          //   href={`/image/${index}`}
          //   key={index}
          <div key={index} onClick={() => handleClickImage(index)}>
            <div className='mb-[15px] rounded-2xl border-[#313131] border-[1px] overflow-hidden cursor-pointer'>
              <Image src={item.url} alt='c' width={720} height={720} />
            </div>
          </div>
        ))}
      </div>
      {showGallery ? (
        <Gallery
          imageList={imageList}
          showGallery={showGallery}
          setShowGallery={setShowGallery}
          index={index}
        />
      ) : (
        <></>
      )}
    </main>
  );
};

export default ImagePage;
