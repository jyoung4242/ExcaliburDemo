import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Engine, Actor, DisplayMode, Color, Vector, Logger, ScreenAppender } from "excalibur";

const UIstate = {
  hudWidth: 600,
  hudHeight: 400,
};
const template = `
<style>
    #cnv, hud-layer{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);       
    }
    hud-layer{
        display: flex;
        justify-content: center;
        align-items: center;
        width: \${hudWidth}px;
        height: \${hudHeight}px;
        pointer-events: none;
        
    }
</style>
<div class="App">
    <canvas id="cnv"></canvas>
    <hud-layer> 
        <div>Hello Peasy!!!</div>
    </hud-layer>
</div>
`;

await UI.create(document.body, UIstate, template).attached;

const game = new Engine({ width: 600, height: 400, displayMode: DisplayMode.FitScreen, canvasElementId: "cnv" });
let screen = game.screen;

UIstate.hudWidth = screen.viewport.width;
UIstate.hudHeight = screen.viewport.height;

document.addEventListener("resize", () => {
  UIstate.hudWidth = screen.viewport.width;
  UIstate.hudHeight = screen.viewport.height;
});

const player1 = new Actor({
  name: "player",
  width: 25,
  height: 25,
  color: Color.Red,
  pos: new Vector(15, 15),
});

let screenLog = new ScreenAppender(300, 400);

Logger.getInstance().addAppender(screenLog);

//player1.enableCapturePointer = true;
console.log(player1);

player1.on("pointerdown", pe => {
  //Logger.getInstance().info("pointer event: ", pe);
  console.log("pointer down");

  if (player1.hasTag("bound")) player1.removeTag("bound");
  else player1.addTag("bound");
});

game.input.pointers.on("move", pe => {
  //Logger.getInstance().info("pointer event: ", pe);
  console.log("pointer move");
  if (player1.hasTag("bound")) {
    console.log("bound actor");
  }
});

game.add(player1);

game.start();
