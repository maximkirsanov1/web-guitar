import { useContext, useEffect, useRef, useState } from "react";
import "./Admin.scss";
import { UserContext } from "../../App";
import { LoaderContext } from "../../App";
import { getUsers } from "../../../api/getUsers";
import { changeRole } from "../../../api/changeRole";
export default function AdminComponent() {
  const { closeLoader } = useContext(LoaderContext);
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const handleChangeRole = async (e, role, id) => {
    e.preventDefault();
    const change = await changeRole(id, role);
    if (change) {
      await handleGetUsers();
    }
  };
  const handleGetUsers = async () => {
    try {
      const users = await getUsers();
      closeLoader();
      setUsers(users);
    } catch (error) {
      console.log("Error getting users: ", error);
    }
  };
  useEffect(() => {
    if (user && user.role === "superadmin") {
      handleGetUsers();
    }
    if (user && user.role !== "superadmin") {
      alert("Access denied");
    }
  }, [user]);

  return (
    <>
      <div className="admin">
        <ul className="users">
          {users.map((item, index) => (
            <>
              {item.role !== "superadmin" ? (
                <>
                  <li className="user" key={index}>
                    <h3>{item.name}</h3>
                    <h4>{item.email}</h4>
                    <div className="admin__buttons">
                      <button
                        className={`admin__button ${
                          item.role === "user" ? "admin__button--active" : ""
                        }`}
                        onClick={
                          item.role !== "user"
                            ? (e) => handleChangeRole(e, "user", item._id)
                            : () => {}
                        }
                      >
                        user
                      </button>
                      <button
                        className={`admin__button ${
                          item.role === "admin" ? "admin__button--active" : ""
                        }`}
                        onClick={
                          item.role !== "admin"
                            ? (e) => handleChangeRole(e, "admin", item._id)
                            : () => {}
                        }
                      >
                        admin
                      </button>
                    </div>
                  </li>
                </>
              ) : (
                ""
              )}
            </>
          ))}
        </ul>
      </div>
    </>
  );
}
