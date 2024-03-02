import {initializeApp} from 'firebase/app';
import {getAuth,
    signInWithRedirect,
    GoogleAuthProvider,
    signInWithPopup} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    Firestore
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDNIUCxEBQ6P9iHzGrdIHZxKIikK1ymNn8",
    authDomain: "clothing-db-251b8.firebaseapp.com",
    projectId: "clothing-db-251b8",
    storageBucket: "clothing-db-251b8.appspot.com",
    messagingSenderId: "444577313985",
    appId: "1:444577313985:web:1cac943faaf3d3613a9040"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);

    if(!userSnapShot.exists()){
        const{displayName, email} = userAuth;
        const createdAt = new Date();
        
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }
        catch(error){
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
  };