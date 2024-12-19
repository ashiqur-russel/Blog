import { Router } from 'express';
const router = Router();

const moduleRoutes = [{
    
        path: '/users',
        route: '',
      
}]
moduleRoutes.forEach((route) => router.use(route.path));

export default router;