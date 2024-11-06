import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker, Button, Typography } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const { Title } = Typography;

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div style={styles.container}>
        <Title level={2} style={styles.title}>
          Booking Appointment
        </Title>
        <div style={styles.bookingCard}>
          <h4 style={styles.doctorName}>Doctor: {doctors.name}</h4>
          <DatePicker
            onChange={(date, dateString) => setDate(dateString)}
            style={styles.datePicker}
          />
          <TimePicker
            onChange={(time, timeString) => setTime(timeString)}
            style={styles.timePicker}
          />
          <Button
            type="primary"
            style={styles.button}
            onClick={handleAvailability}
          >
            Check Availability
          </Button>
          {isAvailable && (
            <Button
              type="success"
              style={styles.bookButton}
              onClick={handleBooking}
            >
              Book Appointment
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    padding: "40px",
    background: "linear-gradient(to right, #ff7e5f, #feb47b)", // Gradient background
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 1s ease",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  },
  bookingCard: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  doctorName: {
    marginBottom: "15px",
  },
  datePicker: {
    width: "100%",
    marginBottom: "10px",
  },
  timePicker: {
    width: "100%",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    marginRight: "10px",
    transition: "transform 0.2s, background-color 0.2s",
  },
  bookButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    transition: "transform 0.2s, background-color 0.2s",
  },
};

// Adding keyframes for animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}`, styleSheet.cssRules.length);

// Adding hover effects
styleSheet.insertRule(`
  .ant-btn:hover {
    transform: scale(1.05);
    transition: transform 0.2s;
  }`, styleSheet.cssRules.length);

export default BookingPage;
