var leaderboard = [20, 27];
var o = [];
for(var i = 0; i < 999 - leaderboard.length; i+=1) {
      leaderboard.push("None")
}
var seed = "000";
var game = 0;
var gravity = 0;
var airResistence = 0;
var playerSpeed = 0;
var jumpHeight = 0;
var frameCount = 0;
var scene = "seed"
var color = 0;
var playing = true;
var cam = {
    x: 0,
    y: 0,
}
var speed = 0;
if(seed[1] == 0) {
    gravity = 0.018;
    airResistence = 0.5;
    jumps = 1;
    jumpHeight = -2;
    speed = 1.2;
} else if(seed[1] == 1) {
    gravity = 0.04;
    airResistence = 0;
    jumps = 2;
    jumpHeight = -3;
    speed = 2;
} else if(seed[1] == 2) {
    gravity = 0.06;
    airResistence = 0.9;
    jumps = 1;
    jumpHeight = -4;
    speed = 0.3;
} else if(seed[1] == 3) {
    gravity = 0.04;
    airResistence = 0;
    jumps = 3;
    jumpHeight = -3.15;
    speed = 3;
} else if(seed[1] == 4) {
    gravity = -0.04;
    airResistence = 0;
    jumps = 2;
    jumpHeight = -3;
    speed = 2;
} else if(seed[1] == 5) {
    gravity = -0.06;
    airResistence = 0;
    jumps = 3;
    jumpHeight = -4;
    speed = 2;
} else if(seed[1] == 6) {
    gravity = 0.018;
    airResistence = 0.5;
    jumps = 1;
    jumpHeight = -2.5;
    speed = 1.4;
} else if(seed[1] == 7) {
    gravity = 0.005;
    airResistence = 0;
    jumps = 1;
    jumpHeight = -3;
    speed = 2;
} else if(seed[1] == 8) {
    gravity = 0.008;
    airResistence = 0.5;
    jumps = 1;
    jumpHeight = -2;
    speed = 1.2;
} else if(seed[1] == 9) {
    gravity = 0.03;
    airResistence = 0;
    jumps = 2;
    jumpHeight = -3;
    speed = 2;
}
var blocks = [];
function block(x, y, w, h, type) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
};
block.prototype.draw = function() {
    switch(this.type) {
        case "Normal":
            fill(color[1][0], color[1][1], color[0][2]);
            rect(this.x - cam.x, this.y - cam.y, this.w, this.h);
        break;
        case "Lava":
            fill(color[2][0], color[2][1], color[2][2], 0.75 + (frameCount % 100)/400);
            rect(this.x - cam.x, this.y - cam.y, this.w, this.h);
        break;
        case "Finish":
            fill(color[3][0], color[3][1], color[3][2]);
            rect(this.x - cam.x, this.y - cam.y, this.w, this.h);
        break;
    }
};
block.prototype.collide = function(t) {
    if(t.x + 30 > this.x && t.y + 30 > this.y && t.x < this.x + this.w && t.y < this.y + this.h) {
        if(t.x < this.x - 25 || t.x > this.x + this.w - 5) {
            if(t.x < this.x) {
                t.x = this.x - 31;
                t.aX = 0;
            } else {
                t.x = this.x + this.w + 1;
                t.aX = 0;
            }
        } else {
            if(t.y < this.y + this.h/2) {
                t.y = this.y - 31;
                t.aY = 0;
                if(gravity > 0) {
                    t.jump = jumps;
                }
            } else {
                t.y = this.y + this.h + 1;
                t.aY = 0;
                if(gravity < 0) {
                    t.jump = jumps;
                }
            }
        }
        switch(this.type) {
            case "Finish":
                playing = false;
            break;
            case "Lava":
                game.x = canvas.width/2 - 15;
                game.y = canvas.height - 60;
                game.aX = 0;
                game.aY = 0;
                game.jump = jumps;
                game.jumpCool = 0;
                frameCount = 0;
            break;
        }
    }
};
function Game() {
    this.x = canvas.width/2 - 15;
    this.y = canvas.height - 60;
    this.aX = 0;
    this.aY = 0;
    this.type = 0;
    this.color = 0;
    this.jump = jumps;
    this.jumpCool = 0;
}
Game.prototype.draw = function() {
    fill(color[0][0], color[0][1], color[0][2]);
    rect(this.x - cam.x, this.y - cam.y, 30, 30);
};
Game.prototype.update = function() {
    this.x+=this.aX;
    this.y+=this.aY;
    this.aX*=airResistence;
    this.aY+=gravity;
    if(keys[65] || keys[37]) {
        this.aX-=speed;
    } else if(keys[68] || keys[39]) {
        this.aX+=speed;
    }
    if(keys[87] && this.jump > 0 && this.jumpCool < 0 || keys[38] && this.jump > 0 && this.jumpCool < 0) {
        this.aY = jumpHeight;
        this.jump-=1;
        this.jumpCool = 50;
    }
    this.jumpCool-=1;
    if(this.y > canvas.height + 100 && gravity > 0) {
        this.x = canvas.width/2 - 15;
        this.y = canvas.height - 60;
        this.aX = 0;
        this.aY = 0;
        this.jump = jumps;
        this.jumpCool = 0;
        frameCount = 0;
    } else if(this.y < canvas.height - 5620 && gravity < 0){
        this.x = canvas.width/2 - 15;
        this.y = canvas.height - 60;
        this.aX = 0;
        this.aY = 0;
        this.jump = jumps;
        this.jumpCool = 0;
        frameCount = 0;
    }
};
game = new Game();
blocks = [new block(0, canvas.height - 30, canvas.width, 130, "Normal")]

// rectangular button
function button(x, y, w, h, col, d, txt) {
    fill(0, 0, 0);
    rect(x - 3, y - 3, w + 6, h + 6);
    if(mouseX > x && mouseY > y && mouseX < x + w && mouseY < y + h) {
        fill(col[0] + 10, col[1] + 10, col[2] + 10)
        if(clicked) {
            d();
        }
    } else {
        fill(col[0], col[1], col[2])
    }
    rect(x, y, w, h);
    fill(0, 0, 0);
    textAlign("center")
    text(txt[0], x + w/2, y + h/2 + txt[1]/2 - 3, txt[1]);
};

textAlign("center")
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fill(250, 250, 250);
    rect(0, 0, canvas.width, canvas.height)
    switch(scene) {
        case "seed":
            o = "";
            for(var i = 0; i < seed.length; i+=1) {
                o+=seed[i]
            }
            seed = o
            fill(0, 0, 0);
            text(seed[0], canvas.width/2 - 100, canvas.height/2 - 30, 20);
            text(seed[1], canvas.width/2, canvas.height/2 - 30, 20);
            text(seed[2], canvas.width/2 + 100, canvas.height/2 - 30, 20);
            button(canvas.width/2 - 112.5, canvas.height/2 - 87.5, 25, 25, [220, 220, 220], function() {
                o = [];
                for(var i = 0; i < seed.length; i+=1) {
                    if(i == 0) {
                        o.push((parseInt(seed[i]) + 1) % 10);
                    } else {
                        o.push(parseInt(seed[i]));
                    }
                }
                o.join("")
                seed = o;
            }, ["↑", 20])
            button(canvas.width/2 - 12.5, canvas.height/2 - 87.5, 25, 25, [220, 220, 220], function() {
                o = [];
                for(var i = 0; i < seed.length; i+=1) {
                    if(i == 1) {
                        o.push((parseInt(seed[i]) + 1) % 10);
                    } else {
                        o.push(parseInt(seed[i]));
                    }
                }
                o.join("")
                seed = o;
            }, ["↑", 20])
            button(canvas.width/2 + 87.5, canvas.height/2 - 87.5, 25, 25, [220, 220, 220], function() {
                o = [];
                for(var i = 0; i < seed.length; i+=1) {
                    if(i == 2) {
                        o.push((parseInt(seed[i]) + 1) % 10);
                    } else {
                        o.push(parseInt(seed[i]));
                    }
                }
                o.join("")
                seed = o;
            }, ["↑", 20])
            button(canvas.width/2 - 170, canvas.height/2 + 50, 170, 50, [220, 220, 220], function() {
                scene = "game"
                if(Math.seededRandom(0, 9, 9) == 0) {
                    gravity = 0.018;
                    airResistence = 0.5;
                    jumps = 1;
                    jumpHeight = -4;
                    speed = 1.2;
                } else if(Math.seededRandom(0, 9, 9) == 1) {
                    gravity = 0.04;
                    airResistence = 0;
                    jumps = 2;
                    jumpHeight = -3;
                    speed = 2;
                } else if(Math.seededRandom(0, 9, 9) == 2) {
                    gravity = 0.06;
                    airResistence = 0.9;
                    jumps = 1;
                    jumpHeight = -4;
                    speed = 0.3;
                } else if(Math.seededRandom(0, 9, 9) == 3) {
                    gravity = -0.018;
                    airResistence = 0.5;
                    jumps = 1;
                    jumpHeight = 2;
                    speed = 1.2;
                } else if(Math.seededRandom(0, 9, 9) == 4) {
                    gravity = 0.04;
                    airResistence = 0;
                    jumps = 3;
                    jumpHeight = -3.15;
                    speed = 3;
                } else if(Math.seededRandom(0, 9, 9) == 5) {
                    gravity = -0.04;
                    airResistence = 0;
                    jumps = 2;
                    jumpHeight = 3;
                    speed = 2;
                } else if(Math.seededRandom(0, 9, 9) == 6) {
                    gravity = 0.06;
                    airResistence = 0;
                    jumps = 2;
                    jumpHeight = -4;
                    speed = 2;
                } else if(Math.seededRandom(0, 9, 9) == 7) {
                    gravity = 0.05;
                    airResistence = 0;
                    jumps = 1;
                    jumpHeight = -3.5;
                    speed = 2;
                } else if(Math.seededRandom(0, 9, 9) == 8) {
                    gravity = 0.018;
                    airResistence = 0.5;
                    jumps = 1;
                    jumpHeight = -2.3;
                    speed = 1.2;
                } else if(Math.seededRandom(0, 9, 9) == 9) {
                    gravity = 0.04;
                    airResistence = 0;
                    jumps = 2;
                    jumpHeight = -3;
                    speed = 2;
                }
                console.log(jumpHeight)
                var seed = Math.seededRandom(0, 10, 10)
                if(seed == 0) {
                    var x = game.x;
                    for(var i = 0; i < 50; i+=1) {
                        if(i == 49) {
                            blocks.push(new block(x, canvas.height - 120 - (i * 100), 50, 10, "Finish"))
                        } else {
                            blocks.push(new block(x, canvas.height - 120 - (i * 100), 50, 10, "Normal"))
                        }
                        x+=Math.seededRandom(-100, -330, i)
                    }
                } else if(seed == 1) {
                    var x = game.x;
                    blocks.push(new block(x - 50, canvas.height - 75, 50, 10, "Normal"))
                    for(var i = 0; i < 50; i+=1) {
                        if(i == 49) {
                            blocks.push(new block(x, random(canvas.height - 220, canvas.height - 120), 50, 10, "Finish"))
                        } else {
                            blocks.push(new block(x, random(canvas.height - 220, canvas.height - 120), 50, 10, "Normal"))
                        }
                        x+=Math.seededRandom(100, 330, i)
                    }
                } else if(seed == 2) {
                    var x = game.x;
                    blocks.push(new block(x + 50, canvas.height - 75, 50, 10, "Normal"))
                    for(var i = 0; i < 50; i+=1) {
                        if(i == 49) {
                            blocks.push(new block(x, random(canvas.height - 220, canvas.height - 120), 50, 10, "Finish"))
                        } else {
                            blocks.push(new block(x, random(canvas.height - 220, canvas.height - 120), 50, 10, "Normal"))
                        }
                        x+=Math.seededRandom(-100, -330, i)
                    }
                } else if(seed == 3) {
                    var x = game.x - 200;
                    for(var i = 0; i < 50; i+=1) {
                        if(i == 49) {
                            blocks.push(new block(x, random(canvas.height - 220, canvas.height - 120), 150, 10, "Finish"))
                        } else {
                            blocks.push(new block(x, random(canvas.height - 220, canvas.height - 120), 150, 10, "Normal"))
                        }
                        x+=Math.seededRandom(100, 330, i)
                    }
                } else if(seed >= 5) {
                    var x = game.x;
                    blocks.push(new block(x + 50, canvas.height - 75, 50, 10, "Normal"))
                    for(var i = 0; i < 150; i+=1) {
                        if(i == 149) {
                            blocks.push(new block(x, random(canvas.height - 220, canvas.height - 120) - i % 5 * 100, 50, 10, "Finish"))
                        } else {
                            blocks.push(new block(x, random(canvas.height - 220, canvas.height - 120) - i % 5 * 100, 50, 10, "Normal"))
                        }
                        x-=Math.seededRandom(100, 330, i)
                    }
                } else if(seed >= 8) {
                    var x = game.x + 400;
                    
                    blocks.push(new block(x, canvas.height - 30, 11000, 130, "Normal"))
                    blocks.push(new block(x - 100, canvas.height - 130, 101, 210, "Normal"))
                    x+=300
                    for(var i = 0; i < 50; i+=1) {
                        if(i == 49) {
                            blocks.push(new block(x, random(canvas.height - 220, canvas.height - 120), random(10, 250), 210, "Finish"))
                        } else {
                            blocks.push(new block(x, random(canvas.height - 220, canvas.height - 120), random(10, 250), 210, "Normal"))
                        }
                        x+=Math.seededRandom(100, 330, i)
                    }
                    blocks.push(new block(game.x + 400, canvas.height - 80, 99950, 50, "Lava"))
                }
                color = [
                    [Math.seededRandom(0, 200, 0), Math.seededRandom(0, 200, 1), Math.seededRandom(0, 200, 2)],
                    [Math.seededRandom(0, 200, 3), Math.seededRandom(0, 200, 4), Math.seededRandom(0, 200, 5)],
                    [Math.seededRandom(0, 200, 6), Math.seededRandom(0, 200, 7), Math.seededRandom(0, 200, 8)],
                    [Math.seededRandom(0, 200, 0), Math.seededRandom(0, 200, 3), Math.seededRandom(0, 200, 6)],
                ]
                playing = true;
            }, ["Play", 20]);
            button(canvas.width/2 + 10, canvas.height/2 + 50, 140, 50, [220, 220, 220], function() {
                o = "";
                for(var i = 0; i < seed.length; i+=1) {
                    o+=round(random(0, 9))
                }
                seed = o
            }, ["Random Seed", 20]);
            text("Word Record: " + leaderboard[parseInt(seed)], canvas.width/2, canvas.height/2 - 150, 30)
        break;
        case "game":
            fill(0, 0, 0);
            text("Time: " + Math.round(frameCount/200), canvas.width/2, 50, 50)
            text("Seed: " + seed, canvas.width/2, 70, 20)
            for(var i = 0; i < blocks.length; i+=1) {
                blocks[i].draw();
                blocks[i].collide(game)
            }
            game.draw();
            game.update();
            cam.x = lerp(cam.x, game.x - canvas.width/2, 0.1)
            cam.y = lerp(cam.y, game.y - canvas.height/2, 0.1)
            fill(200, 100, 0);
            rect(0, canvas.height + 90 - cam.y, canvas.width, canvas.height)
            if(playing == true) {
                frameCount+=1;
            }
        break;
    }
    clicked = false;
}
start();
