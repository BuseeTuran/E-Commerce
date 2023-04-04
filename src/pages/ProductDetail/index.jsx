import { useQuery } from '@tanstack/react-query' 
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api";
import { Box, Text, Button } from "@chakra-ui/react";
import moment from "moment";
import ImageGallery from 'react-image-gallery';
import { useBasket } from "../../contexts/BasketContext";

function ProductDetail() {

  const {product_id} = useParams ();
  const {addToBasket, items} =useBasket ();

  const { isLoading, error, data } = useQuery(["product", product_id], () => fetchProduct(product_id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error.</div>;
  }


  const findBasketItem = items.find((item) =>item._id === product_id );
  const images = data.photos.map((url) => ({ original: url }))


  return <div>

      <Box margin="5">
        <ImageGallery items={images} />
      </Box>

      <br/>

      <Text ml="12" as="h2" fontSize="2xl">{data.title} </Text>

      <br/>

      <Text ml="12" >{moment(data.createdAt).format("DD/MM/YYYY")} </Text>
      
      <Text ml="12" >{data.description}</Text>
      <br/>
    <Button ml="12" colorScheme={findBasketItem ? 'pink' : 'green'} onClick={() => addToBasket(data, findBasketItem)} >
      {
        findBasketItem ? 'Remove from basket' : 'Add to basket'
      }
    </Button>
    
    
      



    </div>
  
}

export default ProductDetail
