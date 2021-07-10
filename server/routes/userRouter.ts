import express from "express"
import userCtrl from "../controller/userCtrl"
import auth from "../middleware/auth"

const router = express.Router()

router.patch("/user", auth, userCtrl.updateUser)

export default router
