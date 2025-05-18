import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import React, { memo, useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";

type Props = {
  onBarcodeScanned(data: string): void;
};

export const CameraModal = memo(({ onBarcodeScanned }: Props) => {
  const [visible, setVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const scanned = useRef(false);

  const showModal = useCallback(() => {
    setVisible(true);
    scanned.current = false;
  }, []);

  const hideModal = useCallback(() => {
    setVisible(false);
  }, []);

  const _onBarcodeScanned = (result: BarcodeScanningResult) => {
    if (scanned.current) {
      return;
    }

    setVisible(false);
    onBarcodeScanned(result.data);
    scanned.current = true;
  };

  if (!permission) {
    return <View />;
  }

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          {!permission.granted ? (
            <>
              <Text>We need your permission to show the camera</Text>
              <Button onPress={requestPermission}>Grant permission</Button>
            </>
          ) : (
            <CameraView
              style={styles.container}
              barcodeScannerSettings={{
                barcodeTypes: ["qr"],
              }}
              onBarcodeScanned={_onBarcodeScanned}
            />
          )}
        </Modal>
      </Portal>
      <Button
        mode={"outlined"}
        icon={"camera"}
        style={styles.button}
        onPress={showModal}
      >
        {" "}
        Scan a QR to start chatting
      </Button>
    </>
  );
});

CameraModal.displayName = "CameraModal";

const styles = StyleSheet.create({
  container: {
    width: "90%",
    aspectRatio: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
  containerStyle: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 16,
    width: "80%",
  },
});
