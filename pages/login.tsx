import React, { useState } from 'react';
import { signInWithGoogle } from '../services/firebase';
import Header from '@/components/Header';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash, FaUserCircle } from 'react-icons/fa';
import { TiLockClosedOutline } from 'react-icons/ti';
import Image from 'next/image';
import logo from '../assets/sphoto-logo.png';
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import Link from 'next/link';
import { toast } from 'react-toastify';
import axiosClient from '@/api/axiosClient';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/Redux/hooks';
import { login } from '@/Redux/slice/userSlice';
import backgroundImage from '../assets/background.jpg';
import SignInGoogle from '@/components/SignInGoogle';
// import bgVideo from '../public/background-video.mp4';

interface loginValueForm {
  username: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, 'Must be more than 6 characters')
      .required('Username is required!'),
    password: Yup.string().required('Password is required'),
  });

  const handleLoginFormSubmit = async (values: loginValueForm) => {
    try {
      // const { username, password } = values;
      const response: any = await axiosClient.post('/api/login', values);
      console.log(response);
      if (response.message === 'Username or password is incorrect') {
        toast.error('Sai tên người dùng hoặc mật khẩu', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        router.push('/');
        toast.success('Đăng nhập thành công', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        const { _id, username, email, createdAt } = response;
        dispatch(login({ _id, username, email, createdAt }));
      }
    } catch (error: any) {
      console.log(error);
      const errMessage = error.response.data;
      toast.error(
        errMessage.message,
        // , vui lòng kiểm tra email để xác thực tài khoản!',
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        }
      );
    }
  };
  return (
    <main>
      <div className='flex justify-center items-center h-[100vh] text-[#eeeeee]'>
        <video
          autoPlay
          loop
          muted
          className='fixed top-0 min-w-full min-h-full z-[-1] object-fill'>
          <source src='/bg-video.mp4' type='video/mp4' />
        </video>
        <div className='flex max-w-[1000px] w-full border-2 border-[#414141] rounded-[6px] overflow-hidden mx-10'>
          <div className='relative w-full p-3 bg-[#000000] border-r-2 border-[#414141] text-center sm:hidden'>
            <p className='text-[32px]'>𝑺𝒂𝒗𝒆 𝒚𝒐𝒖𝒓 𝒎𝒐𝒎𝒆𝒏𝒕𝒔</p>
            <Image
              src={banner1}
              alt='c'
              width={360}
              height={360}
              className='absolute top-[80px] left-[30px] border-[1px] border-[#151515] rounded-[6px]'
            />
            <Image
              src={banner2}
              alt='c'
              width={360}
              height={360}
              className='absolute bottom-[30px] right-[30px] border-[1px] border-[#151515] rounded-[6px]'
            />
          </div>
          <div className='max-w-[400px] w-full py-5 sm:mx-auto sm:text-center'>
            <div className='flex items-center justify-between mx-10 mt-5 '>
              <p className='text-[24px] font-bold'>Đăng nhập</p>
              <Image
                src={logo}
                className='max-h-[50px] object-cover'
                width={100}
                height={100}
                alt='logo'
              />
            </div>

            <Formik
              initialValues={{
                username: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                handleLoginFormSubmit(values);
                actions.setSubmitting(false);
              }}>
              {(formikProps) => {
                const { isValid } = formikProps;
                return (
                  <Form>
                    <div className='flex h-[40px] items-center px-10 my-5 sm:px-8'>
                      <FaUserCircle className='absolute w-10 h-10 p-2.5 border-r-[2px] border-[#A0A1A4] rounded-tl rounded-bl' />
                      <Field
                        id='username'
                        name='username'
                        placeholder='Nhập tên đăng nhập của bạn'
                        type='username'
                        className='w-full h-full pl-12 pr-3 my-3 border-[2px] border-[#A0A1A4] rounded bg-black sm:text-[14px]'
                      />
                    </div>
                    <div className='relative flex h-[40px] items-center px-10 my-5 sm:px-8'>
                      <TiLockClosedOutline className='absolute w-10 h-10 p-2 text-[28px] border-r-[2px] border-[#A0A1A4] rounded-tl rounded-bl' />
                      <Field
                        id='password'
                        name='password'
                        placeholder='Nhập mật khẩu của bạn'
                        type={showPassword ? 'text' : 'password'}
                        className='w-full h-full pl-12 pr-3 my-3 border-[2px] border-[#A0A1A4] rounded bg-black sm:text-[14px]'
                      />
                      <button
                        type='button'
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                        className='absolute top-[10px] right-[50px] text-[#eeeeee] sm:right-[44px]'>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>

                    <div className='mx-10 sm:mx-8'>
                      <button
                        type='submit'
                        disabled={!isValid}
                        className='w-full px-2 py-1.5 border-2 border-[#A0A1A4] rounded-[6px] hover:bg-[#282828] disabled:cursor-not-allowed
                            disabled:bg-black disabled:text-[#333] disabled:border-[#333]'>
                        Đăng nhập
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <div className='w-full mt-7 mb-5 text-center'>
              <SignInGoogle />
            </div>
            <div className='w-full text-center'>
              <button className='mb-3'>
                <span className='text-[#a2a2a2]'>Chưa có tài khoản?</span>{' '}
                <Link href='/signup'>Đăng ký</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
