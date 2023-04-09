import { useState, useEffect } from 'react';
import axiosClient from '@/api/axiosClient';
import Image from 'next/image';
import Gallery from '@/components/Gallery';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const ImagePage = () => {
  const [imageList, setImageList] = useState<any>([]);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [index, setIndex] = useState<number>();

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
  }, []);

  const handleClickImage = (index: number) => {
    setShowGallery(!showGallery);
    setIndex(index);
  };
  return (
    <main>
      <div className='mt-[60px]'>
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
            postList={imageList}
            showGallery={showGallery}
            setShowGallery={setShowGallery}
            index={index}
          />
        ) : (
          <></>
        )}
      </div>
    </main>
  );
};

export default ImagePage;
