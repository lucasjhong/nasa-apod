import React from 'react';
import Heart from 'react-animated-heart';

const LikeButton = ({ like, setLike }) => {
	return <Heart isClick={like} onClick={() => setLike(!like)} />;
};

export default LikeButton;
