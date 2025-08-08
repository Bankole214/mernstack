import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
// import React from "react";
import { useState } from "react";
import { useProductStore } from "../store/product.js";

function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { createProduct } = useProductStore();
  const toast = useToast();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    if (success) {
      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
    }
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          p={6}
          rounded={"lg"}
          shadow={"md"}>
          <VStack spacing={4}>
            <Input
              type="text"
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Product Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Product Image"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorScheme={"blue"} onClick={handleAddProduct} w={"full"}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;
