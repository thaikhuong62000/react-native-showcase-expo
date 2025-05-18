import { Message, Screen } from "@/components";
import { AppSocket } from "@/services/socket";
import { useMessengerStore } from "@/stores";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, TextInput } from "react-native-paper";

export default function Messenger() {
  const [text, setText] = React.useState("");
  const addMessage = useMessengerStore((state) => state.addMessage);
  const connectedUUID = useMessengerStore((state) => state.connectedUUID);
  const messages = useMessengerStore((state) => state.messages);

  const onSend = () => {
    if (!connectedUUID) return;

    AppSocket.send(connectedUUID, text);
    addMessage({
      isSender: true,
      data: text,
      time: new Date(),
    });
    setText("");
  };

  return (
    <Screen title={"Chat"}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {messages.map((value, index) => {
          return <Message key={`message_${index}`} {...value} />;
        })}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          label="Write something..."
          value={text}
          onChangeText={setText}
          style={styles.text}
          mode="outlined"
        />
        <IconButton icon={"send"} onPress={onSend} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },
  text: {
    flex: 1,
    marginLeft: 8,
  },
});
