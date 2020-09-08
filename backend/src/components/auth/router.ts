import { Router } from 'express';
import AuthComponent from '../auth';

const router: Router = Router();

router.post('/tokens', AuthComponent.authenticateToken, (req, res, next) => {console.log('authenticated')});

router.post("/login", AuthComponent.authenticateUser);

router.post("/refresh", AuthComponent.refreshAccess);

export default router;