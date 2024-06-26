import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import {auth, provider} from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const axiosInstance  = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const SignIn = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
          const res = await axiosInstance.post("/auth/signin", { name, password });
          dispatch(loginSuccess(res.data));
        } catch (err) {
          dispatch(loginFailure());
        }
    };
    
    const signInWithGoogle = async () => {
        dispatch(loginStart())
        signInWithPopup(auth, provider)
            .then((result) => {
              axiosInstance.post("/auth/google", {
                    name:result.user.displayName,
                    email: result.user.email,
                    img: result.user.photoURL,
                }).then((res)=>{
                    dispatch(loginSuccess(res.data))
                })
            })
            .catch((error) => {
                dispatch(loginFailure());
            });
    };

    const handleSignUp = async (e) => {
      e.preventDefault();
      dispatch(loginStart());
      try {
        const res = await axiosInstance.post("/auth/signup", { name, email, password });
        dispatch(loginSuccess(res.data));
      } catch (err) {
        dispatch(loginFailure());
        alert("Could not signUp. Username or email is already taken")
        
      }
    }

    return(
        <Container>
            <Wrapper>
                <Title>Sign in</Title>
                <SubTitle>to continue to ClipShare</SubTitle>
                <Input
                  placeholder="username"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleLogin}>Sign in</Button>
                <Title>or</Title>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
                <Title>or</Title>
                <Input
                  placeholder="username"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <Input
                  type="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />                
                <Button onClick={handleSignUp}>Sign up</Button>
                
                

            </Wrapper>
            <More>
                English(Us)
                <Links>
                    <Links>Help</Links>
                    <Links>Privacy</Links>
                    <Links>Terms</Links>
                </Links>
            </More>
            
        </Container>
    )
}

export default SignIn;