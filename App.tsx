import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./Src/navigation/RootNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}