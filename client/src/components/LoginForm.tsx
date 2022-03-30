import React, { FC, useContext, useState } from "react";
import { Context } from "..";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);
  return (
    <div>
      <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
      <button>Registration</button>
    </div>
  );
};

export default LoginForm;
