import { useState, useEffect } from 'react';
import axiosClient from '@/api/axiosClient';
import Header from '@/components/Header';
import ReactPlayer from 'react-player';

const Video = () => {
  const [videoList, setVideoList] = useState<any>([]);

  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axiosClient.get('/api/video');
        setVideoList(res);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [isLoad]);
  return (
    <main>
      <Header isLoad={isLoad} setIsLoad={setIsLoad} />
      <div
        className='columns-4 gap-[15px] p-[15px] bg-black'
        // style={{ columnCount: '4', columnGap: '15px' }}
      >
        {videoList?.map((item: any, index: any) => (
          <div
            key={index}
            className='mb-[15px] rounded-2xl border-[#313131] border-[1px] overflow-hidden'>
            <video
              autoPlay
              loop
              muted
              controls
              className='w-auto h-auto rounded-2xl border-[#313131] border-[1px] overflow-hidden'>
              <source src={item.url} />
            </video>
            {/* <FaTimes
                    className='absolute top-0 right-[0px] text-[20px] z-100 cursor-pointer'
                /> */}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Video;
