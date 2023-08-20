import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, withRouter } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";




const Sidebar = ({history}) => {
  
  const { dispatch } = useContext(DarkModeContext);

  const { logout } = useContext(AuthContext);
 

  const handleLogout = async () => {
    await logout();
    history.push("/login");
    // You can redirect to the login page here if needed
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/users" style={{ textDecoration: "none" }}>
          <span className="logo">Tabula</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          
          <li>
            <ExitToAppIcon className="icon" />
            <button className='border py-2 px-5 mt-10' onClick={handleLogout}><span>Logout</span></button>
            
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
