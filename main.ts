namespace SpriteKind {
    export const helper = SpriteKind.create()
    export const Waste = SpriteKind.create()
    export const Bin = SpriteKind.create()
}

/** 
syntax of the adding data extension:
    mySprite = sprites.create(sprites.food.small_apple, SpriteKind.player)
    sprites.set_data_string(mySprite, "name", "alex")
    name = sprites.read_data_string(mySprite, "name")

 */
/** *set up* */
let p = "Paper and small cardboard items"
let h = "Glass, hard plastics and metal"
let r = "Residual waste"
let e = "Batteries"
let c = "compost"
let allowcarry = false
// ???what was i doing...
scene.screenWidth()
//  characters
let jo = sprites.create(assets.image`Jo`, SpriteKind.Player)
controller.moveSprite(jo)
scene.cameraFollowSprite(jo)
//  scenes
tiles.setTilemap(assets.tilemap`level 1`)
//  trash items
let cerealbox = sprites.create(assets.image`cerealBox`, SpriteKind.Waste)
sprites.setDataString(cerealbox, "sortedIn", p || c)
sprites.setDataBoolean(cerealbox, "carryState", false)
let tunacan = sprites.create(assets.image`tuna can`, SpriteKind.Waste)
sprites.setDataString(tunacan, "sortedIn", h)
sprites.setDataBoolean(tunacan, "carryState", false)
tunacan.x = cerealbox.x + 50
let juiceJug = sprites.create(assets.image`juice jug`, SpriteKind.Waste)
sprites.setDataBoolean(juiceJug, "carryState", false)
juiceJug.x = tunacan.x + 50
let notePage = sprites.create(assets.image`note page`, SpriteKind.Waste)
sprites.setDataBoolean(juiceJug, "carryState", false)
notePage.x = 1000
let apple = sprites.create(assets.image`apple core`, SpriteKind.Waste)
sprites.setDataBoolean(juiceJug, "carryState", false)
notePage.x = 1000
//  bins
let blueBin = sprites.create(assets.image`blue bin`, SpriteKind.Bin)
blueBin.x = 150
let blackBin = sprites.create(assets.image`black bin`, SpriteKind.Bin)
blackBin.x = 5000
let papBin = sprites.create(assets.image`pap bin`, SpriteKind.Bin)
papBin.x = 200
// where the items belong
let hList = [tunacan, juiceJug]
let pList = [cerealbox, notePage]
/** MECHANICS */
let carryState = false
//  if somethng is being carried
let handFree = 2
// how many things jo can hold
let nearBin = false
// picking up and dropping off
info.setScore(0)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Waste, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function on_button_event_a_pressed() {
        if (jo.overlapsWith(otherSprite)) {
            otherSprite.follow(jo, 75)
        }
        
    })
    controller.B.onEvent(ControllerButtonEvent.Pressed, function on_button_event_b_pressed() {
        otherSprite.follow(null)
        if (jo.overlapsWith(blueBin)) {
            if (hList.indexOf(otherSprite) >= 0) {
                info.changeScoreBy(1)
                otherSprite.destroy()
            }
            
        }
        
        if (jo.overlapsWith(papBin)) {
            if (pList.indexOf(otherSprite) >= 0) {
                info.changeScoreBy(1)
                otherSprite.destroy()
            }
            
        }
        
    })
})
