import { Flex, Spinner } from "@chakra-ui/react";
import { useState, createContext, useEffect, useContext } from "react";
import { fetchLogout, fetchMe } from "../api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    //user kayıt olduğunda eğer null ise login değildir.. user detay bilgileri buraya yazılır
    const [user, setUser] = useState(null);
    //o an login mi değil mi ifadesini tutan tanım. Burada da user login mi değil mi ?
    const [loggedIn, setLoggedIn] = useState(false)
    //Bu login fonksiyonu sign up ta kullanılcak parametre olarak data alsın, önce true ye çeksin sonrada setuser çalıştırılsın kulllanıcının verileri yazılsın..
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        (async () =>{
            try{
                const me = await fetchMe();

                setLoggedIn(true);
                setUser(me);
                setLoading(false);
            } catch(e){
                setLoading(false);

            }
        }) ()
    }, [] );

    const login = (data) => {
        setLoggedIn(true);
        setUser(data.user);

        localStorage.setItem('access-token', data.accessToken);
        localStorage.setItem('refresh-token', data.refreshToken);
    };

    const logout = async (callback) => {
        setLoggedIn(false);
        setUser(null);

        await fetchLogout();
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');

        callback()
    }


    const values = {
        loggedIn,
        user,
        login,   
        logout,    
    }

    if (loading){
        return (
            <Flex justifyContent="center" alignItems="center " height="100vh">
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl"  color="red.500"/>
            </Flex>
        )
    }
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth};