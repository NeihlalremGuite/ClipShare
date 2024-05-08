import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 2;
`;


const axiosInstance  = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});


const Recommendations = ({ tags }) => {
  const [videos, setVideos] = useState([]);
  const { currentVideo} = useSelector((state) => state.video);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axiosInstance.get(`/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) =>
        video._id !== currentVideo._id && (
          <Card type="sm" key={video._id} video={video} />
        )
      )}
    </Container>
  );
};

export default Recommendations;