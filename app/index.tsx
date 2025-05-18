import { Screen } from "@/components";
import { router } from "expo-router";
import { List } from "react-native-paper";

export default function Home() {
  return (
    <Screen title="React native showcase">
      <List.AccordionGroup>
        <List.Accordion title="Functionalities" id="1">
          <List.Item
            title="Messenger"
            onPress={() => {
              router.push("/message");
            }}
          />
        </List.Accordion>
      </List.AccordionGroup>
    </Screen>
  );
}
