@namespace
class SpriteKind:
    helper = SpriteKind.create()
    Waste = SpriteKind.create()
    Bin = SpriteKind.create()
'''
syntax of the adding data extension:
    mySprite = sprites.create(sprites.food.small_apple, SpriteKind.player)
    sprites.set_data_string(mySprite, "name", "alex")
    name = sprites.read_data_string(mySprite, "name")
'''

"""
*set up*
"""
p = 'Paper and small cardboard items'
h = 'Glass, hard plastics and metal'
r= 'Residual waste'
e = 'Batteries'
c = 'compost'
allowcarry = False #???what was i doing...

# characters
jo = sprites.create(assets.image("""Jo"""),
    SpriteKind.player)
controller.move_sprite(jo)
scene.camera_follow_sprite(jo)

# scenes
tiles.set_tilemap(tilemap("""
    level1
"""))


# trash items
cerealbox = sprites.create(assets.image("""cerealBox"""),
    SpriteKind.Waste)
sprites.set_data_string(cerealbox, "sortedIn", p or c)
sprites.setDataBoolean(cerealbox, "carryState", False)

tunacan = sprites.create(assets.image("""tuna can"""),
    SpriteKind.Waste)
sprites.set_data_string(tunacan, 'sortedIn', h )
sprites.setDataBoolean(tunacan, "carryState", False)
tunacan.x=cerealbox.x+50

juiceJug = sprites.create(assets.image("""juice jug"""), SpriteKind.Waste)
sprites.setDataBoolean(juiceJug, "carryState", False)
juiceJug.x=tunacan.x+50

notePage = sprites.create(assets.image("""note page"""), SpriteKind.Waste)
sprites.setDataBoolean(juiceJug, "carryState", False)
notePage.x=1000

apple = sprites.create(assets.image("""apple core"""), SpriteKind.Waste)
sprites.setDataBoolean(juiceJug, "carryState", False)
notePage.x=1000



# bins
blueBin = sprites.create(assets.image("""blue bin"""),
    SpriteKind.Bin)
blueBin.x=150

blackBin = sprites.create(assets.image("""black bin"""),
    SpriteKind.Bin)
blackBin.x=5000

papBin = sprites.create(assets.image("""pap bin"""), SpriteKind.Bin)
papBin.x=200



#where the items belong
hList =[tunacan, juiceJug]
pList =[cerealbox, notePage]

'''MECHANICS'''

carryState = False # if somethng is being carried
handFree = 2 #how many things jo can hold
nearBin = False

#picking up and dropping off
info.set_score(0)
def on_on_overlap(sprite, otherSprite):
    def on_button_event_a_pressed():
            if jo.overlaps_with(otherSprite):
                otherSprite.follow(jo, 75)
    controller.player1.on_button_event(ControllerButton.A, ControllerButtonEvent.PRESSED, on_button_event_a_pressed)

    def on_button_event_b_pressed():
        otherSprite.follow(None)
        if jo.overlaps_with(blueBin):
            if otherSprite in hList:
                info.change_score_by(1)
                otherSprite.destroy()
        if jo.overlaps_with(papBin):
            if otherSprite in pList:
                info.change_score_by(1)
                otherSprite.destroy()
    controller.B.on_event(ControllerButtonEvent.PRESSED, on_button_event_b_pressed)
    
sprites.on_overlap(SpriteKind.player, SpriteKind.Waste, on_on_overlap)

#
# I dont get what this is doing



# I dont get what this is doing or how to change it

# stevie.set_position(jo.x - 10, jo.y-10)



