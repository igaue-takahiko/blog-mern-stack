import express from "express"
import userCtrl from "../controller/userCtrl"
import auth from "../middleware/auth"

const router = express.Router()

router.patch("/user", auth, userCtrl.updateUser)

router.patch("/reset_password", auth, userCtrl.resetPassword)

export default router
