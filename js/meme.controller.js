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

function updateMemeModal(savedMemeIdx) {
    let galleryMemes = loadFromStorage(STORAGE_KEY)

    gMeme = galleryMemes[savedMemeIdx]
    console.log(`gMeme`, gMeme)
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
function deleteSavedMeme(memeNum) {
    gMemes.splice(memeNum - 1, 1)
    saveToStorage(STORAGE_KEY, gMemes)
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

function getKeys() {
    let startIdx = gCurrSerachPage * PAGE_SIZE
    return gKeys.slice(startIdx, startIdx + PAGE_SIZE)

}
function onfilterImg(elSearchWord) {
    console.log(elSearchWord)
    renderImgs(elSearchWord)
}

function getImgs() {
    // resetgMeme()
    let imgs = (loadFromStorage(STORAGE_KEY_IMGS)) ? loadFromStorage(STORAGE_KEY_IMGS) : gImgs

    return imgs
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

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function deleteLine() {
    gMeme[`lines`].splice(gMeme.selectedLineIdx, 1)
}


function getImgUrl(imgNum) {
    if (!imgNum) {
        return gImgs.map(gImgs => gImgs.keywords)
    }
    return gImgs[imgNum - 1].url

}

function changeColor(color) {
    gMeme.lines[getMeme(`line`)].color = color
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

function addLine() {
    let diff = 100
    gNewYOfLine += diff
    let newLine = {
        txt: ` `,
        font: "50px ariel",
        align: 'left',
        color: 'black',
        x: 200,
        y: gNewYOfLine
    }

    if (gNewYOfLine > gElCanvas.height) gNewYOfLine = 150
    gMeme[`lines`].push(newLine)

}

function onChangeSelectedLine() {

    changeLine()
}
function updateTxtOnInput() {
    document.querySelector(`.txt-input`).value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function changeLine() {

    gMeme.selectedLineIdx++
    if (gMeme[`lines`].length < gMeme.selectedLineIdx + 1) gMeme.selectedLineIdx = 0
    updateTxtOnInput()
}

function changeFontSize(size) {
    let textFont = gMeme.lines[gMeme.selectedLineIdx].font
    let fontSize = textFont.substring(0, 2)
    let newFontSize = fontSize
    if (size.innerText === 'A+') fontSize++
    else fontSize--
    textFont = textFont.replace(newFontSize, fontSize)
    gMeme.lines[gMeme.selectedLineIdx].font = textFont
    renderMeme()
}

function onChangeFontSize(size) {
    changeFontSize(size)
}
// function changeTxt() {
//     gMeme.lines[getMeme(`line`)].txt
// }

