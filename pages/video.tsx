import { useState, useEffect } from 'react';
import axiosClient from '@/api/axiosClient';

const Video = () => {
  const [videoList, setVideoList] = useState<any>([]);

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
  }, []);
  return (
    <main>
      <div className='mt-[60px]'>
        <div className='columns-4 gap-[15px] p-[15px] bg-black'>
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
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Video;
