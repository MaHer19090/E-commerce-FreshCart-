import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import CounterContextProvider from './Context/CounterContext.js';
import UserTokenProvider from './Context/UserToken.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'
import CartContextProvider from './Context/CartContext.js';



const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient = new QueryClient()


root.render(
<UserTokenProvider>
    <CartContextProvider>
                <CounterContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
                        <App/>
                    </QueryClientProvider>
                </CounterContextProvider>
    </CartContextProvider>
</UserTokenProvider>

);

reportWebVitals();
