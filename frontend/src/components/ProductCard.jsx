import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  VStack,
  useDisclosure,
  Input,
  Button,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useProductStore } from "../store/product.js";
import React, { useState, useRef } from "react";

function ProductCard({ product }) {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    onDeleteClose();
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
  };
    const handleUpdateProduct = async(pid, updatedProduct) => {
        const {success, message } = await updateProduct(pid, updatedProduct)
        onClose()
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: "Product updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}>
      <Image
        src={product.image}
        alt={product.name}
        h={"48"}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton
            icon={<MdEdit />}
            colorScheme="blue"
            onClick={onOpen}
            aria-label="Edit product"
          />
          <IconButton
            icon={<MdDelete />}
            colorScheme="red"
            onClick={onDeleteOpen} // <-- open confirmation dialog
            aria-label="Delete product"
          />
          {/* <IconButton
            icon={<MdDelete />}
            colorScheme="red"
            onClick={() => handleDeleteProduct(product._id)}
          /> */}
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                type="text"
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Product Price"
                name="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                type="text"
                placeholder="Product Image url"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={"blue"}
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
              Update
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Delete Confirmation AlertDialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDeleteProduct(product._id)}
                ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

export default ProductCard;

// onClick = { onOpen };
