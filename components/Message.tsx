import { formatDistanceToNowStrict } from "date-fns";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

type Props = {
  data: string;
  time: Date;
  isSender?: boolean;
};
export const Message = memo(({ data, time, isSender }: Props) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        isSender ? styles.containerSender : styles.containerRecipient,
        {
          backgroundColor: isSender ? colors.tertiary : colors.secondary,
        },
      ]}
    >
      <Text style={{ color: colors.inverseOnSurface }}>{data}</Text>
      <Text
        variant="bodySmall"
        style={[styles.time, { color: colors.inverseOnSurface }]}
      >
        {formatDistanceToNowStrict(time) + " ago"}
      </Text>
    </View>
  );
});

Message.displayName = "Message";

const styles = StyleSheet.create({
  containerSender: {
    maxWidth: "60%",
    marginLeft: "auto",
    marginRight: 8,
    marginTop: 4,
    padding: 8,
    borderRadius: 16,
  },
  containerRecipient: {
    maxWidth: "60%",
    marginLeft: 8,
    marginRight: "auto",
    marginTop: 4,
    padding: 8,
    borderRadius: 16,
  },
  time: {
    textAlign: "right",
  },
});
