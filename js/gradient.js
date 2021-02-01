
const colors = [[62,35,255],
    [60,255,60],
    [255,35,98],
    [45,175,230],
    [255,0,255],
    [255,128,0]];
let step = 0;
let colorIndices = [0,1,2,3];

let gradientSpeed = 0.002;

function updateGradient(ctx) {


    let c0_0 = colors[colorIndices[0]];
    let c0_1 = colors[colorIndices[1]];
    let c1_0 = colors[colorIndices[2]];
    let c1_1 = colors[colorIndices[3]];

    let istep = 1 - step;

    let color1 = getHexColor(istep, c0_0, c0_1)

    let color2 = getHexColor(istep, c1_0, c1_1)

    step += gradientSpeed;
    if ( step >= 1 ) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];
        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    }
    let grd = ctx.createLinearGradient(0, 0, 1500, 0);
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);
    return grd
}

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getHexColor(s, a, b) {
    let cr = Math.round(s * a[0] + step * b[0]);
    let cg = Math.round(s * a[1] + step * b[1]);
    let cb = Math.round(s * a[2] + step * b[2]);
    return rgbToHex(cr, cg, cb);
}

