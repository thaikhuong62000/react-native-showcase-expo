import { CameraModal, Screen } from "@/components";
import { AppSocket } from "@/services/socket";
import { useMessengerStore } from "@/stores";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";

export default function Page() {
  const UUID = useMessengerStore((state) => state.getUUID());
  const connectedUUID = useMessengerStore((state) => state.connectedUUID);
  const setConnectedUUID = useMessengerStore((state) => state.setConnectedUUID);
  const addMessage = useMessengerStore((state) => state.addMessage);
  const isFocused = useIsFocused();
  const theme = useTheme();

  const onBarcodeScanned = (data: string) => {
    AppSocket.invite(data, UUID);
    setConnectedUUID(data);
    router.push("/message/chat");
  };

  const onContinueChat = () => {
    if (!connectedUUID) return;

    AppSocket.invite(connectedUUID, UUID);
    setConnectedUUID(connectedUUID);
    router.push("/message/chat");
  };

  useEffect(() => {
    if (!UUID) return;

    AppSocket.join(UUID);
  }, [UUID]);

  useEffect(() => {
    if (!isFocused) return;

    const unsubscribe = AppSocket.on("invite", (data) => {
      setConnectedUUID(data);
      router.push("/message/chat");
    });

    return unsubscribe;
  }, [isFocused, setConnectedUUID]);

  useEffect(() => {
    const unsubscribe = AppSocket.on("chat", (data) => {
      addMessage({
        isSender: false,
        data,
        time: new Date(),
      });
    });

    return unsubscribe;
  }, [isFocused, addMessage]);

  return (
    <Screen title="Message" style={styles.container}>
      <Text variant="titleLarge" style={styles.qrText}>
        My QR
      </Text>
      <QRCode
        value={UUID}
        size={150}
        color={theme.colors.primary}
        backgroundColor="transparent"
      />
      <CameraModal onBarcodeScanned={onBarcodeScanned} />
      {connectedUUID != null && (
        <Button
          mode={"outlined"}
          icon={"chevron-right-circle"}
          style={styles.button}
          onPress={onContinueChat}
        >
          Or continue previous chat
        </Button>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  qrText: {
    marginBottom: 4,
  },
  button: {
    marginTop: 16,
    width: "80%",
  },
});
