import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Upload } from "./Upload";
import { logout } from "../redux/userSlice";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 38%;
  position: absolute;
  left: 0px;
  right: 15%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state)=>state.user); // Fetching current logged in user using state from redux

    const handleLogout = async (e) =>{
      
      dispatch(logout());
    }
    return (
        <>
            <Container>
                <Wrapper>
                    <Search>
                        <Input 
                            placeholder="Search"
                            onChange={(e) => setQ(e.target.value)}
                        />
                        <SearchOutlinedIcon style={{cursor:"pointer"}} onClick={()=> navigate(`/search?q=${q}`)}/>

                    </Search>
                    
                    {currentUser ? (
                        <User>
                        <VideoCallOutlinedIcon style={{cursor:"pointer"}} onClick={() => setOpen(true)} />
                        <Avatar  src={currentUser.img}/>
                        {currentUser.name}

                        <Button onClick={handleLogout}>
                            SIGN OUT
                        </Button>
                        </User>
                    ) : (
                        <Link to="signin" style={{ textDecoration: "none" }}>
                        <Button>
                            <AccountCircleIcon />
                            SIGN IN
                        </Button>
                        </Link>
                    )}

                </Wrapper>
            </Container>
        {open && <Upload setOpen={setOpen}/>}
        </>
    )
}
export default Navbar