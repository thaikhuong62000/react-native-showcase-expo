/* eslint-disable react-hooks/rules-of-hooks */
import { useIsFocused } from "@react-navigation/native";
import { Stack } from "expo-router";
import React, { memo, PropsWithChildren, useEffect, useState } from "react";
import { Keyboard, Platform, StyleProp, ViewStyle } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const SAFE_AREA_EDGE = ["bottom"] as const;
const IS_IOS = Platform.OS === "ios";

type Props = PropsWithChildren<{
  title?: string;
  style?: StyleProp<ViewStyle>;
}>;
const _Screen = ({ title, style, children }: Props) => {
  const { colors } = useTheme();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const isFocused = useIsFocused();
  const { bottom: bottomInset } = useSafeAreaInsets();

  useEffect(() => {
    if (!isFocused && !IS_IOS) {
      return;
    }

    const subscription = Keyboard.addListener(
      "keyboardWillChangeFrame",
      (e) => {
        const startY = e.startCoordinates?.screenY ?? 0;
        const endY = e.endCoordinates.screenY;
        const heightChange = startY - endY;

        if (heightChange > 0) {
          setKeyboardHeight(heightChange);
        } else {
          setKeyboardHeight(0);
        }
      }
    );
    return subscription.remove;
  }, [isFocused]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.surface,
      }}
      edges={SAFE_AREA_EDGE}
    >
      <Stack.Screen
        options={{
          title,
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.onSurface,
          headerTitleStyle: {
            fontWeight: "bold",
            color: colors.onSurface,
          },
        }}
      />
      <Surface
        style={[
          {
            flex: 1,
            backgroundColor: colors.surface,
            paddingBottom: keyboardHeight - bottomInset,
          },
          style,
        ]}
        elevation={0}
      >
        {children}
      </Surface>
    </SafeAreaView>
  );
};

export const Screen = memo(_Screen);
Screen.displayName = "Screen";
