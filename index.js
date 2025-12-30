import PogObject from "PogData";

register("command", () => ChatLib.chat("&bIceSprayBind&f> Hello World!")).setName("IceSprayTest");
let isbData =  new PogObject("IceSprayBind", {
    "selectedSlot": null,
    "first_time": true
}, ".isb_data.json");


register("step", () => {
    if(isbData.first_time) {
        isbData.first_time = false;
        isbData.save();
        ChatLib.chat("&bIceSprayBind&f> Use /setSlot <0-8> to use as your ice spray slot.");
        ChatLib.chat("&bIceSprayBind&f> You can set the keybind used for it in the minecraft settings.");
        ChatLib.chat("&bIceSprayBind&f> You can check what slot your bind is currently set to by doing /whatSlot.")
    };
}).setFps(1);

const key = new KeyBind("Slot Bind", Keyboard.KEY_F, "IceSprayBind");

register("command", () => {
    ChatLib.chat("&bIceSprayBind&f> Use /setSlot <0-8> to use as your ice spray slot.");
    ChatLib.chat("&bIceSprayBind&f> You can set the keybind used for it in the minecraft settings.");
    ChatLib.chat("&bIceSprayBind&f> You can check what slot your bind is currently set to by doing /whatSlot.")
}).setName("IceSprayHelp");

register("command", function(args) {

    if(args[0] > 8)
    {
        ChatLib.chat("&bIceSprayBind&f> Number too high! Please pick between 0 and 8.");
    }
    else{
        isbData.selectedSlot = args[0];
        isbData.save();
        ChatLib.chat("&bIceSprayBind&f> Set bind to slot: " + isbData.selectedSlot);
    };
    
}).setName("setSlot");


register("command", () => {
    ChatLib.chat("&bIceSprayBind&f> Your slot is currently set to " + isbData.selectedSlot);
}).setName("whatSlot");

register("tick", () => {
    if(key.isPressed())
    {
        Player.setHeldItemIndex(isbData.selectedSlot);
    };
});
