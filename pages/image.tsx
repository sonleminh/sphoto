import { useState, useEffect } from 'react';
import axiosClient from '@/api/axiosClient';
import Image from 'next/image';
import Carousel from '@/components/Carousel';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useAppSelector } from '@/Redux/hooks';
import { MyPage } from '@/page';

interface UserState {
  _id: string;
  username: string;
  createdAt: string;
}

const ImagePage: MyPage = () => {
  const user: UserState = useAppSelector((state) => state.user);
  const loading = useAppSelector((state) => state.loading.value);

  const [imageList, setImageList] = useState<any>([]);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [index, setIndex] = useState<number>();

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axiosClient.get(`/api/image/${user._id}`);
        setImageList(res);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [user._id, loading]);

  const handleClickImage = (index: number) => {
    setShowGallery(!showGallery);
    setIndex(index);
  };
  return (
    <main>
      <div className='mt-[65px]'>
        <div className='columns-4 gap-[15px] p-[15px] bg-black sm:columns-2'>
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
          <Carousel
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

ImagePage.Layout = 'Default';
