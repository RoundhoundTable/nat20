import { NextComponentType } from "next";
import { Input } from "./Input";
import Button from "./Button";

const RegisterModal: NextComponentType = () => {
  return (
    <div className="flex flex-col items-center gap-5 text-white">
      <p className="text-2xl font-bold uppercase text-primary-500">Register</p>
      <Input name="email" label="Email" type={"email"} />
      <Input name="username" label="Username" type={"text"} />
      <Input name="password" label="Password" type={"password"} />
      <Input
        name="confirmPassword"
        label="Confirm password"
        type={"password"}
      />
      <Button>Sign Up</Button>
    </div>
  );
};

export default RegisterModal;
