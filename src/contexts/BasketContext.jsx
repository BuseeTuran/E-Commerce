import { useState, createContext, useContext, useEffect } from "react";

const BasketContext = createContext ();

const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

const BasketProvider = ( {children} ) => {
    const [items, setItems] = useState (defaultBasket);

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(items));
    }, [items]);

    const addToBasket = (data, findBasketItem) => {
        // ilk defa sepete ekleniyorsa burası çalışıyor
        if (!findBasketItem) {
            return setItems((items) => [data, ...items]);

        }
        // butona tekrar basılıyorsa kaldırmak için burası çalışıyor
        const filtered = items.filter((item) => item._id !== findBasketItem._id);
        setItems(filtered);
    }

    const removeFromBasket = (item_id) => {
        const filtered = items.filter((item) => item._id !== item_id);
        setItems(filtered);
    }
    // sipariş oluşturulduktan sonra sepeti boşaltmak için;
    const emptyBasket = () => setItems([]);

    const values = {
        items,
        setItems,
        addToBasket,
        removeFromBasket,
        emptyBasket,

    };

    return (
        <BasketContext.Provider value={values} >{children}</BasketContext.Provider>
    );
};

const useBasket = () => useContext (BasketContext);

export { BasketProvider, useBasket };