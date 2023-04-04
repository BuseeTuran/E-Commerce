import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useBasket } from "../../contexts/BasketContext";

function Card( {item} ) {
    const  {addToBasket, items} = useBasket();

    const findBasketItem = items.find((basket_item) =>basket_item._id === item._id );
    


  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="20">
        <Link to={`/product/${item._id}`}>
            <Image src={item.photos[0]} alt="product" loading="lazy"/>
            <Box p="6">
                <Box display="plex" alignItems="baseline" fontSize="s"  >
                    {moment(item.createAt).format("DD/MM/YYYY")}

                </Box>
                <Box mt="2" fontWeight="semibold" as="h4" lineHeight="tight" fontSize="md">
                    {item.title}
                </Box>
                <Box mt="2">{item.price} TL</Box>

            </Box>
        </Link> 
        <Button colorScheme={findBasketItem ? "green" : "pink" }variant="solid" onClick={() => addToBasket(item, findBasketItem)}>
            {
                findBasketItem ? 'Remove from basket' : 'Add to basket'
            }
        </Button>    
    </Box>
  )
}

export default Card
