import { REST_BASE_ENDPOINT } from "../constants";
import { useMutation } from "react-query";
// import axios from "axios";
// import { axios } from "../utils/axiosConfig";
import { axios } from "../axiosConfig/axiosConfig";

interface RegisterInput {
  email: string;
  password: string;
}

export function useRegister() {
  console.log("running useLogin");

  return useMutation(async (loginInput: RegisterInput) => {
    try {
      const { data } = await axios.post(
        `${REST_BASE_ENDPOINT}/api/register`,
        loginInput
      );
      console.log("data from useRegister", data);
      if (data.data) {
        return data.data;
      }
    } catch (err) {
      console.log("err from useRegister", err.response.data);
      throw new Error(err.response.data.message);
    }
  });
}
