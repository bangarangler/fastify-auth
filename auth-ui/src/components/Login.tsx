import { useReducer } from "react";
import { useLogin } from "../rq-hooks/useLogin";
enum LoginActionChoices {
  FIELD,
}

type LoginActions = {
  type: LoginActionChoices.FIELD;
  field: string;
  value: string;
};

type LoginState = {
  email: string;
  password: string;
};

const loginReducer = (state: LoginState, action: LoginActions) => {
  switch (action.type) {
    case LoginActionChoices.FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
  }
};

const initState: LoginState = {
  email: "",
  password: "",
};
export const Login = () => {
  const [loginState, dispatch] = useReducer(loginReducer, initState);
  const { email, password } = loginState;
  const { mutate } = useLogin({
    onSuccess: (data: any) => {
      console.log("data from login", data);
    },
    onError: (err: any) => {
      console.log("err from login", err);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ email, password });
      }}>
      <input
        type="email"
        value={email}
        onChange={(e) =>
          dispatch({
            type: LoginActionChoices.FIELD,
            field: "email",
            value: e.target.value,
          })
        }
      />
      <input
        type="password"
        value={password}
        onChange={(e) =>
          dispatch({
            type: LoginActionChoices.FIELD,
            field: "password",
            value: e.target.value,
          })
        }
      />
      <button type="submit">Login</button>
    </form>
  );
};
