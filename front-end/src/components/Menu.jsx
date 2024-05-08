import React from "react";
import styled from "styled-components";
import ClipShare from "../img/logo.png"
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SportsIcon from '@mui/icons-material/Sports';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MovieIcon from '@mui/icons-material/Movie';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import ReportIcon from '@mui/icons-material/Report';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Container = styled.div`
    flex: 1;
    background-color: ${({theme}) => theme.bgLighter};
    height: 100vh;
    color: ${({theme}) => theme.text};
    font-size: 14px;
    position: sticky;
    top:0;
`
const Wrapper = styled.div`
    padding: 18px 26px;
`
const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    margin-bottom: 25px;
`

const Img = styled.img`
    height: 25px;
`
const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 7.5px 0;

    &:hover{
        background-color: ${({theme}) => theme.soft};
    }
`
const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({theme}) => theme.soft};
`
const Login =styled.div``;
const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const Title = styled.h2`
    font-size: 14px;
    font-weight: 500;
    color: #aaaaaa;
    margin-bottom: 20px;

`



const Menu = ({darkMode, setDarkMode}) => {

    const {currentUser} = useSelector(state=>state.user);
    return (
        <Container>
            <Wrapper>
                <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
                    <Logo>
                        <Img src={ClipShare}/>
                        ClipShare
                    </Logo>
                </Link>
                <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
                    <Item>
                        <HomeIcon/>
                        Home
                    </Item>
                </Link>
                
                <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <ExploreIcon />
                        Explore
                    </Item>
                </Link>
                
                <Link to="subscriptions" style={{textDecoration:"none", color:"inherit"}}>
                    <Item>
                        <SubscriptionsIcon/>
                        Subscriptions
                    </Item>
                </Link>
                
                <Hr/>
                <Item>
                    <VideoLibraryIcon/>
                    Library
                </Item>
                <Item>
                    <HistoryIcon/>
                    History
                </Item>
                <Hr/>
                {!currentUser &&
                    <>
                        <Login>
                        Sign in to like videos, comment, and subscribe.
                        <Link to="signin" style={{ textDecoration: "none" }}>
                            <Button>
                            <AccountCircleIcon />
                            SIGN IN
                            </Button>
                        </Link>
                        </Login>
                        <Hr />
                    </>
                    }
                <Title>
                    Best of ClipShare
                </Title>
                <Item>
                    <LibraryMusicIcon/>
                    Music
                </Item>
                <Item>
                    <SportsIcon/>
                    Sports
                </Item>
                <Item>
                    <SportsEsportsIcon/>
                    Gaming
                </Item>
                <Item>
                    <MovieIcon/>
                    Movies
                </Item>
                <Item>
                    <NewspaperIcon/>
                    News
                </Item>
                <Item>
                    <LiveTvIcon/>
                    Live
                </Item>
                <Hr/>
                <Item>
                    <SettingsIcon/>
                    Settings
                </Item>
                <Item>
                    <ReportIcon/>
                    Report
                </Item>
                <Item>
                    <HelpCenterIcon/>
                    Help
                </Item>
                <Item onClick={() => setDarkMode(!darkMode)}>
                    <LightModeIcon/>
                    {darkMode ? "Light": "Dark"} Mode
                </Item>
            </Wrapper>
        </Container>
    )
}
export default Menu