import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import moment from "moment";
import { Table, Typography } from "antd";

const { Title } = Typography;

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
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

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <div style={styles.container}>
        <Title level={2} style={styles.title}>
          Appointments List
        </Title>
        <Table
          columns={columns}
          dataSource={appointments}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "even-row" : "odd-row"
          }
          pagination={false}
          style={styles.table}
        />
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    padding: "40px",
    background: "linear-gradient(to right, #6a11cb, #2575fc)", // Gradient background
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 1s ease",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Text shadow for title
  },
  table: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    overflow: "hidden",
  },
};

// Adding keyframes for animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}`, styleSheet.cssRules.length);

// Inserting row styles separately
styleSheet.insertRule(`
  .even-row {
    background-color: #f2f2f2; 
    transition: background-color 0.3s ease; 
}`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .even-row:hover {
    background-color: #d1e7fd; 
}`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .odd-row {
    background-color: #ffffff; 
    transition: background-color 0.3s ease; 
}`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .odd-row:hover {
    background-color: #d1e7fd; 
}`, styleSheet.cssRules.length);

export default Appointments;
