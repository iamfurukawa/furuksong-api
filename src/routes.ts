import express from "express";

import AudioPlayerController from "./controllers/audio-player.controller";
import SoundController from "./controllers/sound.controller";

const routes = express.Router();

routes.post("/player/:sound", AudioPlayerController.play);

routes.get("/sound", SoundController.index);
routes.post("/sound", SoundController.create);
routes.post("/sound/:id", SoundController.evaluate);
routes.patch("/sound/:id", SoundController.update);
routes.delete("/sound/:id", SoundController.delete);

export default routes;
