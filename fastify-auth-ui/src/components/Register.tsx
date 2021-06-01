import { useReducer } from "react";
import { useRegister } from "../rq-hooks";
enum RegisterActionChoices {
  FIELD,
}

type RegisterActions = {
  type: RegisterActionChoices.FIELD;
  field: string;
  value: string;
};

type RegisterState = {
  email: string;
  password: string;
};

const registerReducer = (state: RegisterState, action: RegisterActions) => {
  switch (action.type) {
    case RegisterActionChoices.FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
  }
};

const initState: RegisterState = {
  email: "",
  password: "",
};
export const Register = () => {
  const [regState, dispatch] = useReducer(registerReducer, initState);
  const { email, password } = regState;
  const { mutate } = useRegister();
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
            type: RegisterActionChoices.FIELD,
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
            type: RegisterActionChoices.FIELD,
            field: "password",
            value: e.target.value,
          })
        }
      />
      <button type="submit">Register</button>
    </form>
  );
};
