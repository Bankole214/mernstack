import { Container, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard.jsx";
// import React from "react";

function HomePage() {
  const {fetchProducts,products} = useProductStore();
  useEffect(() => { fetchProducts() }, [fetchProducts]);
  console.log("products",products);
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-l, #7928CA, #FF0080)"}
          bgClip={"text"}
          textAlign={"center"}>
          Current Product
        </Text>
        <SimpleGrid
          columns={[1, 2, 3]}
          spacing={10}
          textAlign={"center"}
          w="full">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}>
            No products found 😀{" "}
            <Link to="/create">
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}>
                Create a Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
}

export default HomePage;
