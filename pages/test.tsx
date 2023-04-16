import React, { useRef } from 'react';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import Image from 'next/image';
import banner from '../assets/banner.png';
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.jpg';
import banner4 from '../assets/banner2-mobile.jpg';
import Link from 'next/link';
import { useSpring, animated } from 'react-spring';
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import { MyPage } from '@/page';

const Test: MyPage = () => {
  const parallax = useRef<IParallax>(null!);
  const fadeInDown = useSpring({
    from: {
      opacity: 0,
      translateY: '-300px',
    },
    to: {
      opacity: 1,
      translateY: '0px',
    },
    delay: 200,
  });
  return (
    <div style={{ width: '100%', height: '100%', background: '#253237' }}>
      <Parallax ref={parallax} pages={3}>
        <ParallaxLayer
          offset={0}
          speed={0.2}
          onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '50px',
          }}>
          <animated.div
            style={fadeInDown}
            className="flex items-center justify-center w-full h-full my-auto bg-[url('../assets/banner.png')] bg-cover sm:bg-[url('../assets/banner-mobile.png')] sm:bg-center"></animated.div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={0}
          speed={-0.5}
          onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <animated.div
            style={fadeInDown}
            className='mb-[40px] text-[#f0f0f0] text-center sm:mb-[20px]'>
            <div className='mb-5 text-[26px] sm:mb-2 sm:text-[22px]'>
              The home for your memories
            </div>
            <Link href='/login'>
              <button className='px-6 py-1.5 border-2 border-[#A0A1A4] rounded text-[18px] hover:bg-[#151515] sm:text-[16px]'>
                Go to sphoto
              </button>
            </Link>
          </animated.div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1}
          speed={-0.2}
          onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <div className='flex justify-start items-center w-full h-[100vh]'>
            <div className='w-[35%] text-[30px] text-[#f0f0f0] text-center sm:w-full sm:mb-[40%] sm:text-[24px]'>
              A simple gallery using Next.js
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1.3}
          speed={0.2}
          style={{ pointerEvents: 'none' }}>
          <div className='w-[55%] ml-[35%] sm:mt-[35%] sm:ml-[10%] '>
            <Image src={banner1} alt='c' width={620} height={620} />
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1.5}
          speed={-0.5}
          style={{ pointerEvents: 'none' }}>
          <div className='w-[55%] ml-[55%] sm:mt-[15%] sm:ml-[35%]'>
            <Image src={banner2} alt='c' width={620} height={620} />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={0.5}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => parallax.current.scrollTo(0)}>
          <div className='flex items-center w-full h-[100vh] mt-[5%] bg-black'>
            <div className='w-full object-cover sm:hidden'>
              <Image src={banner3} alt='c' width={700} height={700} />
            </div>
            <div className='w-full object-cover hidden sm:block'>
              <Image src={banner4} alt='c' width={700} height={700} />
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={2.5} speed={-0.2}>
          <div className='w-full ml-[55%] text-[#f0f0f0] sm:text-center sm:ml-0 sm:text-white'>
            <div className='w-full mb-5 text-[26px] sm:text-[22px]'>
              More ways to enjoy your photos
            </div>
            <button className='px-6 py-1.5 border-2 border-[#A0A1A4] rounded text-[18px] hover:bg-[#151515] sm:text-[16px]'>
              Learn more
            </button>
          </div>
          ;
        </ParallaxLayer>
        <ParallaxLayer offset={2.945} speed={0}>
          <div className='flex justify-center py-3 text-[#c2c2c2] border-t-2 border-[#313131]'>
            <div className='mr-5'>©Copyright. All rights reserved.</div>
            <div className='flex'>
              <a href='https://www.facebook.com/sonlele2'>
                <FaFacebookSquare className='mx-1.5 text-[22px]' />
              </a>
              <a href='https://github.com/sonleminh'>
                <FaGithubSquare className='mx-1.5 text-[22px]' />
              </a>
              <a href='https://www.linkedin.com/in/son-le-028715261/'>
                <FaLinkedin className='mx-1.5 text-[22px]' />
              </a>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Test;

Test.Layout = 'Default';
