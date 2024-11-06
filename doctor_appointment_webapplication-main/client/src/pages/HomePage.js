import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row, Col, Spin, Alert, Card, Typography } from "antd"; 
import DoctorList from "../components/DoctorList";

const { Title } = Typography;

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllDoctors",
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
      setError("Failed to fetch doctors. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div style={styles.container}>
        <Title level={2} style={styles.title}>
          Welcome to Our Healthcare System
        </Title>
        {loading && (
          <Spin size="large" style={styles.spin} />
        )}
        {error && (
          <Alert message={error} type="error" style={styles.alert} />
        )}
        <Row gutter={[16, 16]} style={styles.row}>
          {doctors && doctors.length > 0 ? (
            doctors.map((doctor) => (
              <Col key={doctor._id} xs={24} sm={12} md={8} lg={6} style={styles.col}>
                <Card
                  hoverable
                  style={styles.card}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.transition = "transform 0.3s ease"; 
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <DoctorList doctor={doctor} />
                </Card>
              </Col>
            ))
          ) : (
            !loading && (
              <div style={styles.noDoctors}>
                <Title level={4} style={styles.noDoctorsText}>No doctors available at the moment.</Title>
              </div>
            )
          )}
        </Row>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
    background: "linear-gradient(to right, #ff7e5f, #feb47b)", 
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", 
    animation: "fadeIn 1s ease", 
  },
  title: {
    marginBottom: "30px",
    color: "#fff", 
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Adding a text shadow effect
    background: "linear-gradient(90deg, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.3))",
    WebkitBackgroundClip: "text", 
    WebkitTextFillColor: "transparent", 
    fontSize: "2.5em", // Adjusting the font size
    transition: "transform 0.3s ease", // Smooth transform on hover
  },
  spin: {
    margin: "20px",
  },
  alert: {
    margin: "20px",
  },
  row: {
    justifyContent: "center",
  },
  col: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "110%",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", 
    transition: "transform 0.2s", 
    backgroundColor: "#fff", 
    animation: "fadeIn 1s ease", 
  },
  noDoctors: {
    width: "100%",
    margin: "20px",
  },
  noDoctorsText: {
    color: "#bfbfbf", 
  },
};

// Adding keyframes for animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}`, styleSheet.cssRules.length);

export default HomePage;
