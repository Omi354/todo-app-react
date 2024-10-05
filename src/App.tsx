import "./App.css";
import { ChakraProvider, Button, Flex, Input, Text } from "@chakra-ui/react";

function App() {
  const handleClick = () => {};

  return (
    <ChakraProvider>
      <div className="container">
        <Flex justify={"space-between"} gap={"10px"} align={"center"}>
          <Flex gap={"10px"} align={"center"}>
            <Text fontSize="sm">タスク名</Text>
            <Input type="text" placeholder="タスク名を入力" />
          </Flex>
          <Flex gap={"10px"} align={"center"}>
            <Text fontSize="sm">担当名</Text>
            <Input type="text" placeholder="担当名を入力" />
          </Flex>
          <Flex gap={"10px"} align={"center"}>
            <Text fontSize="sm">期限</Text>
            <Input type="date" />
          </Flex>
          <Button colorScheme="teal" size="sm" onClick={handleClick}>
            登録
          </Button>
        </Flex>
      </div>
    </ChakraProvider>
  );
}

export default App;
