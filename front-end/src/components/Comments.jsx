import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import { addComment } from "../redux/commentSlice";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
    cursor: pointer;
    background-color:#453af6;
    border-radius: 5px;
    height: max-content;
    padding: 10px 10px;
    border: none;
    color: white;
    &:hover{
        background-color: #497cf6;
    }
`

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please sign in to post a comment');
      return;
    }

    try {
      const res = await axios.post('/comments/', { desc: inputValue, videoId });

      // Update local comments state
      setComments((prevComments) => [res.data, ...prevComments]);

      // Dispatch the addComment action
      dispatch(addComment(res.data));

      // Reset the input field
      setInputValue('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input
          placeholder="Add a comment..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={handlePost}>Comment</Button>
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
