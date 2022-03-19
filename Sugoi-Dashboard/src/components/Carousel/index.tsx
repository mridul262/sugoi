import React, { ReactNode } from 'react';
import RightArrow from '../../Assets/rightArrow.svg';
import LeftArrow from '../../Assets/leftArrow.svg';

/* Styling */
import styles from './index.module.scss';

interface Props {
	items: ReactNode[];
	className?: string;
}

const Carousel: React.FC<Props> = (props) => {
	const { items, className } = props;

	const ITEMS_TO_SHOW = 2;

	const [startIndex, setStartIndex] = React.useState(0);
	const [endIndex, setEndIndex] = React.useState(0 + ITEMS_TO_SHOW - 1);
	const handleIncrementIndex = () => {
		setStartIndex(startIndex + 1);
		setEndIndex(endIndex + 1);
	};

	const handleDecrementIndex = () => {
		setStartIndex(startIndex - 1);
		setEndIndex(endIndex - 1);
	};

	return (
		<div>
			<div className={`${styles.mainContentWrapper} ${className}`}>
				{startIndex !== 0 ? (
					<button className={styles.arrowButton} onClick={handleDecrementIndex}>
						<img src={LeftArrow} alt="right arrow" />
					</button>
				) : (
					<div />
				)}
				<div className={styles.itemsWrapper}>
					{items.map((item: ReactNode, index: number) => {
						if (index >= startIndex && index <= endIndex) {
							return <span key={index}>{item}</span>;
						} else {
							return null;
						}
					})}
				</div>
				{endIndex !== items.length - 1 ? (
					<button className={styles.arrowButton} onClick={handleIncrementIndex}>
						<img src={RightArrow} alt="right arrow" />
					</button>
				) : (
					<div />
				)}
			</div>
		</div>
	);
};

export default Carousel;
