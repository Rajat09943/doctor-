import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";
import moment from "moment";

const Profile = () => {
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  // Handle form submission
  const handleFinish = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);

    try {
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...values,
          userId: params.id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  // Fetch doctor info
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  return (
    <Layout>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Manage Profile</h1>
      {doctor && (
        <form
          onSubmit={handleFinish}
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <h4>Personal Details:</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            <input type="text" name="firstName" placeholder="First Name" defaultValue={doctor.firstName} required />
            <input type="text" name="lastName" placeholder="Last Name" defaultValue={doctor.lastName} required />
            <input type="text" name="phone" placeholder="Phone No" defaultValue={doctor.phone} required />
            <input type="email" name="email" placeholder="Email" defaultValue={doctor.email} required />
            <input type="text" name="website" placeholder="Website" defaultValue={doctor.website} />
            <input type="text" name="address" placeholder="Address" defaultValue={doctor.address} required />
          </div>

          <h4>Professional Details:</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            <input type="text" name="specialization" placeholder="Specialization" defaultValue={doctor.specialization} required />
            <input type="text" name="experience" placeholder="Experience" defaultValue={doctor.experience} required />
            <input type="text" name="feesPerConsultation" placeholder="Fees Per Consultation" defaultValue={doctor.feesPerConsultation} required />
            <input type="text" name="timings" placeholder="Timings (HH:mm-HH:mm)" required />
          </div>

          <button type="submit" style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}>
            Update
          </button>
        </form>
      )}
    </Layout>
  );
};

export default Profile;
