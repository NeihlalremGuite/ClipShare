import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteComment } from "../redux/commentSlice";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  width: 100%;
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const DeleteButton = styled.button`
  height: 30px;
  width: 40px;
  cursor: pointer;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: flex-end;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  flex: 7;
  font-size: 14px;
  text-align: left;
`;

const axiosInstance  = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const Comment = ({ comment}) => {
  const [deleted, setDeleted] = useState(false);
  const [channel, setChannel] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axiosInstance.get(`/users/find/${comment.userId}`);
        setChannel(res.data);
      } catch (err) {
        console.error('Error fetching channel:', err);
      }
    };
    fetchComment();
  }, [comment.userId]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/comments/${comment._id}`);
      dispatch(deleteComment(comment._id));
      setDeleted(true);
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  if (deleted) {
    return null; // Render nothing if the comment is deleted
  }

  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Name>
          {channel.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Wrapper>
          <Text>{comment.desc}</Text>         
            <DeleteButton onClick={handleDelete}>
              <DeleteIcon />
            </DeleteButton>          
        </Wrapper>
      </Details>
    </Container>
  );
};

export default Comment;
