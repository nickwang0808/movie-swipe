import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/macro";
import { auth } from "../../firebase/config";
import newUserDBInit from "../../Helper/newUserDBInit";
import { Btn, ErrorMessage } from "../../theme/BaseComp";

interface iProps {
  handleSignInEmail: (email: string, password: string) => void;
}

export default function SignInForm({ handleSignInEmail }: iProps) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [signInErr, setSignInErr] = useState<string | null>(null);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (isSignUp) {
      handleSignInEmail(email, password);
      return;
    } else {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          newUserDBInit({
            displayName: email,
            email,
            isAnonymous: false,
            photoURL: "",
            uid: result.user?.uid as string,
          });
        })
        .catch((error) => {
          // Handle Errors here.
          const errorMessage = error.message;
          // console.log(errorMessage);
          setSignInErr(errorMessage);
          // setError(errorMessage);
        });
    }
  };
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

        <StyledSubmit
          as="input"
          type="submit"
          value={isSignUp ? "Sign up with Email" : "Login"}
        />
        {signInErr && <StyledErr>{signInErr}</StyledErr>}

        <StyledLinkish onClick={() => setIsSignUp((prev) => !prev)}>
          {isSignUp ? "Login Instead" : "Don't have an account? Sign Up Here"}
        </StyledLinkish>
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

const StyledLinkish = styled.div`
  margin: 0 auto;
  text-decoration: underline;
  color: var(--dark);
  font-size: 1.8rem;
  line-height: 7rem;
`;

const StyledErr = styled(ErrorMessage).attrs({
  className: "ion-text-center",
})`
  margin: 1rem auto 0 auto;
`;
