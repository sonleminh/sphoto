import { useState, useEffect } from 'react';
import axiosClient from '@/api/axiosClient';
import { useAppSelector } from '@/Redux/hooks';
import { MyPage } from '@/page';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';

interface UserState {
  _id: string;
  username: string;
  createdAt: string;
}

const VideoPage: MyPage = () => {
  const user: UserState = useAppSelector((state) => state.user);
  const loading = useAppSelector((state) => state.loading.value);
  const [videoList, setVideoList] = useState<any>([]);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [index, setIndex] = useState<number>();

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 20;
  const currentItems = videoList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(videoList.length / 20);
  const handlePageClick = (e: any) => {
    const newOffset = (e.selected * 20) % videoList.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axiosClient.get(`/api/video/${user._id}`);
        setVideoList(res);
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
          {videoList?.map((item: any, index: any) => (
            <div
              key={index}
              onClick={() => handleClickImage(index)}
              className='mb-[15px] rounded-2xl border-[#313131] border-[1px] overflow-hidden'>
              <video
                autoPlay
                loop
                muted
                controls
                className='w-auto h-auto rounded-2xl border-[#313131] border-[1px] overflow-hidden'>
                <source src={item.url} />
              </video>
            </div>
          ))}
        </div>
        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />

        {showGallery ? (
          <Carousel
            postList={currentItems}
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

export default VideoPage;

VideoPage.Layout = 'Default';
