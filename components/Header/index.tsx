import { useState, useRef, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axiosClient from '@/api/axiosClient';
import {
  FaPlus,
  FaRegImages,
  FaRandom,
  FaRegImage,
  FaPhotoVideo,
  FaUserCircle,
  FaBars,
} from 'react-icons/fa';
import { BsXLg } from 'react-icons/bs';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/sphoto-logo.png';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { logout } from '@/Redux/slice/userSlice';
import { useRouter } from 'next/router';
import { loading } from '@/Redux/slice/loadingSlice';

interface UserState {
  _id: string;
  username: string;
  createdAt: string;
}

const Header = () => {
  const user: UserState = useAppSelector((state) => state.user);

  const [previewSource, setPreviewSource] = useState<any[]>([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [showHeaderMenu, setShowHeaderMenu] = useState<boolean>(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const cancelButtonImageRef = useRef(null);
  let menuRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    let handle = (e: any) => {
      if (!menuRef.current?.contains(e.target)) {
        setShowHeaderMenu(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
    };
  }, [showHeaderMenu]);

  const handleInputChange = (e: any) => {
    const files = e.target.files;
    previewFile(files);
  };

  const previewFile = (files: any) => {
    Object.keys(files).forEach((i) => {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource((preState) => [...preState, reader.result]);
      };
    });
  };

  const upload = async (base64Encoded: any) => {
    let file;
    try {
      file = await axiosClient.post('/api/upload', {
        file: base64Encoded,
      });
      return file;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: any) => {
    if (!previewSource) return;
    try {
      let data: any = await upload(previewSource);
      data = data?.map((item: any) => {
        if (item.resource_type === 'image') {
          return {
            publicId: item.public_id,
            url: item.url,
            type: 'image',
            user: user._id,
          };
        } else {
          return {
            publicId: item.public_id,
            url: item.url,
            type: 'video',
            user: user._id,
          };
        }
      });
      const res: any = await axiosClient.post('/api/post', {
        data: data,
      });
      toast.success('Upload thành công', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setOpenAddModal(false);
      dispatch(loading());
      setPreviewSource([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePreview = (index: number) => {
    previewSource.splice(index, 1);
    setLoad(!load);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
    toast.success('Đăng xuất thành công', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const handleOpenMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  return (
    <div className='fixed top-0 w-full  border-[#A0A1A4] border-b-[2px] text-[#eeeeee] bg-black z-[69]'>
      <div className='w-[50%] h-[60px] pt-2 m-auto flex items-center justify-between text-[18px] lg:w-[60%] lg:h-[50px] lg:pt-1 lg:text-[16px] sm:w-full sm:h-[50px] sm:px-4'>
        <Link href='/' className='max-h-[40px]'>
          <Image
            src={logo}
            className='max-h-[40px] pb-2 object-cover sm:p-2'
            width={100}
            height={40}
            alt='logo'
          />
        </Link>
        {!user._id ? (
          <div className='flex max-h-[40px] text-[16px] sm:text-[14px]'>
            <Link
              href='/signup'
              className='flex items-center w-full whitespace-nowrap'>
              Đăng ký
            </Link>
            <Link
              href='/login'
              className='flex items-center w-full px-2 py-1 ml-5 border-2 border-[#A0A1A4] rounded whitespace-nowrap sm:py-0.5'>
              Đăng nhập
            </Link>
          </div>
        ) : (
          <div className='flex items-center'>
            <button className='w-[60px] py-1 mx-2 border-2 border-[#A0A1A4] rounded-[6px] hover:bg-[#282828] lg:w-[55px] lg:mx-1 sm:hidden'>
              <FaRandom className='mx-auto' />
            </button>
            <Link
              href='/image'
              className='w-[60px] py-1 mx-2 border-2 border-[#A0A1A4] rounded-[6px] hover:bg-[#282828] lg:w-[55px] lg:mx-1 sm:hidden'>
              <FaRegImages className='mx-auto' />
            </Link>
            <Link
              href='/video'
              className='w-[60px] py-1 mx-2 border-2 border-[#A0A1A4] rounded-[6px] hover:bg-[#282828] lg:w-[55px] lg:mx-1 sm:hidden'>
              <FaPhotoVideo className='mx-auto' />
            </Link>

            <button
              onClick={() => setOpenAddModal(!openAddModal)}
              className='flex justify-center items-center w-[60px] py-1 mx-2 text-center border-2 border-[#A0A1A4] rounded-[6px] hover:bg-[#282828] lg:w-[55px] lg:mx-1'>
              <FaPlus className='text-[12px] mr-1' />
              <FaRegImage />
            </button>
            {/* </div> */}
            <Transition.Root show={openAddModal} as={Fragment}>
              <Dialog
                as='div'
                className='relative z-10'
                initialFocus={cancelButtonImageRef}
                onClose={setOpenAddModal}>
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
                  <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
                    <Transition.Child
                      as={Fragment}
                      enter='ease-out duration-300'
                      enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                      enterTo='opacity-100 translate-y-0 sm:scale-100'
                      leave='ease-in duration-200'
                      leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                      leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                      <Dialog.Panel className='max-w-[800px] w-full lg:max-w-[800px] relative transform overflow-hidden rounded-lg bg-black text-[#f3f3f3] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:mx-5'>
                        <div className='px-4 pt-3 pb-4 mb-2 sm:p-6 sm:px-2 sm:pb-4'>
                          <div className='sm:flex sm:items-start'>
                            <div className='mt-2 text-center sm:mt-0 sm:ml-2 sm:text-left'>
                              <Dialog.Title
                                as='h2'
                                className='text-[24px] font-semibold'>
                                Upload Media
                              </Dialog.Title>
                              <div className='mt-5'>
                                <div className='flex justify-between items-center max-w-[200px] px-2 py-2 my-5 border-2 border-[#A0A1A4] rounded'>
                                  <label
                                    htmlFor='file_input'
                                    className='flex items-center mr-3 text-[30px] sm:text-[20px]'>
                                    <MdOutlineAddPhotoAlternate />
                                  </label>
                                  <input
                                    id='file_input'
                                    name='file'
                                    type='file'
                                    accept='image/*, video/*'
                                    multiple
                                    onChange={handleInputChange}
                                    className=''
                                  />
                                </div>
                                <div className='grid grid-cols-6 gap-2 sm:grid-cols-4'>
                                  {previewSource &&
                                    previewSource.map(
                                      (item: any, index: number) => (
                                        <div
                                          key={index}
                                          className='relative flex justify-center items-center max-h-[150px] border-[1px] border-[#585555] rounded overflow-hidden sm:h-[80px]'>
                                          {item.startsWith('data:image') ? (
                                            <div className=''>
                                              <Image
                                                src={item}
                                                alt='choosen'
                                                className='max-w-[150px] max-h-[150px] object-contain sm:max-w-[80px]'
                                                width={720}
                                                height={580}
                                              />
                                              <div className='absolute top-0 right-0 w-[20px] h-[20px] bg-[#3e4042] rounded-bl sm:w-[15px] sm:h-[15px]'>
                                                <BsXLg
                                                  onClick={() =>
                                                    handleDeletePreview(index)
                                                  }
                                                  className='p-[3px] text-[20px] z-100 cursor-pointer sm:text-[15px]'
                                                />
                                              </div>
                                            </div>
                                          ) : (
                                            <div>
                                              <video
                                                muted
                                                controls
                                                id='video-tag'
                                                className='w-auto max-h-[150px] sm:max-h-[80px]'>
                                                <source
                                                  id='video-source'
                                                  src={item}
                                                />
                                              </video>
                                              <div className='absolute top-0 right-0 w-[20px] h-[20px] bg-[#313131] rounded-bl'>
                                                <BsXLg
                                                  onClick={() =>
                                                    handleDeletePreview(index)
                                                  }
                                                  className='p-[3px] text-[20px] z-100 cursor-pointer'
                                                />
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='flex justify-end px-4 py-3 bg-[#151718]'>
                          <button
                            type='button'
                            className='inline-flex w-[100px] justify-center rounded-md bg-white text-gray-900 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-[#cccccc] sm:ml-3 sm:w-auto sm:px-5'
                            onClick={handleSubmit}>
                            Upload
                          </button>
                          <button
                            type='button'
                            className='inline-flex w-[100px] justify-center px-3 py-2 ml-4 rounded-md bg-[#000] text-white text-sm font-semibold shadow-sm hover:bg-[#3a3a3a] sm:mt-0 sm:w-auto sm:px-5'
                            onClick={() => {
                              setOpenAddModal(false);
                              setPreviewSource([]);
                            }}
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

            <div
              ref={menuRef}
              onClick={() => setShowHeaderMenu(!showHeaderMenu)}
              className='relative py-1 ml-5 lg:ml-3 sm:hidden'>
              <div className='flex items-center w-full hover:text-[#A0A1A4] hover:cursor-pointer'>
                <FaUserCircle className='text-[28px]' />
                <span className='w-full ml-1 text-[16px] text-ellipsis overflow-hidden ...'>
                  {user.username}
                </span>
              </div>
              {showHeaderMenu ? (
                <ul className='w-[130px] text-[16px] absolute top-[38px] left-0 bg-black border-2 border-[#646464] rounded z-10'>
                  <Link href='/profile'>
                    <li className='px-5 py-2 border-b-[1px] border-[#282828] hover:bg-[#282828] hover:cursor-pointer'>
                      Profile
                    </li>
                  </Link>
                  <li className='px-5 py-2 border-b-[1px] border-[#282828] hover:bg-[#282828] hover:cursor-pointer'>
                    Bla ...
                  </li>
                  <li
                    onClick={handleLogout}
                    className='px-5 py-2 border-b-[1px] border-[#282828] hover:bg-[#282828] hover:cursor-pointer'>
                    Đăng xuất
                  </li>
                </ul>
              ) : (
                <></>
              )}
            </div>
            <FaBars
              onClick={() => handleOpenMobileMenu()}
              className='hidden ml-10 sm:block'
            />
            {openMobileMenu ? (
              <div>
                <div
                  className={`absolute top-0 right-0 w-[120px] h-[100vh] bg-[#000] border-[#414141] border-l-[1px] z-[69] transform ${
                    openMobileMenu
                      ? 'translate-x-[0%]'
                      : 'translate-x-[100%] ease-in-out duration-300'
                  }`}>
                  <BsXLg
                    onClick={() => handleOpenMobileMenu()}
                    className='absolute top-[10px] left-[10px]'
                  />
                  <ul className='mt-8'>
                    <Link
                      href='/profile'
                      onClick={() => handleOpenMobileMenu()}>
                      <li className='flex items-center w-full px-5 py-3 border-[#414141] border-b-[1px] hover:bg-[#1d1d1d] hover:text-[#A0A1A4] hover:cursor-pointer'>
                        <FaUserCircle className='text-[24px]' />
                        <span className='w-full ml-1 text-[14px] text-ellipsis overflow-hidden ...'>
                          {user.username}
                        </span>
                      </li>
                    </Link>
                    <Link href='/image' onClick={() => handleOpenMobileMenu()}>
                      <li className='px-5 py-3 border-[#414141] border-b-[1px] hover:bg-[#1d1d1d]'>
                        <FaRegImages className='w-full py-[3px] mx-auto border-[1px] border-[#585555] rounded text-[26px]' />
                      </li>
                    </Link>
                    <Link href='/video' onClick={() => handleOpenMobileMenu()}>
                      <li className='px-5 py-3 border-[#414141] border-b-[1px] hover:bg-[#1d1d1d]'>
                        <FaPhotoVideo className='w-full py-[3px] mx-auto border-[1px] border-[#585555] rounded text-[26px]' />
                      </li>
                    </Link>
                    <li
                      onClick={handleLogout}
                      className='px-5 py-1 py-3 border-b-[1px] border-[#282828] text-[14px] whitespace-nowrap hover:bg-[#1d1d1d] hover:cursor-pointer'>
                      Đăng xuất
                    </li>
                  </ul>
                </div>
                <div
                  onClick={() => handleOpenMobileMenu()}
                  className='fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.5)] z-[68]'></div>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
