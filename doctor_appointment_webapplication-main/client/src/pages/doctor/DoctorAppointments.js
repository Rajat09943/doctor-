import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import moment from "moment";
import { message } from "antd";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/doctor-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <h1 style={styles.header}>Appointments List</h1>
      <div style={styles.container}>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment._id} style={styles.appointmentCard}>
              <p>
                <strong>ID:</strong> {appointment._id}
              </p>
              <p>
                <strong>Date & Time:</strong> {moment(appointment.date).format("DD-MM-YYYY")} &nbsp;
                {moment(appointment.time).format("HH:mm")}
              </p>
              <p>
                <strong>Status:</strong> {appointment.status}
              </p>
              {appointment.status === "pending" && (
                <div>
                  <button
                    style={styles.approveButton}
                    onClick={() => handleStatus(appointment, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    style={styles.rejectButton}
                    onClick={() => handleStatus(appointment, "reject")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </Layout>
  );
};

const styles = {
  header: {
    textAlign: "center",
    margin: "20px 0",
    color: "#4a148c", // Dark purple color for header
  },
  container: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f5f5f5", // Light background for the container
  },
  appointmentCard: {
    border: "1px solid #e6e6e6",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s", // Hover effect
    backgroundColor: "#ffffff", // White background for each card
  },
  approveButton: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "5px",
    transition: "background-color 0.3s, transform 0.2s",
  },
  rejectButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  },
};

// Add hover effect for appointment card
const hoverStyle = {
  ...styles.appointmentCard,
  transform: "scale(1.02)", // Slightly enlarge the card on hover
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Enhance shadow on hover
};

export default DoctorAppointments;
