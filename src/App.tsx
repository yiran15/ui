// App.tsx
import ThemeProvider from "@/components/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import router from "./route";
import { useErrorStore } from "./stores/useErrorStore";
import ErrorModal from "./components/ErrList";

function App() {
  const { errors, clearError } = useErrorStore();

  return (
    <ThemeProvider>
      <ErrorModal errors={errors} onClose={clearError} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
