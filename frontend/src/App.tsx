import { AppProvider } from "@/providers/app-provider";
import { AuthLoader } from "@/features/auth";
import { AppRouter } from "@/routes";

function App() {
  return (
    <AppProvider>
      <AuthLoader>
        <AppRouter />
      </AuthLoader>
    </AppProvider>
  );
}

export default App;
