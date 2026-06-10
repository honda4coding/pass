import styles from './muiModal.module.scss';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';


import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select from 'react-select';
import { API_URL } from '@/lib/utils/urls';
import axios, { AxiosError } from 'axios';
import { fireSuccess, fireError } from '@/lib/utils/toasts'
import PaypalModal from '../PaypalModal/PaypalModal';

export default function MuiModal(props: any) {
    console.log("props in MuiModal", props.timeslots);
    const [day, setDay] = useState<Dayjs | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [timesPool, setTimesPool] = useState<{ value: string, label: string }[]>();
    const [show, setShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPaypal, setShowPaypal] = useState<boolean>(false);
    const [createdInterviewId, setCreatedInterviewId] = useState<string | null>(null);

    console.log("selectedDate", day);
    console.log("selectedTime", selectedTime);

    const handleClose = () => {
        props.setShowModal(false);
    };

    const handleDaySelection = (d: Dayjs | null) => {
        console.log('changed', d)
        if (d === null) {
            setDay(null);
            setTimesPool([]);
            setSelectedTime(null);
            setShow(false);
            return;
        }

        const decodeDay = d.day();
        console.log("decodeDay", decodeDay)
        const timeslot = props.timeslots.find((ts: any) => ts.day === decodeDay);
        if (!timeslot || !timeslot.hours || timeslot.hours.length === 0) {
            fireError('No available timeslots for this day');
            setDay(null);
            setTimesPool([]);
            setSelectedTime(null);
            setShow(false);
            return;
        }
        const t = timeslot.hours.map((hour: string) => ({ value: hour, label: hour }));
        console.log("timesPool", t);
        setDay(d);
        setTimesPool(t);
        setSelectedTime(null);
        setShow(true);
    }

    const handleTimeSelection = (option: { value: string, label: string }) => {
        setSelectedTime(option.value);
    }

    const handleBook = async () => {
        const timeParts = selectedTime!.match(/(\d+):(\d+)\s*(AM|PM)/i);
        let hours = parseInt(timeParts![1], 10);
        const minutes = timeParts![2];
        const ampm = timeParts![3].toUpperCase();
        if (ampm === 'PM' && hours < 12) hours += 12;
        if (ampm === 'AM' && hours === 12) hours = 0;
        const hh = hours.toString().padStart(2, '0');
        
        let formatDate = day!.format('YYYY-MM-DD') + `T${hh}:${minutes}:00.000Z`;
        console.log(formatDate);
        try {
            setLoading(true)
            const response = await axios.post(`${API_URL}/interviews/`, {
                "interviewer": props.interviewerId,
                "interviewee": props.intervieweeId,
                "date": formatDate
            },
                {
                    headers: {
                        Authorization: `Bearer ${props.accessToken}`,
                    }
                }
            );
            console.log(JSON.stringify(response?.data));
            setLoading(false);
            fireSuccess('Interview booked successfully! Please pay to confirm.');
            setCreatedInterviewId(response?.data?.interview?._id);
            setShowPaypal(true);
        } catch (err) {
            setLoading(false);
            const error = err as AxiosError;
            console.log(error)
            if (error?.response) {
                //@ts-ignore
                fireError(error.response?.data?.message);
            }
            else {
                fireError('Something went wrong');
            }
        }
    }
    if (showPaypal && createdInterviewId) {
        return (
            <PaypalModal
                showModal={showPaypal}
                setShowModal={(val: boolean) => {
                    setShowPaypal(val);
                    if (!val) props.setShowModal(false);
                }}
                accessToken={props.accessToken}
                interviewId={createdInterviewId}
                updatePaymentStatus={() => {
                    props.setShowModal(false);
                }}
            />
        );
    }

    return (
        <div >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Dialog open={props.showModal} onClose={handleClose}
                >
                    <div className={styles.modalContainer}>

                        <h2 className={styles.modalHeading}>Book a mock interview</h2>
                        <div className={styles.inputsContainer}>
                        <DatePicker
                            label="Select Day"
                            value={day}
                            disablePast
                            shouldDisableDate={(date) => {
                                const availableDays = props.timeslots.map((ts: any) => ts.day);
                                return !availableDays.includes(date.day());
                            }}
                            onChange={(newValue) => handleDaySelection(newValue)}
                        />

                        <div className={`${styles.selectWrapper} ${!show ? styles.hidden : ''}`}>
                        <Select
                            instanceId={'time'}
                            placeholder="Select Time"
                            //@ts-ignore
                            onChange={handleTimeSelection}
                            closeMenuOnSelect={true}
                            options={timesPool}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderColor: state.isFocused ? 'dodgerblue' : 'gainsboro',
                                    borderWidth: '2px',
                                    borderRadius: '4px',
                                    marginTop:'2rem'
                                }),
                            }}
                        />
                        </div>
                        </div>
                    </div>
                    <DialogActions>
                        <button
                        className={styles.cancel}
                         onClick={handleClose}>
                            Cancel
                            </button>
                        <button 
                        className={styles.book}
                        onClick={handleBook} 
                        disabled={(loading || selectedTime === null || day === null)}>
                            {loading ? "loading..." : "Book"}
                        </button>
                    </DialogActions>
                </Dialog>
            </LocalizationProvider>
        </div>
    );
}


            // <Dialog open={props.showModal} onClose={handleClose}>
            //     <DialogTitle>Book a mock interview</DialogTitle>
            //     <DialogContent>
            //         <DialogContentText>

            //         </DialogContentText>
            //         <TextField
            //             autoFocus
            //             margin="dense"
            //             id="name"
            //             label="Email Address"
            //             type="email"
            //             fullWidth
            //             variant="standard"
            //         />
            //     </DialogContent>
            //     <DialogActions>
            //         <Button onClick={handleClose}>Cancel</Button>
            //         <Button onClick={handleClose}>Subscribe</Button>
            //     </DialogActions>
            // </Dialog>