import Board from "../components/Pages/BoardPage/Board";
import Boards from "../components/Pages/BoardsPage/Boards";

const Tasks = () => {
  //   const { login } = useAuth();
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [error, setError] = useState("");

  //   const handleLogin = async () => {
  //     try {
  //       await login(email, password);
  //     } catch (err) {
  //       setError("Login failed. Check your credentials.");
  //     }
  //   };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <Board />
    </div>
  );
};

export default Tasks;
