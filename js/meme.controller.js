'use strict'

let gMemeTxt = ''
let gCurrSerachPage = 0
let gNewYOfLine = 150
const PAGE_SIZE = 3

function getMeme(key, idx) {
    if (key === `allLines`) return gMeme.lines
    if (key === `lines`) return gMeme.lines[idx]
    if (key === `line`) return gMeme.selectedLineIdx
    if (key === `imgId`) return gMeme.selectedImgId

}

function OpenMenu() {
    document.body.classList.toggle('menu-open');
}

function renderSavedMemesGallery() {
    let galleryMemes = loadFromStorage(STORAGE_KEY)

    console.log(galleryMemes)
    let elMemes = document.querySelector(`.saved-memes`)
    let imgsIds = galleryMemes.map(meme => meme.selectedImgId)
    console.log(`imgsIds`, imgsIds)

    let srtHTMLs = imgsIds.map((imgId, idx) => `
    <img src=${getImgUrl(imgId)} onclick="initMeme(${imgId});updateMemeModal(${idx})">`)

    console.log(`srtHTMLs`, srtHTMLs)

    elMemes.innerHTML = srtHTMLs.join('')



}



function renderMeme() {

    let currImg = getMeme(`imgId`)


    const elImg = new Image()
    elImg.src = getImgUrl(currImg)
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        let memes = getMeme(`allLines`)
        updateTxtOnInput()

        memes.forEach((meme) => {
            return drawTxt(meme.txt, meme.font, meme.color, meme.x, meme.y)
        }
        )
    }
}

function onMoveLine(direction) {

    moveLine(direction)

}

function onDeleteSavedMeme() {
    let deletedMemeNum = prompt(`Which meme you want to delete? (enter a number)`)
    deleteSavedMeme(deletedMemeNum)
    renderSavedMemesGallery()
}

function moveLine(direction) {
    if (direction.innerText === `⬆`) {
        gMeme.lines[gMeme.selectedLineIdx].y -= 20
        renderMeme()
    }
    if (direction.innerText === `⬇`) {
        gMeme.lines[gMeme.selectedLineIdx].y += 20
        renderMeme()
    }
    if (direction.innerText === `⬅`) {
        gMeme.lines[gMeme.selectedLineIdx].x -= 20
        renderMeme()
    }
    if (direction.innerText === `➡`) {
        gMeme.lines[gMeme.selectedLineIdx].x += 20
        renderMeme()
    }

}

function drawTxt(txt, font, color, x, y) {


    gCtx.lineWidth = 2
    gCtx.strokeStyle = color
    gCtx.fillStyle = color
    gCtx.font = font
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function onfilterImg(elSearchWord) {
    console.log(elSearchWord)
    renderImgs(elSearchWord)
}

function renderImgs(elSearchWord) {
    let imgs = getImgs()
    let imgsToDisplay = imgs.filter(img =>
        img.keywords.find(key => key.includes(elSearchWord))
    )
    console.log(imgs)
    let strHTMLs = imgsToDisplay.map((img) => `
    <img src=${img.url} onclick="initMeme(${img[`id`]})">
    `)
    document.querySelector('.gallery').innerHTML = strHTMLs.join('')
}

function renderSearches() {
    let keys = getKeys()
    console.log(keys)
    let strHTMLs = keys.map(key => `
    <button class="keys btn" value="${key}" onclick="onfilterImg(this.value)"
    style="font-size: 26px;">${key}</button>
    `)

    document.querySelector('.search-words').innerHTML = strHTMLs.join('')

}


function renderCanvas() {
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)

}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}


function onChangeColor(color) {
    changeColor(color)
}





function onGetText(val) {
    updateMemeModelTxt(val)
    renderMeme()

}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function onAddLine() {
    addLine()
    changeLine()
}


function onChangeSelectedLine() {

    changeLine()
}
function updateTxtOnInput() {
    document.querySelector(`.txt-input`).value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function onChangeFontSize(size) {
    changeFontSize(size)
}

