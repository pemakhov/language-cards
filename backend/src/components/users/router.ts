import { Router } from 'express';

const router: Router = Router();

router.get('/', (req, res, next) => {
  console.log('usersRouter works');
  res.send('hello users')
});

export default router;