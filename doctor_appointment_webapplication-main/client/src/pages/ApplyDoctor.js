import React from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, TimePicker, message, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        {
          ...values,
          userId: user._id,
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
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong ");
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h1 className="text-center" style={styles.title}>Apply Doctor</h1>
        <Form layout="vertical" onFinish={handleFinish} className="m-3" style={styles.form}>
          <h4 className="">Personal Details:</h4>
          <div style={styles.personalDetailsContainer}>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your first name" style={styles.input} />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your last name" style={styles.input} />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Phone No"
                  name="phone"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your contact no" style={styles.input} />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="email" placeholder="your email address" style={styles.input} />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Website" name="website">
                  <Input type="text" placeholder="your website" style={styles.input} />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your clinic address" style={styles.input} />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Professional Details Section */}
          <h4>Professional Details:</h4>
          <div style={styles.professionalDetailsContainer}>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Specialization"
                  name="specialization"
                  required
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select your specialization" style={styles.select}>
                    <Option value="Cardiology">Cardiology</Option>
                    <Option value="Neurology">Neurology</Option>
                    <Option value="Pediatrics">Pediatrics</Option>
                    <Option value="Orthopedics">Orthopedics</Option>
                    <Option value="General Practice">General Practice</Option>
                    <Option value="Dermatology">Dermatology</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Experience"
                  name="experience"
                  required
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select years of experience" style={styles.select}>
                    <Option value="1">1 Year</Option>
                    <Option value="2">2 Years</Option>
                    <Option value="3">3 Years</Option>
                    <Option value="4">4 Years</Option>
                    <Option value="5">5 Years</Option>
                    <Option value="6">6+ Years</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Fees Per Consultation"
                  name="feesPerConsultation"
                  required
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select consultation fee" style={styles.select}>
                    <Option value="100">100</Option>
                    <Option value="200">200</Option>
                    <Option value="300">300</Option>
                    <Option value="400">400</Option>
                    <Option value="500">500</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Timings" name="timings" required>
                  <TimePicker.RangePicker format="HH:mm" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}></Col>
              <Col xs={24} md={24} lg={8}>
                <button className="btn btn-primary form-btn" type="submit" style={styles.submitButton}>
                  Submit
                </button>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

// Styles for the component
const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#f0f4ff", // Light blue background for the entire container
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    transition: "background-color 0.3s ease", // Animation effect for background color
  },
  title: {
    textAlign: "center",
    color: "#333", // Dark gray color for the title
    marginBottom: "30px",
    animation: "fadeIn 1s ease", // Fade-in animation for title
  },
  form: {
    backgroundColor: "#ffffff", // White background for the form
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    transition: "box-shadow 0.3s ease", // Animation effect for shadow
  },
  personalDetailsContainer: {
    backgroundColor: "#e6f7ff", // Light cyan background for Personal Details section
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    transition: "background-color 0.3s ease", // Animation for hover effect
  },
  professionalDetailsContainer: {
    backgroundColor: "#e6f9e6", // Light green background for Professional Details section
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    transition: "background-color 0.3s ease", // Animation for hover effect
  },
  input: {
    borderRadius: "5px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "border-color 0.3s ease",
  },
  select: {
    borderRadius: "5px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "border-color 0.3s ease",
  },
  submitButton: {
    backgroundColor: "#4CAF50", // Green background for submit button
    color: "#fff",
    borderRadius: "5px",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

// Add the fadeIn animation to the document style
const fadeIn = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// Add the fadeIn animation to the document style
document.styleSheets[0].insertRule(fadeIn, document.styleSheets[0].cssRules.length);

export default ApplyDoctor;
