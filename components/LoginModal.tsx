import { NextComponentType } from "next";
import { Input } from "./Input";
import Button from "../components/Button";

const LoginModal: NextComponentType = () => {
  return (
    <div className="flex flex-col items-center gap-5 text-white">
      <p className="text-2xl font-bold uppercase text-primary-500">Login</p>
      <Input name="email" label="Email" type={"email"} />
      <Input name="password" label="Password" type={"password"} />
      <Button>Sign In</Button>
    </div>
  );
};

export default LoginModal;
