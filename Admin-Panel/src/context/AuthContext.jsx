import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        page,
        setPage,
        query,
        setQuery,
        isEdit,
        setIsEdit,
        addModal,
        setAddModal,
        isDelete,
        setIsDelete,
        username,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export default AuthProvider;
export { useAuth };
