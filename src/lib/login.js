import { useGoogleLogin } from "@react-oauth/google";
import { googleLogin } from "@/service/auth";
import {toast} from "react-toastify";

const useLogin = () => {

  const login = useGoogleLogin({
    hosted_domain: "dimigo.hs.kr",
    flow: "auth-code",
    ux_mode: "popup",
    redirect_uri: "https://localhost:3000",
    onSuccess: async (auth) => {
      try {
        await googleLogin(auth.code);
        window.location.href = '/';
      } catch (error) {
        console.error('Login failed:', error);
        toast.error('로그인에 실패했습니다.');
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error('로그인에 실패했습니다.');
    },
  });

  return { login };
};

export { useLogin };