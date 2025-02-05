
// makes it more like javascript
var gems = 0;
var canvas = document.getElementById("canvi");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var mouseX = 0;
var mouseY = 0;
var dragged = false;
var clicked = false
var keys = [];

canvas.addEventListener("mousemove", function(e) {
    var cRect = canvas.getBoundingClientRect();
    mouseX = Math.round(e.clientX - cRect.left);
    mouseY = Math.round(e.clientY - cRect.top);
});
canvas.addEventListener("mousedown", function(e) {
    dragged = true;
}, false);
canvas.addEventListener("mouseup", function(e) {
    if(dragged === true) {
        clicked = true;
        dragged = false;
    }
}, false);
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);
// change and save gems
function changeGems(add) {
    gems+=add;
    localStorage.setItem("gems", parseInt(gems));
};
function keysPressed(e) {
    // store an entry for every key pressed
    keys[e.keyCode] = true;
    e.preventDefault();
}
function keysReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
}
function cos(r) {
    return Math.cos(r);
}
function sin(r) {
    return Math.sin(r);
}
function atan2(y, x) {
    return Math.atan2(y, x);
}
function round(num) {
    return Math.round(num);
}
function floor(num) {
    return Math.floor(num)
}
function random(min, max) {
    return min + Math.random(0, 1) * (max - min);
        }
        function dist(x, y, x2, y2) {
            var a = x - x2;
            var b = y - y2;
            return Math.sqrt(a * a + b * b);
        }
        function text(txt, x, y, size) {
            ctx.font = size + "px Arial";
            ctx.fillText(txt, x, y);
        }
        function fill(r, g, b, a) {
            if(a === undefined) {
                a = 1;
            }
            ctx.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
        }
        function stroke(r, g, b, a) {
            if(a == undefined) {
                a = 1;
            }
            ctx.strokeStyle = "rgb(" + r + ", " + g + ", " + b + "," + a + ")";
        }
        function rect(x, y, w, h, r) {
            ctx.save();
            ctx.translate(x, y)
            ctx.rotate(r);
            ctx.fillRect(0, 0, w, h);
            ctx.restore();
        }
        function strokeWeight(s) {
            ctx.lineWidth = s;
        }
        function line(x1, y1, x2, y2) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2)
            ctx.stroke();
        }
        function eRect(x, y, w, h, col) {
            ctx.beginPath();
            stroke(col[0], col[1], col[2]);
            ctx.rect(x, y, w, h);
            ctx.stroke();
        }
        function start() {
            var myVar = setInterval(draw, 1);
        }
        function textAlign(align) {
            ctx.textAlign = align;
        }
        function lerp(a, b, t) {
            return a + (b - a) * t;
        }
        function dist2(a, b, d) {
            return (a - b) > -d && (a - b) < d;
        }
        function ellipse(x, y, radiusX, radiusY, rotation) {
            ctx.beginPath();
            ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, 2 * Math.PI);
            ctx.fill();
        }
function arc(x, y, radiusX, radiusY, start, end) {
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, 0, start, end);
    ctx.fill();
}
function eArc(x, y, radiusX, radiusY, start, end) {
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, 0, start, end);
    ctx.stroke();
}
function eEllipse(x, y, radiusX, radiusY, rotation) {
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, 2 * Math.PI);
    ctx.stroke();
}
function triangle(x1, y1, x2, y2, x3, y3) {
    // the triangle
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill()
};
function constrain(num, m, ma) {
    if(num < m) {
        num = m;
    } else if(num > ma) {
        num = ma;
    }
    return num;
}
Math.seededRandom = function(max, min, d) {
    max = max || 1;
    min = min || 0;
    var z = 0;

    z = ((seed + d) * 9301 + 49297) % 233280;
    var rnd = (z + d) / 233280.0;

    return round(min + rnd * (max - min));
}
