import {
  signinUser,
  signupUser,
  sendEmailVerificationLink,
  verifyEmail,
} from "../api/unauthenticatedRequests";
import { refreshSession } from "../api/authenticatedRequests";

export const signin = async (userDetails) => {
  const response = await signinUser(userDetails);

  return _returnResponse(response);
};

export const signup = async (userDetails) => {
  const response = await signupUser(userDetails);
  return _returnResponse(response);
};

export const send_email_verification_link = async (email) => {
  const response = await sendEmailVerificationLink(email);
  return _returnResponse(response);
};

export const verify_email = async (token) => {
  const response = await verifyEmail(token);
  return _returnResponse(response);
};
export const refresh = async () => {
  const response = await refreshSession();
  return _returnResponse(response);
};

const _returnResponse = (response) => {
  switch (true) {
    case response?.status === 200:
      return {
        status: "success",
        data: response?.data,
        message: response?.data?.message,
      };
    case response?.status >= 400 && response?.status < 500:
      return {
        status: "error",
        message: response?.data?.message || "Bad request",
      };
    case response?.status >= 500 && response?.status <= 600:
      return {
        status: "error",
        message: response?.data?.message,
      };
    default:
      return {
        status: "error",
        message: "Something wrong happened",
      };
  }
};
