'use strict'

let gMemeTxt = ''

function getMeme(key, idx) {
    if (key === `lines`) return gMeme[idx].lines
    if (key === `img`) return getImg(idx)
    if (key === `line`) return gMeme.selectedLineIdx
    if (key === `imgId`) return gMeme.selectedImgId
}


function renderCanvas() {
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)

}

function renderMeme(imgNum) {
    const elImg = new Image()
    console.log(imgNum)
    elImg.src = getImg(imgNum)
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawTxt(gMemeTxt)
    }
}

function getImg(imgNum) {
    console.log(gImgs[imgNum].url)
    return gImgs[imgNum].url
}

function renderImgs() {
    let imgs = getImgs()
    let srtHTMLs = imgs.map(img => `
    <img src=${img.url} onclick="initMeme(${img.id - 1})">
    `)

    document.querySelector('.gallery').innerHTML = srtHTMLs.join('')
}



function drawTxt(text) {

    gMemeTxt = text
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = "40px arial";
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(gMemeTxt, 250, 250)
    gCtx.strokeText(gMemeTxt, 250, 250)
    console.log(gMeme.lines[0].txt)
}

function onGetKey(val) {
    gMemeTxt = val
    updateMemeModelTxt()
    renderMeme(getMeme(`imgId`))

}