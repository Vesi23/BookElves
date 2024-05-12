import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase-config';
import { getDatabase, ref, set } from 'firebase/database';

/**
 * Registers a user with the provided email and password.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns A promise that resolves when the user is successfully registered.
 */
export const registerUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Signs in with Google.
 * @returns {Promise<any>} A promise that resolves with the sign-in result or rejects with an error.
 */
// export const signInWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     return result;
//   } catch (error) {
//     return error;
//   }
// }
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    // The signed-in user info.
    const user = result.user;

    // Get a reference to the database service
    const database = getDatabase();
    
    // Write user data to Realtime Database
    set(ref(database, 'users/' + user.displayName), {
      username: user.uid,
      email: user.email,
      profile_picture: user.photoURL
    });

    return result;
  } catch (error) {
    return error;
  }
}

/**
 * Logs in a user with the provided email and password.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns A promise that resolves to the user's authentication information.
 */
export const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Logs out the user.
 * @returns A promise that resolves when the user is successfully logged out.
 */
export const logoutUser = () => {
  return signOut(auth);
};