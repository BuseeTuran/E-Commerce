import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import './reset.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'      
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App';
import reportWebVitals from "./reportWebVitals";
import {ChakraProvider } from "@chakra-ui/react";
import 'antd/dist/antd.css';


// contexts
import { AuthProvider } from "./contexts/AuthContext";
import { BasketProvider } from "./contexts/BasketContext";

const queryClient = new QueryClient( {
        defaultOptions: {
                queries: {
                        refetchOnMount : false, 
                        refetchOnWindowFocus: false,
                }
        }
} )


ReactDOM.render (
        <React.StrictMode>
                <QueryClientProvider client={queryClient}>
                        <ChakraProvider>
                                <AuthProvider>
                                        <BasketProvider>
                                                <App />
                                        </BasketProvider>
                                </AuthProvider>
                        </ChakraProvider>
                        <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
        </React.StrictMode>,
        document.getElementById('root')
);
reportWebVitals ( );