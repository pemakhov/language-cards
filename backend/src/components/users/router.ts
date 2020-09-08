import { Router } from "express";
import AuthComponent from "../auth";
import UserComponent from "../users";

const router: Router = Router();

router.get("/hello", (req, res, next) => {
  console.log("usersRouter works");
  res.send("hello users");
});

router.get("/", AuthComponent.authenticateToken, UserComponent.findAll);

router.get("/:id", UserComponent.findById);

router.post("/", UserComponent.create);

router.post("/update", UserComponent.updateById);

router.post("/delete", UserComponent.deleteById);

export default router;
