document.addEventListener('DOMContentLoaded', function() {
    const redSlider = document.getElementById('red');
    const greenSlider = document.getElementById('green');
    const blueSlider = document.getElementById('blue');

    const hueSlider = document.getElementById('hue');
    const saturationSlider = document.getElementById('saturation');
    const luminanceSlider = document.getElementById('luminance');

    const redValue = document.getElementById('redValue');
    const greenValue = document.getElementById('greenValue');
    const blueValue = document.getElementById('blueValue');

    const hueValue = document.getElementById('hueValue');
    const saturationValue = document.getElementById('satValue');
    const luminanceValue = document.getElementById('lumValue');

    redValue.value = redSlider.value;
    greenValue.value = greenSlider.value;
    blueValue.value = blueSlider.value;
    hueValue.value = hueSlider.value;
    saturationValue.value = saturationSlider.value;
    luminanceValue.value = luminanceSlider.value;

    redSlider.addEventListener('input', function() {
        redValue.value = redSlider.value;
        updateRGB();
    });
    greenSlider.addEventListener('input', function() {
        greenValue.value = greenSlider.value;
        updateRGB();
    });
    blueSlider.addEventListener('input', function() {
        blueValue.value = blueSlider.value;
        updateRGB();
    });

    hueSlider.addEventListener('input', function() {
        hueValue.value = hueSlider.value;
        updateHSL();
    });
    saturationSlider.addEventListener('input', function() {
        saturationValue.value = saturationSlider.value;
        updateHSL();
    });
    luminanceSlider.addEventListener('input', function() {
        luminanceValue.value = luminanceSlider.value;
        updateHSL();
    });

    redValue.addEventListener('input', function() {
        redSlider.value = redValue.value;
        updateRGB();
    });
    greenValue.addEventListener('input', function() {
        greenSlider.value = greenValue.value;
        updateRGB();
    });
    blueValue.addEventListener('input', function() {
        blueSlider.value = blueValue.value;
        updateRGB();
    });

    hueValue.addEventListener('input', function() {
        hueSlider.value = hueValue.value;
        updateHSL();
    });
    saturationValue.addEventListener('input', function() {
        saturationSlider.value = saturationValue.value;
        updateHSL();
    });
    luminanceValue.addEventListener('input', function() {
        luminanceSlider.value = luminanceValue.value;
        updateHSL();
    });

    const box = document.getElementById('box');
    const hex = document.getElementById('hex');
    hex.value = "000000"
    box.style.backgroundColor = "#" + hex.value;

    hex.addEventListener('input', function() {
        if (isValid(hex.value)) {
            updateRgbSliders();
            updateHslSliders();
        }
    });

    setFills();
});

function isValid(hex) {
    const regex = /^[0-9a-fA-F]{6}$/;
    return regex.test(hex);
}

function updateRGB() {
    const hex = document.getElementById('hex');
    const box = document.getElementById('box');

    hex.value = rgbToHex(
        document.getElementById('red').value,
        document.getElementById('green').value,
        document.getElementById('blue').value
    );

    box.style.backgroundColor = "#" + hex.value;
    updateHslSliders();
}

function updateHSL() {
    const hex = document.getElementById('hex');
    const box = document.getElementById('box');

    hex.value = hslToHex(
        document.getElementById('hue').value,
        document.getElementById('saturation').value,
        document.getElementById('luminance').value
    );

    box.style.backgroundColor = "#" + hex.value;
    updateRgbSliders();
}

function rgbToHex(r, g, b) {
    r = parseInt(r, 10).toString(16);
    g = parseInt(g, 10).toString(16);
    b = parseInt(b, 10).toString(16);

    r = r.length === 1 ? '0' + r : r;
    g = g.length === 1 ? '0' + g : g;
    b = b.length === 1 ? '0' + b : b;

    return r + g + b;
}

function hslToHex(h, s, l) {
    h = parseInt(h, 10);
    s = parseInt(s, 10);
    l = parseInt(l, 10);

    const rgb = hslToRgb(h, s, l);
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function updateRgbSliders() {
    const hex = document.getElementById('hex');
    const rgb = hexToRgb(hex.value);

    document.getElementById('red').value = rgb[0];
    document.getElementById('green').value = rgb[1];
    document.getElementById('blue').value = rgb[2];

    document.getElementById('redValue').value = rgb[0];
    document.getElementById('greenValue').value = rgb[1];
    document.getElementById('blueValue').value = rgb[2];

    setFills();
}

function updateHslSliders() {
    const hex = document.getElementById('hex');
    const rgb = hexToRgb(hex.value);
    const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);

    document.getElementById('hue').value = hsl[0];
    document.getElementById('saturation').value = hsl[1];
    document.getElementById('luminance').value = hsl[2];

    document.getElementById('hueValue').value = hsl[0];
    document.getElementById('satValue').value = hsl[1];
    document.getElementById('lumValue').value = hsl[2];

    setFills();
}

function setFills() {
    const hsl = [document.getElementById('hue').value, document.getElementById('saturation').value, document.getElementById('luminance').value]

    document.getElementById('redBox').style.background = "linear-gradient(to right, rgb(0, 0, 0), rgb(255, 0, 0))"
    document.getElementById('greenBox').style.background = "linear-gradient(to right, rgb(0, 0, 0), rgb(0, 255, 0))"
    document.getElementById('blueBox').style.background = "linear-gradient(to right, rgb(0, 0, 0), rgb(0, 0, 255))"

    document.getElementById('hueBox').style.background = "linear-gradient(to right, hsl(0, 100%, 50%), hsl(120, 100%, 50%), hsl(240, 100%, 50%), hsl(360, 100%, 50%))"
    document.getElementById('satBox').style.background = "linear-gradient(to right, hsl(" + hsl[0] + ", 0%, 50%), hsl(" + hsl[0] + ", 100%, 50%))"
    document.getElementById('lumBox').style.background = "linear-gradient(to right, hsl(" + hsl[0] + ", " + hsl[1] + "%, 0%), hsl(" + hsl[0] + ", " + hsl[1] + "%, 50%), hsl(" + hsl[0] + ", " + hsl[1] + "%, 100%))"
}

function hexToRgb(hex) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}