import express from "express";

import AudioPlayerController from "./controllers/audio-player.controller";
import SoundController from "./controllers/sound.controller";
import AccountController from "./controllers/account.controller";
import AuthenticationController from "./controllers/authentication.controller";
import RequestController from "./controllers/request.controller";
import ReleaseController from "./controllers/release.controller";

import Authorize from "./middlewares/authorize.middleware";
import IsAdmin from "./middlewares/admin.middleware";

const routes = express.Router();

routes.post("/authenticate", AuthenticationController.signIn);

routes.post("/player/:sound", Authorize, AudioPlayerController.play);

routes.get("/sound", Authorize, SoundController.index);

routes.get("/release/:lasts", Authorize, ReleaseController.index);
routes.post("/release", Authorize, IsAdmin, ReleaseController.create);

routes.get("/request", Authorize, RequestController.index);
routes.post("/request", Authorize, RequestController.create);
routes.delete("/request/:id", Authorize, RequestController.delete);

routes.post("/account", AccountController.create);
routes.patch("/account/reset", AccountController.reset);
routes.patch("/account", Authorize, AccountController.update);
routes.delete("/account", Authorize, AccountController.delete);
routes.patch("/account/:id", Authorize, IsAdmin, AccountController.changeRole);

export default routes;
