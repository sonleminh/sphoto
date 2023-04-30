// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyATdIQod3BYusuguqvE1y_RJRVcCe7DIU8',
  authDomain: 'sphoto-816b9.firebaseapp.com',
  projectId: 'sphoto-816b9',
  storageBucket: 'sphoto-816b9.appspot.com',
  messagingSenderId: '617572819680',
  appId: '1:617572819680:web:5533f649d4215fd444e685',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

// const router = useRouter();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    return res;
  } catch (error) {
    console.log(error);
  }
};
