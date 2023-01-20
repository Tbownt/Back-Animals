import { Router } from 'express';
// importamos los routers 
import petsRouter from './pets.router';


//Usé el middleware Router() para crear manejadores de rutas montables y modularizados.
const router = Router();


//Paths
router.use("/pets", petsRouter); 


export default router;