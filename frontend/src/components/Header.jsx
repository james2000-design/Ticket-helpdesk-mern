import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    disptach(logout());
    disptach(reset());
    navigate("/");
  };
  return (
    <div>
      <header className="header">
        <div className="log">
          <Link to="/">Support Desk</Link>
        </div>
        <ul>
          {user ? (
            <li>
              <button className="btn " onClick={onLogout}>
                <FaSignOutAlt />
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/Login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/Register">
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
