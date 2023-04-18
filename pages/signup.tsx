import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash, FaUserCircle, FaEnvelope } from 'react-icons/fa';
import { TiLockClosedOutline } from 'react-icons/ti';
import Image from 'next/image';
import logo from '../assets/sphoto-logo.png';
import Link from 'next/link';
import axiosClient from '@/api/axiosClient';
import { toast } from 'react-toastify';
import SignInGoogle from '@/components/SignInGoogle';
import { MyPage } from '@/page';

interface signUpValueForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: MyPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoad, setIsLoad] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, 'Must be more than 6 characters')
      .required('Username is required!'),
    email: Yup.string().email().required('Email is required!'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().test(
      'passwords-match',
      'Passwords must match',
      function (value) {
        return this.parent.password === value;
      }
    ),
  });

  const handleSignUpFormSubmit = async (values: signUpValueForm) => {
    const { username, email, password } = values;
    try {
      await axiosClient.post('/api/signup', {
        username,
        email,
        password,
      });
      toast.success('Đăng ký thành công', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error: any) {
      console.log(error);
      const errMessage = error.response.data;
      toast.error(errMessage.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  return (
    <main>
      <div className='flex justify-center items-center h-[100vh] pt-10 text-[#eeeeee]'>
        <video
          autoPlay
          loop
          muted
          className='fixed top-0 min-w-full min-h-full z-[-1] object-fill'>
          <source src='/bg-video.mp4' type='video/mp4' />
        </video>
        <div className='max-w-[400px] w-full border-2 border-[#A0A1A4] rounded-[6px] sm:w-[80%]'>
          <div className='flex items-center justify-between mx-10 mt-5 '>
            <p className='text-[24px] font-bold'>Đăng ký</p>
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
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleSignUpFormSubmit(values);
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
                      className='w-full h-full pl-12 pr-3 my-3 border-[2px] border-[#A0A1A4] rounded bg-black autofill:bg-none sm:text-[14px]'
                    />
                  </div>
                  <div className='flex h-[40px] items-center px-10 my-5 sm:px-8'>
                    <FaEnvelope className='absolute w-10 h-10 p-2.5 border-r-[2px] border-[#A0A1A4] rounded-tl rounded-bl' />
                    <Field
                      id='email'
                      name='email'
                      placeholder='Nhập email của bạn'
                      type='email'
                      className='w-full h-full pl-12 pr-3 my-3 border-[2px] border-[#A0A1A4] rounded bg-black autofill:bg-none sm:text-[14px]'
                    />
                  </div>
                  <div className='relative flex h-[40px] items-center px-10 my-5 sm:px-8'>
                    <TiLockClosedOutline className='absolute w-10 h-10 p-2 text-[28px] border-r-[2px] border-[#A0A1A4] rounded-tl rounded-bl' />
                    <Field
                      id='password'
                      name='password'
                      placeholder='Tạo mật khẩu có ít nhất 6 kí tự'
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
                  <div className='relative flex h-[40px] items-center px-10 my-5 sm:px-8'>
                    <TiLockClosedOutline className='absolute w-10 h-10 p-2 text-[28px] border-r-[2px] border-[#A0A1A4] rounded-tl rounded-bl' />
                    <Field
                      id='confirmPassword'
                      name='confirmPassword'
                      placeholder='Nhập lại mật khẩu'
                      type={showConfirmPassword ? 'text' : 'password'}
                      className='w-full h-full pl-12 pr-3 my-3 border-[2px] border-[#A0A1A4] rounded bg-black sm:text-[14px]'
                    />
                    <button
                      type='button'
                      onClick={() =>
                        setShowConfirmPassword(
                          (showConfirmPassword) => !showConfirmPassword
                        )
                      }
                      className='absolute top-[10px] right-[50px] text-[#eeeeee] sm:right-[44px]'>
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  <div className='mx-10 sm:mx-8'>
                    <button
                      type='submit'
                      disabled={!isValid}
                      className='w-full px-2 py-1.5 border-2 border-[#A0A1A4] rounded-[6px] hover:bg-[#282828] disabled:cursor-not-allowed
                        disabled:bg-black disabled:text-[#333] disabled:border-[#333]'>
                      Đăng ký
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
              <span className='text-[#a2a2a2]'>Bạn đã có tài khoản?</span>{' '}
              <Link href='/login'>Đăng nhập</Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;

SignUp.Layout = 'NoFooter';
