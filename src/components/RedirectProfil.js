import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const RedirectProfil = () => {
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    // Check if user role is available and redirect based on role
    if (user && user.roles) {
      redirectBasedOnRole(user.roles);
    }
  }, [user]);

  const redirectBasedOnRole = (userRole) => {
    switch (userRole) {
      case "admin":
        // Redirect to admin page
        window.location.href = "/admin";
        break;
      case "etudiant":
        // Redirect to etudiant page
        window.location.href = "/etudiant";
        break;
      case "employee":
        // Redirect to employee page
        window.location.href = "/employee";
        break;
      case "directeur":
        // Redirect to director page
        window.location.href = "/director";
        break;
      default:
        // Redirect to a default page if the role is not recognized
        window.location.href = "/default";
    }
  };

  return <div>{/* You can add additional content here if needed */}</div>;
};

export default RedirectProfil;
