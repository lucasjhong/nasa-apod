import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import styles from './DateSelect.module.scss';
import { TextField } from '@mui/material';

interface Props {
	date: string | undefined;
	setDate: any;
	label: string;
	minDate?: any;
	maxDate?: any;
}

const DateSelect: React.FC<Props> = ({ date, setDate, label, minDate, maxDate }) => {
	return (
		<div className={styles.dateSelect}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker
					disableFuture
					label={label}
					openTo='year'
					views={['year', 'month', 'day']}
					value={date}
					onChange={(newValue) => {
						setDate(newValue);
					}}
					renderInput={(params) => <TextField {...params} />}
					minDate={minDate}
					maxDate={maxDate}
				/>
			</LocalizationProvider>
		</div>
	);
};

export default DateSelect;
