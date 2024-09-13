// remove/replace this with your implementation
import { useState } from "react";
import "./notification.css";
const useNotifications = () => {
  const [notificationList, setNotificationList] = useState([]);
  return {
    showNotification: ({ type, message }) => {
      console.log(type, message);
      const notification = (
        <div>
          <p>{message}</p>
        </div>
      );
      // setTimeout(()=>{

      // })
      return notificationList;
    },
  };
};

export default function NotificationComp() {
  const { showNotification } = useNotifications();

  const handleClick = (e) => {
    const { target } = e;
    const type = target.getAttribute("data-type");

    showNotification({
      type,
      message: `${type} Notification`,
    });
  };

  return (
    <div>
      <div className="content">
        <h1>Add Notification</h1>
        <div className="actions">
          <button className="info" onClick={handleClick} data-type="INFO">
            Info
          </button>
          <button className="success" onClick={handleClick} data-type="SUCCESS">
            Success
          </button>
          <button className="warning" onClick={handleClick} data-type="WARNING">
            Warning
          </button>
          <button className="error" onClick={handleClick} data-type="ERROR">
            Error
          </button>
        </div>
      </div>
      <div>hello</div>
    </div>
  );
}
