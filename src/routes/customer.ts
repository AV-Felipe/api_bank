import { Router } from 'express';

const router = Router();

router.get('/new', (request, response) => {
    return response.json("OK");
});

export default router;