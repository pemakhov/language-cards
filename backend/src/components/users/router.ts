import { Router } from 'express';
import UserComponent from '../users';

const router: Router = Router();

router.get('/hello', (req, res, next) => {
  console.log('usersRouter works');
  res.send('hello users')
});

router.get('/', UserComponent.findAll);

router.get('/:id', UserComponent.findById);

router.post('/', UserComponent.create);

router.post('/update', UserComponent.updateById);

export default router;