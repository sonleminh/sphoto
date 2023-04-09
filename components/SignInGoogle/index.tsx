import React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/Redux/hooks';
import { signInWithGoogle } from '@/services/firebase';
import axiosClient from '@/api/axiosClient';
import { login } from '@/Redux/slice/userSlice';

import { toast } from 'react-toastify';

const SignInGoogle = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLoginGoogle = async () => {
    try {
      const res: any = await signInWithGoogle();
      console.log(res);

      const data = {
        username: res.user.displayName,
        email: res.user.email,
      };
      try {
        const signUpRes: any = await axiosClient.post(
          '/api/login-google',
          data
        );
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
        const { _id, username, email, createdAt } = signUpRes.user;
        dispatch(login({ _id, username, email, createdAt }));
      } catch (error: any) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button onClick={handleLoginGoogle} className='login-with-google-btn'>
      Sign in with Google
    </button>
  );
};

export default SignInGoogle;
