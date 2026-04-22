import Logout from "../../components/common/Logout";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const {logout} = useAuth();
  return (
    <div>
      <div>Dashboard</div>
      {/* <Logout/> */}
      {/* <button onClick={logout}>Logout</button> */}
    </div>
  );
};
export default Dashboard;