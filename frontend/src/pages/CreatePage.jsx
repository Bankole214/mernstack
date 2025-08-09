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
import { useState,useRef } from "react";
import { useProductStore } from "../store/product.js";

function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: null, // store file, not string
  });

  const { createProduct } = useProductStore();
  const toast = useToast();
  const fileInputRef = useRef(null); // ref for file input

  // Simple validation check
  const isFormValid =
    newProduct.name.trim() !== "" &&
    newProduct.price !== "" &&
    !isNaN(newProduct.price) &&
    Number(newProduct.price) > 0 &&
    newProduct.image !== null;

  const handleAddProduct = async () => {
    if (!isFormValid) return; // Just a safeguard

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("image", newProduct.image);

    const { success, message } = await createProduct(formData); // send FormData

    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });

    if (success) {
      setNewProduct({
        name: "",
        price: "",
        image: null,
      });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = null; // clear file input
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
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={(e) => {
                const val = e.target.value;
                // Only allow digits and optionally a single dot for decimals
                if (/^\d*\.?\d*$/.test(val)) {
                  setNewProduct({ ...newProduct, price: val });
                }
              }}
            />
            <Input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.files[0] })
              }
            />
            <Button
              colorScheme={"blue"}
              onClick={handleAddProduct}
              w={"full"}
              isDisabled={!isFormValid}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;
