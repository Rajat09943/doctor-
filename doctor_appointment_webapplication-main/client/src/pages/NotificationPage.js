import React from "react";
import Layout from "./../components/Layout";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // Handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        { userId: user._id },
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
      message.error("Something went wrong");
    }
  };

  // Delete notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
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
      message.error("Something went wrong with notifications");
    }
  };

  return (
    <Layout>
      <h4 style={{
        padding: '20px',
        textAlign: 'center',
        fontSize: '24px',
        color: '#333',
        fontWeight: '600',
      }}>Notification Page</h4>
      <Tabs defaultActiveKey="0" style={{ padding: '20px' }}>
        <Tabs.TabPane tab="Unread" key="0">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <h4
              onClick={handleMarkAllRead}
              style={{
                cursor: 'pointer',
                color: '#1890ff',
                fontSize: '16px',
                textDecoration: 'underline',
              }}
            >
              Mark All Read
            </h4>
          </div>
          {user?.notifcation.map((notificationMgs, index) => (
            <div key={index} className="card" style={{
              cursor: "pointer",
              padding: '15px',
              margin: '10px 0',
              border: '1px solid #e8e8e8',
              borderRadius: '8px',
              backgroundColor: '#fafafa',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transition: '0.3s',
            }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)}
                style={{
                  fontSize: '16px',
                  color: '#333',
                }}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key="1">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <h4
              onClick={handleDeleteAllRead}
              style={{
                cursor: 'pointer',
                color: '#ff4d4f',
                fontSize: '16px',
                textDecoration: 'underline',
              }}
            >
              Delete All Read
            </h4>
          </div>
          {user?.seennotification.map((notificationMgs, index) => (
            <div key={index} className="card" style={{
              cursor: "pointer",
              padding: '15px',
              margin: '10px 0',
              border: '1px solid #e8e8e8',
              borderRadius: '8px',
              backgroundColor: '#fafafa',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transition: '0.3s',
            }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)}
                style={{
                  fontSize: '16px',
                  color: '#333',
                }}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
