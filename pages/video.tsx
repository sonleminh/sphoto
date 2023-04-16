import { useState, useEffect } from 'react';
import axiosClient from '@/api/axiosClient';
import { useAppSelector } from '@/Redux/hooks';
import { MyPage } from '@/page';
import Carousel from '@/components/Carousel';

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
        {showGallery ? (
          <Carousel
            postList={videoList}
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
