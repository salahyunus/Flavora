import React, { useEffect } from "react";
import { DBLeftSection, DBRightSection } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { alertInfo, alertNULL } from "../context/actions/alertActions";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.user_id != process.env.REACT_APP_ADMIN_ID) {
      navigate("/", { replace: true });
    }
  }, [user]);

  useEffect(() => {
    dispatch(
      alertInfo(`For best experience use a large screen for Admin Dashboard`)
    );
    setTimeout(() => {
      dispatch(alertNULL());
    }, 3000);
  }, []);
  return (
    <div className="w-screen h-screen flex items-center bg-primary">
      <DBLeftSection />
      <DBRightSection />
    </div>
  );
};

export default Dashboard;
