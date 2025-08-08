import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const PlusSquareIcon = (props) => <FaPlusSquare {...props} />;
// import React from "react";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={"4"} >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}>
        <Text
          textAlign={"center"}
          textTransform={"uppercase"}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize={{ base: "22", sm: "28" }}
          fontWeight="bold">
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={"20"} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size={20}/>}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
