'use strict'


let gElCanvas
let gCtx
function updateMemeImgSelectedId(imgId) {

    gMeme.selectedImgId = imgId
}

function init() {
    resetgMeme()
    document.querySelector(`.meme-generator`).classList.add(`hidden`)
    document.querySelector(`.main-screen`).classList.remove(`hidden`)
    document.querySelector(`.saved-meme-gallery`).classList.add(`hidden`)
    addListeners()
    renderImgs(``)
    renderSearches()
    // renderFilters()
}

function initMeme(imgId) {
    updateMemeImgSelectedId(imgId)
    document.querySelector(`.meme-generator`).classList.remove(`hidden`)
    document.querySelector(`.main-screen`).classList.add(`hidden`)
    document.querySelector(`.saved-meme-gallery`).classList.add(`hidden`)

    gElCanvas = document.getElementById(`my-canvas`)
    gCtx = gElCanvas.getContext(`2d`)
    renderCanvas()

    renderMeme()
    resizeCanvas()
}



function initSavedMemes() {
    document.querySelector(`.saved-meme-gallery`).classList.remove(`hidden`)
    document.querySelector(`.meme-generator`).classList.add(`hidden`)
    document.querySelector(`.main-screen`).classList.add(`hidden`)

    renderSavedMemesGallery()
}

function addListeners() {
    window.addEventListener(`resize`, () => {
        resizeCanvas()
    })
}

function resizeCanvas() {
    let elContainer = document.querySelector(`.canvas-container`)
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetWidth
    renderCanvas()
    renderMeme()
}

