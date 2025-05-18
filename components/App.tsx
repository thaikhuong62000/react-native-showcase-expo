import React, { memo, PropsWithChildren } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const App = memo(({ children }: PropsWithChildren<unknown>) => {
  return (
    <PaperProvider>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </PaperProvider>
  );
});

App.displayName = "App";
