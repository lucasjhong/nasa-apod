import { Button } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import styles from './Card.module.scss';
import LikeButton from './LikeButton';

interface Props {
	title: string;
	date: string;
	explanation: string;
	url: string;
	hdurl: string;
}

const openInNewTab = (url: string) => {
	const newWindow = window.open(url, '_blank', 'noopener, noreferrer');
	if (newWindow) newWindow.opener = null;
};

const Card: React.FC<Props> = ({ title, date, explanation, url, hdurl }) => {
	const [like, setLike] = useState<boolean>(false);

	// onClick={() => openInNewTab(hdurl)}
	return (
		<div className={styles.card}>
			<img className={styles.background} alt={title} src={url} />
			<div className={styles.info}>
				<h3>{title}</h3>
				<hr />
				<p className={styles.description}>{explanation}</p>
				<Button
					sx={{ height: '24px', width: '120px', margin: '18px' }}
					onClick={() => openInNewTab(hdurl)}
				>
					Full image
				</Button>
			</div>

			<div className={styles.utilityInfo}>
				<ul className={styles.utilityList}>
					<li className={styles.date}>{dayjs(date).format('L')}</li>
					<LikeButton like={like} setLike={setLike} />
				</ul>
			</div>
			<div className={styles.gradientOverlay}></div>
			<div className={styles.colorOverlay}></div>
		</div>
	);
};

export default Card;
