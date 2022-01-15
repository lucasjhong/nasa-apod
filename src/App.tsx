import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { Button, CircularProgress, Pagination } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Card from './Components/Card';
import { Post } from './utils/api';
import DateSelect from './Components/DateSelect';
import theme from './utils/theme';
import dayjs from 'dayjs';

const App = () => {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [dateStart, setDateStart] = useState<string | undefined>();
	const [dateEnd, setDateEnd] = useState<string | undefined>();
	const [page, setPage] = useState<number>(1);

	// number of items to display on the page
	const pageItemCount = 6;
	const dateFormat = 'YYYY-MM-DD';

	const getDataFromDate = () => {
		setLoading(true);
		// Day.js will convert the date into YYYY-MM-DD format
		Post.getSelect(dayjs(dateStart).format(dateFormat), dayjs(dateEnd).format(dateFormat))
			.then((data) => {
				setData(data);
				setLoading(false);
				setPage(1);
			})
			.catch((err) => {
				setLoading(false);
				console.error(err);
			});
	};

	const handleChange = (event: React.ChangeEvent<any>, page: number) => {
		setPage(page);
	};

	// Retrieves random APOD on load. Default value = 24
	useEffect(() => {
		setLoading(true);
		Post.getRandom()
			.then((data) => {
				setData(data);
				console.log(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<div className={styles.main}>
				<h2>NASA Astronomy Picture of the Day</h2>
				<h4>Set Date Range</h4>
				<div className={styles.dateSelect}>
					<DateSelect date={dateStart} setDate={setDateStart} maxDate={dateEnd} label='Start' />
					<DateSelect date={dateEnd} setDate={setDateEnd} minDate={dateStart} label='End' />
					<Button variant='contained' disabled={!dateStart} onClick={() => getDataFromDate()}>
						Get images
					</Button>
				</div>

				<div className={styles.cardContainer}>
					{loading ? (
						<CircularProgress />
					) : (
						data.slice((page - 1) * pageItemCount, page * pageItemCount).map((item, index) => {
							return <Card {...item} key={index} />;
						})
					)}
				</div>
				<Pagination
					count={Math.ceil(data.length / pageItemCount)}
					page={page}
					color='primary'
					onChange={handleChange}
					className={styles.pagination}
					sx={{ marginBottom: '10vh' }}
				/>
			</div>
		</ThemeProvider>
	);
};

export default App;
