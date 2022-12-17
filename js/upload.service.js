'use strict'

let gImgId = 18


function onImgInput(ev) {
    loadImageFromInput(ev)
}

function loadImageFromInput(ev) {
    const reader = new FileReader()
    reader.onload = (event) => {
        let img = new Image()
        img.src = event.target.result
        console.log(`${img.src}`)
        let newImg = { id: ++gImgId, url: img.src, keywords: [`new`] }
        gImgs.push(newImg)
        saveImgToStorage()
        img.onload = () => initMeme(newImg.id)
    }
    reader.readAsDataURL(ev.target.files[0])
}
