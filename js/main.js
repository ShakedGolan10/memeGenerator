'use strict'


let gElCanvas
let gCtx

function initMeme(imgNum) {
    let imgId = getMeme(`imgId`)
    updateMemeImgSelectedId(imgNum)
    imgId = imgNum
    console.log(gMeme.selectedImgId)
    document.querySelector(`.meme-editor`).classList.remove(`hidden`)
    document.querySelector(`.gallery`).classList.add(`hidden`)
    gElCanvas = document.getElementById(`my-canvas`)
    gCtx = gElCanvas.getContext(`2d`)
    renderCanvas()
    renderMeme(imgNum)
}

function init() {
    document.querySelector(`.meme-editor`).classList.add(`hidden`)
    document.querySelector(`.gallery`).classList.remove(`hidden`)
    renderImgs('')
    renderSearches()
    // renderFilters()
}

