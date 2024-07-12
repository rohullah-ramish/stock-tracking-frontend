import { auth } from "..";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

class AuthManager {
  static async signUp(email: string, password: string) {
    try {
      const userCreds = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { success: true, user: userCreds.user };
    } catch (error: any) {
      const code = error.code;
      const message = error.message;

      switch (code) {
        case "auth/email-already-in-use":
          return { success: false, code, message: "Email is already in use." };
        case "auth/weak-password":
          return {
            success: false,
            code,
            message: "Password should be at least 6 characters",
          };
        default:
          return {
            success: false,
            code,
            message,
          };
      }
    }
  }
  static async signIn(email: string, password: string) {
    try {
      const userCreds = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCreds.user };
    } catch (error: any) {
      const code = error.code;
      const message = error.message;

      switch (code) {
        case "auth/invalid-email":
          return { success: false, code, message: "Email is invalid." };
        case "auth/invalid-credential":
          return {
            success: false,
            code,
            message: "Password is incorrect",
          };
        default:
          return {
            success: false,
            code,
            message,
          };
      }
    }
  }
}

export default AuthManager;
