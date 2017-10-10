% Brickbreaker
% __________ Window & Constant & Font & Pic Delcarations __________
const SCREENX : int := 1024
const SCREENY : int := 768
var treePic : int := Pic.FileNew (Dir.Current + "/tree-drawing.jpg")
var fontTNR14 : int := Font.New ("TimesNewRoman:14")
var fontTNR22 : int := Font.New ("TimesNewRoman:22")
var window : int := Window.Open ("offscreenonly,nobuttonbar,title:BrickBreaker,graphics:" + intstr (SCREENX) + ";" + intstr (SCREENY))
% __________ Types __________
type BlockData :
    record
	x, y, w, h, c : int
	defeated : boolean
    end record
type ShellData :
    record
	right, top, left, bottom, c : int
    end record
type PlayerData :
    record
	x, y, w, h, c, xv, speed, speedIncrease : int
    end record
type BallData :
    record
	x, y, r, xv, yv, speed, c : int
    end record
% __________ Global Variables __________
var blockXDimension : int := 20
var blockYDimension : int := 10
var block : array 1 .. blockXDimension, 1 .. blockYDimension of BlockData
var player : PlayerData
var shell : ShellData
var ball : BallData
var chars : array char of boolean
var level : int := 1
var upgrade : string := ""
var life : int := 2
var money : int := 0
var lastHit : int
var debug, nextLevel, lost : boolean := false
var paddleTimer : int := 0
forward procedure Calculate (leftInput, rightInput : boolean)

% __ Default Values __
ball.r := 10
shell.right := 710
shell.top := 680
shell.left := 60
shell.bottom := 50
shell.c := 35
player.w := 70
player.h := 15
player.c := 112
player.speed := 10
ball.speed := 5
ball.c := 48


% __________ NewLevel __________
proc NewLevel (blockW, blockH, xSpace, ySpace : int)
    var xSpacing : int := xSpace
    var ySpacing : int := ySpace

    % Add a life
    life += 1
    lastHit := Time.Elapsed ()
    player.speedIncrease := 0

    % Player Values
    player.x := (shell.left + shell.right) div 2
    player.y := shell.bottom + 5

    % Ball Values
    ball.x := round ((shell.left + shell.right) / 2)
    ball.y := round ((shell.top + shell.bottom) / 2)
    for i : Rand.Int (1, 2) .. 2         % Random X direction
	ball.xv := -ball.speed
    end for
    ball.yv := ball.speed



    % Default Blocks Array
    for y : 1 .. blockYDimension
	for x : 1 .. blockXDimension
	    block (x, y).defeated := true
	end for
    end for
    for y : 1 .. blockYDimension
	% Make sure we stay in our bounds
	% If our to-be y cord is >= 650 then
	% stop creating y
	if y not= 1 then
	    if 470 + (y * (block (1, y - 1).h + ySpacing)) >= 650 then
		exit
	    end if
	end if
	for x : 1 .. blockXDimension
	    % Make sure we stay in our bounds
	    if x not= 1 then
		% If our to-be x cord is >= 660 then
		% stop creating x
		if 60 + (x * (block (x - 1, y).w + xSpacing)) >= 660 then
		    exit
		end if
	    end if
	    % initilaize block values
	    block (x, y).w := blockW
	    block (x, y).h := blockH
	    block (x, y).c := Rand.Int (2, 14)
	    block (x, y).x := 60 + (x * (block (x, y).w + xSpacing))
	    block (x, y).y := 470 + (y * (block (x, y).h + ySpacing))
	    block (x, y).defeated := false

	    % Make sure colors are not matching
	    if x not= 1 then
		loop
		    % No two x colors are alike
		    if block (x, y).c = block (x - 1, y).c then
			block (x, y).c := Rand.Int (4, 12)
		    else
			exit
		    end if
		end loop
	    end if
	    if y not= 1 then
		loop
		    % No two y colors are alike
		    if block (x, y).c = block (x, y - 1).c then
			block (x, y).c := Rand.Int (4, 12)
		    else
			exit
		    end if
		end loop
	    end if
	end for
    end for
end NewLevel

% __________ Draw Blocks __________
proc DrawScreen
    % Draw Shell
    drawfillbox (0, 0, maxx, maxy, grey)
    drawfillbox (shell.left - 3, shell.bottom - 3, shell.right + 2, shell.top + 2, shell.c)
    Pic.Draw (treePic, shell.left, shell.bottom, picCopy)
    Draw.Fill (shell.left - 1, shell.bottom - 1, 35, 35)
    Font.Draw ("Lives: " + intstr (life), 812, 520, fontTNR22, red)
    Font.Draw ("Money: " + intstr (money), 812, 460, fontTNR22, green)
    Font.Draw ("Level: " + intstr (level), 812, 400, fontTNR22, blue)

    % Draw Blocks
    for y : 1 .. blockYDimension
	for x : 1 .. blockXDimension
	    % If the box is valid, then draw it
	    if block (x, y).defeated = false then
		drawfillbox (block (x, y).x, block (x, y).y, block (x, y).x +
		    block (x, y).w, block (x, y).y + block (x, y).h, block (x, y).c)
	    end if
	end for
    end for

    % Draw Player
    drawfillbox (player.x, player.y, player.w + player.x, player.y + player.h, player.c)

    % Draw Ball
    drawfilloval (ball.x, ball.y, ball.r, ball.r, ball.c)
end DrawScreen

% __________ Get Input __________
proc GetInput
    var leftInput, rightInput : boolean := false
    if chars ('d') = true and player.x + player.w < shell.right then
	player.xv := player.speed + player.speedIncrease
	leftInput := true
    elsif chars (KEY_RIGHT_ARROW) = true and player.x + player.w < shell.right then
	player.xv := player.speed + player.speedIncrease
	leftInput := true
    end if
    if chars ('a') = true and player.x > shell.left then
	player.xv := -player.speed - player.speedIncrease
	rightInput := true
    elsif chars (KEY_LEFT_ARROW) = true and player.x > shell.left then
	player.xv := -player.speed - player.speedIncrease
	rightInput := true
    end if
    Calculate (leftInput, rightInput)
end GetInput


% __________ Calculate __________
body proc Calculate
    var speedUp : boolean := false
    player.x += player.xv

    % Speed ball up & paddle up on slow games.
    if ball.yv > 0 and ball.yv < ball.speed + 4 then
	speedUp := true
    elsif ball.yv < 0 and ball.yv > -ball.speed - 4 then
	speedUp := true
    end if
    if Time.Elapsed() - lastHit >= 10000 and speedUp = true then
	Font.Draw ("SPEED UP", (shell.right - shell.left) div 2, (shell.top - shell.bottom) div 2, fontTNR22, red)
	View.Update
	delay (2000)
	if ball.xv > 0 then
	    ball.xv += 2
	elsif ball.xv < 0 then
	    ball.xv += -2
	end if
	if ball.yv > 0 then
	    ball.yv += 2
	elsif ball.yv < 0 then
	    ball.yv += -2
	end if
	player.speedIncrease += 2
	lastHit := Time.Elapsed ()
    end if

    % Keep from paddle going outside shell
    if player.x <= shell.left then
	player.x := shell.left + 1
    elsif player.x + player.w >= shell.right then
	player.x := shell.right - player.w - 1
    end if

    % Collision w/ Block
    for y : 1 .. blockYDimension
	for x : 1 .. blockXDimension
	    % Only check alive blocks
	    if block (x, y).defeated = false then
		% if the x + raidus is >= leftx and x - raidus <= rightx
		if ball.x + ball.r >= block (x, y).x and ball.x - ball.r <= block (x, y).x + block (x, y).w then
		    % if the y + raidus is >= bottom and y - radius <= top
		    if ball.y + ball.r >= block (x, y).y and ball.y - ball.r <= block (x, y).y + block (x, y).h then
			%Block is Defeated
			block (x, y).defeated := true
			money += 5
			ball.yv := ball.yv * -1
			lastHit := Time.Elapsed ()
		    end if
		end if
	    end if
	end for
    end for

    % Collision w/ Player
    % if ballx + r >= paddlex & ballx - r <= paddlex + width
    if ball.x + ball.r >= player.x and ball.x - ball.r <= player.x + player.w then
	% if bally + r >= paddley & bally - r <= paddley + height
	if ball.y + ball.r >= player.y and ball.y - ball.r <= player.y + player.h then
	
	    % Reset YV (Allow for variations in speeds (angles ((slope)))
	    if Time.Elapsed () - paddleTimer > 100 then
	    ball.yv := -ball.speed
	    paddleTimer := Time.Elapsed ()
	    end if
	    % first fourth of the paddle
	    if ball.x > player.x and ball.x < player.x + (player.w/4) then
		if ball.xv > 0 then % Coming from the left
		    ball.yv := (ball.yv * -1) + 4
		elsif ball.xv < 0 then % Coming from right
		    ball.yv := (ball.yv * -1) + 1
		end if
	    % Second fourth of the paddle
	    elsif ball.x > player.x + (player.w/4) and ball.x < player.x + (player.w/3) then
		if ball.xv > 0 then % Coming from the left
		    ball.yv := (ball.yv * -1) + 3
		elsif ball.xv < 0 then % Coming from right
		    ball.yv := (ball.yv * -1) + 2
		end if
	    % Third
	    elsif ball.x > player.x + (player.w/3) and ball.x < player.x + (player.w/2) then
		if ball.xv > 0 then % Coming from the left
		    ball.yv := (ball.yv * -1) + 2
		elsif ball.xv < 0 then % Coming from right
		    ball.yv := (ball.yv * -1) + 3
		end if
	    % Fourth
	    elsif ball.x > player.x + (player.w/2) and ball.x < player.x + player.w then
		if ball.xv > 0 then % Coming from the left
		    ball.yv := (ball.yv * -1) + 1
		elsif ball.xv < 0 then % Coming from right
		    ball.yv := (ball.yv * -1) + 4
		end if
	    end if
	    
	    
	    if leftInput = true and rightInput = false then
		if ball.xv < 0 then
		    ball.xv := ball.xv * -1
		end if
	    elsif leftInput = false and rightInput = true then
		if ball.xv > 0 then
		    ball.xv := ball.xv * -1
		end if
	    end if
	    
	    % Make sure that the ball isn't 'inside' the paddle
	    ball.y := player.y + player.h + ball.r + 1
	end if
    end if

    % Ball Collision w/ Wall
    if ball.x - ball.r <= shell.left then
	ball.xv := ball.xv * -1
    elsif ball.x + ball.r >= shell.right then
	ball.xv := ball.xv * -1
    elsif ball.y - ball.r <= shell.bottom then
	life += -1
	ball.yv := ball.speed
	for i : Rand.Int (1, 2) .. 2 % Random X direction
	    ball.xv := -ball.speed
	end for
	ball.x := (shell.left + shell.right) div 2
	ball.y := (shell.top + shell.bottom) div 2
    elsif ball.y + ball.r >= shell.top then
	ball.yv := ball.yv * -1
    end if

    % Detect if there are any blocks left
    nextLevel := true
    for y : 1 .. blockYDimension
	for x : 1 .. blockXDimension
	    if block (x, y).defeated = false then
		nextLevel := false
		exit
	    end if
	end for
    end for

    % Check for loss
    if life <= 0 then
	nextLevel := true
	lost := true
    end if

    % Move ball
    ball.x += ball.xv
    ball.y += ball.yv

    % Make sure ball is in the shell - Edge Case, preventing a bug.
    if ball.y + ball.r >= shell.top then
	ball.y := shell.top - ball.r - 1 + ball.yv
    elsif ball.x - ball.r <= shell.left then
	ball.x := shell.left + ball.r + 1 + ball.xv
    elsif ball.x + ball.r >= shell.right then
	ball.x := shell.right - ball.r - 1 + ball.xv
    end if
end Calculate

% __________ Debuggers __________
proc Debug (debug_ : boolean)
    if debug_ = true then
	put "Ball Speed: ", ball.speed
	put "XV:", ball.xv, "  YV: ", ball.yv
	put "Time since last hit: ", Time.Elapsed() - lastHit
	var mx, my, mb : int
	Mouse.Where (mx, my, mb)
	if mb = 1 then
	    loop
		cls
		Mouse.Where (mx, my, mb)
		DrawScreen
		put "X: ", mx, " Y:", my
		exit when mb not= 1
		View.Update
		Time.DelaySinceLast (25)
	    end loop
	end if
    end if
end Debug

% __________ Intro __________
proc Intro
    Draw.FillBox (0, 0, maxx, maxy, grey)
    Font.Draw ("Instructions:", 100, 600, fontTNR14, black)
    Font.Draw ("    Break the bricks with the ball. Your paddle will reflect the ball. You may aim the ball by", 100, 580, fontTNR14, red)
    Font.Draw ("hitting the arrow key (or WASD) in the direction you'd like it to go right before the paddle and", 100, 560, fontTNR14, red)
    Font.Draw (" ball collide.", 100, 540, fontTNR14, red)
    Font.Draw ("    You will win after 10 levels have been completed. You may purchase upgrades at the paddle", 100, 500, fontTNR14, green)
    Font.Draw ("store aswell!", 100, 480, fontTNR14, green)
    Font.Draw ("Enjoy!", maxx div 2, 460, fontTNR14, black)
    Font.Draw ("Press any key to continue . . .", maxx div 2 - 30, 230, fontTNR14, black)
    loop
	exit when hasch
    end loop
end Intro
debug := true
% _________ Main Program __________
Intro
loop
    NewLevel (42 - (level * 2), (42 - (level * 2)) div 2, 10, 10)
    loop
	cls
	player.xv := 0
	DrawScreen
	Input.KeyDown (chars)
	GetInput
	Debug (debug)
	View.Update
	exit when nextLevel = true
	Time.DelaySinceLast (17) % 60 FPS
    end loop

    if lost = false then
	money += 100
    end if
    if lost = true then
	put "lost, lives: ", life, "    Money: ", money
	exit
    end if
    level += 1
    if level = 11 then
	put "You win", money
	exit
    end if
    % Upgrade Window
    View.Set ("nooffscreenonly")
    loop
	upgrade := "0"
	cls
	put "UPGRADES", "        MONEY: ", money
	put "(1) Wider Paddle $ 250 \n(2) Bigger Ball $ 250 \n(3) Faster Ball $500 \n(4) Faster Paddle $250"
	put "(5) Extra Life $ 50"
	get upgrade
	if upgrade = "1" and money >= 250 then
	    money += -250
	    player.w += 16
	elsif upgrade = "2" and money >= 250 then
	    money += -250
	    ball.r += 2
	elsif upgrade = "3" and money >= 500 then
	    money += -500
	    ball.speed += 1
	elsif upgrade = "4" and money >= 250 then
	    money += -250
	    player.speed += 1
	elsif upgrade = "5" and money >= 50 then
	    life += 1
	else
	    exit
	end if
    end loop
    View.Set ("offscreenonly")
end loop


% Toggle button for Debug
% Cheats
% Apple graphics
% Sandbox
% Score = Money
% Upgrade UI - including buttons
% Allowing 4 of each upgrade, except 2 ball speeds and unlimited life upgrades

%% -- Total Money In game atm = 5910 -- %%
