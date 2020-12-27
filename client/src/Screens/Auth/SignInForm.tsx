import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/macro";
import { Btn } from "../../theme/BaseComp";

interface iProps {
  handleSignInEmail: (email: string, password: string) => void;
}

export default function SignInForm({ handleSignInEmail }: iProps) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = ({ email, password }: { email: string; password: string }) =>
    handleSignInEmail(email, password);
  console.log(errors);

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          ref={register({ required: true })}
        />

        <StyledSubmit as="input" type="submit" value="Sign up with Email" />
      </form>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  margin-top: 3rem;
  width: 100%;
  background-color: #f0f0f0;

  & form {
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    margin: 2rem;
  }

  & input:not(:last-of-type) {
    padding: 1rem;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color: #0b0728;
    border-radius: 4px;
    border: 1px solid var(--dark);
  }

  & input:not(:last-of-type):focus {
    outline: none !important;
    border: 1px solid var(--highlight);
  }

  & label {
    font-size: 2rem;
    padding-bottom: 1rem;
  }
`;

const StyledSubmit = styled(Btn)`
  margin: 2rem auto 0 auto;
  &:active {
    border-color: var(--highlight);
    color: var(--highlight);
  }
`;
