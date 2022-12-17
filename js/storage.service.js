'use strict'

const STORAGE_KEY = `memeDB`
const STORAGE_KEY_IMGS = `imgsDB`
let gMemes = []


function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    if (key === STORAGE_KEY) gMemes = JSON.parse(val)

    return JSON.parse(val)
}

function saveMemeToStorage() {

    let name = prompt(`Choose a name for your Meme`)
    if (name) {
        updateMemeName(name)
        gMemes.push(gMeme)
        console.log(`gMemes`, gMemes)
        saveToStorage(STORAGE_KEY, gMemes)
    } else return
}

function saveImgToStorage() {
    saveToStorage(STORAGE_KEY_IMGS, gImgs)
}