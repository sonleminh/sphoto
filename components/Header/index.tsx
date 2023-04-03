import { useState, useRef, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axiosClient from '@/api/axiosClient';
import {
  FaPlus,
  FaTimes,
  FaVideo,
  FaRegImages,
  FaRandom,
  FaRegImage,
  FaPhotoVideo,
  FaRegListAlt,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/sphoto-logo.png';

interface Props {
  isLoad: Boolean;
  setIsLoad: React.Dispatch<any>;
}

const Header: React.FC<Props> = (props) => {
  const { isLoad, setIsLoad } = props;
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [previewSource, setPreviewSource] = useState<any[]>([]);
  const [imageList, setImageList] = useState<any>([]);
  const [urlVideoInput, setUrlVideoInput] = useState<string>('');
  const [urlList, setUrlList] = useState<any>([]);

  const cancelButtonImageRef = useRef(null);
  const cancelButtonVideoRef = useRef(null);
  const inputRef = useRef<any>('');

  const handleImageSubmit = async (e: any) => {
    if (!previewSource) return;
    let imageData: any = await uploadImage(previewSource);
    imageData = imageData?.map((item: any) => {
      return { publicId: item.public_id, url: item.url, type: 'image' };
    });
    console.log(imageData);
    const res: any = await axiosClient.post('/api/post', {
      data: imageData,
    });
    console.log(res.message);
    if (res?.message === 'Post successfully') {
      toast.success('Post successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setPreviewSource([]);
      setIsLoad(!isLoad);
      setOpenImageModal(!openImageModal);
    }
  };

  const handleInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file: any) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource([...previewSource, reader.result]);
    };
  };

  const uploadImage = async (base64EncodedImage: any) => {
    let file;
    try {
      file = await axiosClient.post('/api/upload', {
        file: base64EncodedImage,
      });
      return file;
    } catch (error) {
      console.error(error);
    }
  };

  const onAddUrlList = () => {
    const urlVideo = { url: urlVideoInput, type: 'video' };
    setUrlList([...urlList, urlVideo]);
    setUrlVideoInput('');
    inputRef.current.focus();
  };

  const handleVideoSubmit = async () => {
    if (!urlList) return;
    const res: any = await axiosClient.post('/api/post', {
      data: urlList,
    });
    console.log(res.message);
    if (res?.message === 'Post successfully') {
      toast.success('Post successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setUrlList([]);
      setOpenVideoModal(!openVideoModal);
      setIsLoad(!isLoad);
    }
  };
  return (
    <div className='border-[#A0A1A4] border-b-[2px] text-[#eeeeee] bg-black'>
      <div className='w-[50%] m-auto py-3 flex items-center justify-between text-[20px]'>
        <Link href='/' className='max-h-[50px]'>
          <Image
            src={logo}
            className='max-h-[50px] object-cover'
            width={130}
            height={50}
            alt='logo'
          />
        </Link>
        <div className='w-[70%] flex items-center justify-between'>
          <button className='w-[70px] px-2 py-1 border-2 border-[#A0A1A4] rounded-[6px] hover:bg-[#585555]'>
            <FaRandom className='mx-auto' onClick={() => setIsLoad(!isLoad)} />
          </button>
          <Link
            href='/image'
            className='w-[70px] px-2 py-1 border-2 border-[#A0A1A4] rounded-[6px] hover:bg-[#585555]'>
            <FaRegImages
              className='mx-auto'
              onClick={() => setIsLoad(!isLoad)}
            />
          </Link>
          <Link
            href='/video'
            className='w-[70px] px-2 py-1 border-2 border-[#A0A1A4] rounded-[6px] hover:bg-[#585555]'>
            <FaPhotoVideo
              className='mx-auto'
              onClick={() => setIsLoad(!isLoad)}
            />
          </Link>
          <Link
            href='/list'
            className='w-[70px] px-2 py-1 border-2 border-[#A0A1A4] rounded-[6px] hover:bg-[#585555]'
            // className=' flex justify-center items-center border-2 border-[#A0A1A4] rounded-[6px] text-[26px] text-[#333]'
          >
            <FaRegListAlt className='mx-auto' />
          </Link>
          <div className='w-[70px] px-2 flex text-center border-2 border-[#A0A1A4] rounded-[6px] hover:bg-[#585555]'>
            <button
              onClick={() => setOpenImageModal(!openImageModal)}
              className='flex items-center py-1'
              //   className='flex justify-center items-center w-full py-1 border-2 border-[#d9dde1] rounded-[6px] text-[16px] text-[#333]'
            >
              <FaPlus className='text-[12px] mr-2' />{' '}
              <FaRegImage className='text-[22px]' />
            </button>
          </div>
          <Transition.Root show={openImageModal} as={Fragment}>
            <Dialog
              as='div'
              className='relative z-10]'
              initialFocus={cancelButtonImageRef}
              onClose={setOpenImageModal}>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
              </Transition.Child>

              <div className='fixed inset-0 z-10 overflow-y-auto'>
                <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    enterTo='opacity-100 translate-y-0 sm:scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                    leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                    <Dialog.Panel className='lg:max-w-[800px] relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                      <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                        <div className='sm:flex sm:items-start'>
                          <div className='mt-3 text-center sm:mt-0 sm:ml-2 sm:text-left'>
                            <Dialog.Title
                              as='h3'
                              className='text-base font-semibold leading-6 text-gray-900'>
                              Upload Image
                            </Dialog.Title>
                            <div className='mt-2'>
                              <input
                                type='file'
                                name='image'
                                onChange={handleInputChange}
                                className='mb-5'
                              />
                              <div className='grid grid-cols-5 gap-2'>
                                {previewSource &&
                                  previewSource.map((item: any, index: any) => (
                                    <div
                                      key={index}
                                      className='relative border-[1px] border-[#585555] overflow-hidden flex justify-center'>
                                      <Image
                                        src={item}
                                        alt='choosen'
                                        className='max-w-[150px] max-h-[150px] object-contain'
                                        width={720}
                                        height={480}
                                      />
                                      <FaTimes
                                        onClick={(e) => {
                                          previewSource.splice(index, 1);
                                          setIsLoad(!isLoad);
                                        }}
                                        className='absolute top-0 right-[0px] text-[20px] z-100 cursor-pointer'
                                      />
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                        <button
                          type='button'
                          className='inline-flex w-full justify-center rounded-md bg-[#000] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto'
                          onClick={handleImageSubmit}>
                          Upload
                        </button>
                        <button
                          type='button'
                          className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                          onClick={() => setOpenImageModal(false)}
                          ref={cancelButtonImageRef}>
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          <div className='w-[70px] px-2 text-center border-2 border-[#A0A1A4] rounded-[6px] hover:bg-[#585555]'>
            <button
              className='flex items-center py-1'
              onClick={() => {
                setOpenVideoModal(!openVideoModal);
              }}
              //   className='flex justify-center items-center w-full mx-3 px-2 py-1 border-2 border-[#d9dde1] rounded-[6px] text-[16px] text-[#333]'
            >
              <FaPlus className='text-[12px] mr-2' />{' '}
              <FaVideo className='text-[22px]' />
            </button>
          </div>
          <Transition.Root show={openVideoModal} as={Fragment}>
            <Dialog
              as='div'
              className='relative z-10'
              initialFocus={cancelButtonVideoRef}
              onClose={setOpenVideoModal}>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
              </Transition.Child>

              <div className='fixed inset-0 z-10 overflow-y-auto'>
                <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    enterTo='opacity-100 translate-y-0 sm:scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                    leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                    <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                      <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                        <div className='sm:flex sm:items-start'>
                          <div className='w-full mt-3 text-center sm:mt-0 sm:ml-2 sm:text-left'>
                            <Dialog.Title
                              as='h3'
                              className='text-base font-semibold leading-6 text-gray-900'>
                              Upload Video
                            </Dialog.Title>
                            <div className='flex items-center mt-3'>
                              <input
                                name='url'
                                className='w-full px-2 py-1 border-[2px] border-[black] rounded'
                                ref={inputRef}
                                onChange={(e) =>
                                  setUrlVideoInput(e.target.value)
                                }
                                value={urlVideoInput}
                              />
                              <button
                                onClick={onAddUrlList}
                                className='ml-2 px-3 py-[10px] border-2 border-[black] rounded-[6px] text-[16px] text-[#333]'>
                                <FaPlus className='text-[12px]' />
                              </button>
                            </div>
                            <div className=''>
                              {urlList.map((item: any, index: any) => (
                                <div key={index}>{item.url}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                        <button
                          type='button'
                          className='inline-flex w-full justify-center rounded-md bg-[#000] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto'
                          onClick={handleVideoSubmit}>
                          Upload
                        </button>
                        <button
                          type='button'
                          className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                          onClick={() => setOpenVideoModal(false)}
                          ref={cancelButtonVideoRef}>
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>
    </div>
  );
};

export default Header;
