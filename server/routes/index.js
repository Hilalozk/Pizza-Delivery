//import "../styles/menu.css";
const express = require('express');
const authRoute = require('./auth.route');
const router = express.Router();
const usersRoute = require('./users.route');
const productsRoute = require('./product.route');
const routesIndex = [
    {
        path:'/auth',
        route:authRoute
    },
    {
        path:'/users',
        route:usersRoute
        
    },
    {
        path:'/products',
        route:productsRoute
        
    }
]

//router.use('/auth', ()=>{})

routesIndex.forEach((route)=>{
    router.use(route.path, route.route);
})

module.exports = router;