/*
Copyright (c) 2011, Chris Umbel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var Phonetic = require('./phonetic');

function transformLipps(token) {
    return token.replace(/[bfpv]/g, '1');
}

function transformThroats(token) {
    return token.replace(/[cgjkqsxz]/g, '2');
}

function transformToungue(token) {
    return token.replace(/[dt]/g, '3');
}

function transformL(token) {
    return token.replace(/l/g, '4');
}

function transformHum(token) {
    return token.replace(/[mn]/g, '5');
}

function transformR(token) {
    return token.replace(/r/g, '6');
}

function condense(token) {
    return token.replace(/(\d)[hw]?\1+/g, '$1').replace(/[hw]/g, '');
}

function padRight0(token) {
    if(token.length < 4)
        return token + Array(4 - token.length).join('0');
    else
        return token;
}

var SoundEx = new Phonetic();
module.exports = SoundEx;

SoundEx.process = function(token) {
    token = token.toLowerCase();
    
    return token.charAt(0).toUpperCase() + padRight0(condense(transformLipps(transformThroats(
        transformToungue(transformL(transformHum(transformR(
            token.substr(1, token.length - 1).replace(/[aeiouy]/g, '')))))))
                )).substr(0, 3);
};

// export for tests;
SoundEx.transformLipps = transformLipps;
SoundEx.transformThroats = transformThroats;
SoundEx.transformToungue = transformToungue;
SoundEx.transformL = transformL;
SoundEx.transformHum = transformHum;
SoundEx.transformR = transformR;
SoundEx.condense = condense;
SoundEx.padRight0 = padRight0;
