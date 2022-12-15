'use strict'

let gMemeTxt = ''
let gCurrSerachPage = 0
const PAGE_SIZE = 3

function getMeme(key, idx) {
    if (key === `lines`) return gMeme[idx].lines
    if (key === `img`) return getImg(idx)
    if (key === `line`) return gMeme.selectedLineIdx
    if (key === `imgId`) return gMeme.selectedImgId
}

function getKeys() {
    let startIdx = gCurrSerachPage * PAGE_SIZE
    return gKeys.slice(startIdx, startIdx + PAGE_SIZE)

}
function onfilterImg(elSearchWord) {
    console.log(elSearchWord)
    renderImgs(elSearchWord)
}

function getImgs() {

    return gImgs
}
function renderImgs(elSearchWord) {
    let imgs = getImgs()
    var imgsToDisplay = imgs.filter(img =>
        img.keywords.find(key => key.includes(elSearchWord))
    )

    let srtHTMLs = imgsToDisplay.map(img => `
    <img src=${img.url} onclick="initMeme(${img.id - 1})">
    `)

    document.querySelector('.gallery').innerHTML = srtHTMLs.join('')
}

function renderSearches() {
    let keys = getKeys()
    let strHTMLs = keys.map(key => `
    <button class="keys" value="${key}" onclick="onfilterImg(this.value)"
    style="font-size: 26px;">${key}</button>
    `)

    document.querySelector('.search-words').innerHTML = strHTMLs.join('')

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
    if (!imgNum) {
        return gImgs.map(gImgs => gImgs.keywords)
    }
    console.log(gImgs[imgNum].url)
    return gImgs[imgNum].url

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