import NavBar from "./components/NavBar";
import Speed from "./components/Speed";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { theme } = useThemeStore();

  return (
    <div className="" data-theme={theme}>
      <NavBar/>
      <Speed/>
    </div>
  );
}

export default App;
