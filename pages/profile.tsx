import { useAppSelector } from '@/Redux/hooks';
import axiosClient from '@/api/axiosClient';
import Header from '@/components/Header';
import { log } from 'console';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface UserState {
  _id: string;
  username: string;
  createdAt: string;
}

const List = () => {
  const user: UserState = useAppSelector((state) => state.user);
  const [hasWindow, setHasWindow] = useState(false);
  const [imageList, setImageList] = useState<any>([]);
  const [checkList, setCheckList] = useState<any>([]);
  const [typeData, setTypeData] = useState<any>('post');
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axiosClient.get(`/api/${typeData}`);
        setImageList(res);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [typeData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

  const handleDeletePost = async (postId: any) => {
    try {
      const res: any = await axiosClient.delete(`/api/post/${postId}`);
      console.log(res);

      if (res?.message === 'Delete successfully') {
        toast.success('Delete successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setIsLoad(!isLoad);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = (e: any) => {
    if (e.target.checked) {
      setCheckList([...checkList, e.target.value]);
    }
    if (!e.target.checked) {
      const objWithIdIndex = checkList.findIndex(
        (obj: any) => obj === e.target.value
      );
      if (objWithIdIndex > -1) {
        checkList.splice(objWithIdIndex, 1);
      }
    }
  };

  const handleDeleteMany = async () => {
    try {
      const res = await axiosClient.patch('/api/post', checkList);
      setIsLoad(!isLoad);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const res = await axiosClient.delete(`/api/post/delete-all/${user._id}`);
      console.log(res);
      setIsLoad(!isLoad);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='pt-10 mt-[60px] mb-[40px] bg-black text-[#eeeeee]'>
      <div className='w-[700px] h-full mx-auto rounded-[5px] border-[#A0A1A4] border-[2px]'>
        <div className='flex justify-between p-5 border-b-2 border-b-[#A0A1A4]'>
          <p className='text-[20px]'>Photo List</p>
          <div className='flex justify-between w-[75%]'>
            <button
              onClick={() => setTypeData('post')}
              className='w-[70px] px-3 py-0.5 border-2 border-[#A0A1A4] rounded-[6px] hover:bg-[#585555]'>
              All
            </button>
            <button
              onClick={() => setTypeData('image')}
              className='w-[70px] px-3 py-0.5 border-2 border-[#A0A1A4] rounded-[6px] hover:bg-[#585555]'>
              Photo
            </button>
            <button
              onClick={() => setTypeData('video')}
              className='w-[70px] px-3 py-0.5 border-2 border-[#A0A1A4] rounded-[6px] hover:bg-[#585555]'>
              Video
            </button>
            <button
              onClick={handleDeleteMany}
              className='w-[50px] px-3 py-0.5 border-2 border-[#A0A1A4] rounded-[6px] hover:bg-[#585555]'>
              <FaRegTrashAlt className='mx-auto' />
            </button>
            <button
              onClick={handleDeleteAll}
              className='w-[90px] px-3 py-1 bg-[#c72543] rounded-[5px] hover:bg-[#881414]'>
              Delete all
            </button>
          </div>
        </div>
        {hasWindow &&
          imageList?.map((item: any, index: any) =>
            item.type === 'image' ? (
              <div key={index} className='border-b-2 border-b-[#A0A1A4]'>
                <div
                  key={index}
                  className='my-5 h-[150px] flex justify-between items-center overflow-hidden '>
                  <div className='flex items-center'>
                    <input
                      id='imageCheckbox'
                      name='imageCheckbox'
                      type='checkbox'
                      value={item._id}
                      onClick={(e) => handleCheck(e)}
                      // onChange={() => setCheckList([...checkList, item._id])}
                      className='w-5 h-5 ml-5 mr-8 text-blue-600 bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <div className='max-h-[150px]  object-cover'>
                      <Image
                        src={item.url}
                        alt='image'
                        width={150}
                        height={150}
                        className='max-w-[150px] h-[150px] border-[#313131] border-[1px] object-cover'
                      />
                    </div>
                  </div>
                  <button className='mx-8 text-[24px] hover:text-[#A0A1A4]'>
                    <FaRegTrashAlt onClick={() => handleDeletePost(item._id)} />
                  </button>
                </div>
              </div>
            ) : (
              <div key={index} className='border-b-2 border-b-[#f3f3f3]'>
                <div
                  key={index}
                  className='my-5 max-h-[150px] flex justify-between items-center '>
                  <div className='flex items-center'>
                    <input
                      id='default-checkbox'
                      type='checkbox'
                      value={item._id}
                      className='w-5 h-5 ml-5 mr-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <div className='border-[#313131] border-[1px] items-center'>
                      <video
                        autoPlay
                        loop
                        muted
                        controls
                        className='w-auto max-h-[150px]'>
                        <source src={item.url} />
                      </video>
                    </div>
                    {/* <ReactPlayer
                        url={item.url}
                        width='auto'
                        height='150px'
                        playing={false}
                        muted={true}
                        controls={true}
                      /> */}
                  </div>
                  <button className='mx-8 text-[24px] hover:text-[#23232399]'>
                    <FaRegTrashAlt onClick={() => handleDeletePost(item._id)} />
                  </button>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default List;
