'use strict'

let gFilterBy
let gKeys = ['funny', `dogs`, `cat`, `baby`,
    `person`, `curious`, `suprise`, `politician`, `celeb`,
    `fight`, `toast`, `matrix`, `toy-story`
]
let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gImgs = [
    { id: 1, url: '/meme-imgs(square)/1.jpg', keywords: ['funny', `politician`] },
    { id: 2, url: '/meme-imgs(square)/2.jpg', keywords: ['dogs'] },
    { id: 3, url: '/meme-imgs(square)/3.jpg', keywords: [`baby`, 'dogs'] },
    { id: 4, url: '/meme-imgs(square)/4.jpg', keywords: ['cat'] },
    { id: 5, url: '/meme-imgs(square)/5.jpg', keywords: ['baby', 'funny'] },
    { id: 6, url: '/meme-imgs(square)/6.jpg', keywords: ['person'] },
    { id: 7, url: '/meme-imgs(square)/7.jpg', keywords: ['baby', 'suprise'] },
    { id: 8, url: '/meme-imgs(square)/8.jpg', keywords: ['curious', 'person'] },
    { id: 9, url: '/meme-imgs(square)/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: '/meme-imgs(square)/10.jpg', keywords: ['funny', 'politician'] },
    { id: 11, url: '/meme-imgs(square)/11.jpg', keywords: ['fight'] },
    { id: 12, url: '/meme-imgs(square)/12.jpg', keywords: ['person', `celeb`] },
    { id: 13, url: '/meme-imgs(square)/13.jpg', keywords: ['toast', `celeb`] },
    { id: 14, url: '/meme-imgs(square)/14.jpg', keywords: ['matrix'] },
    { id: 15, url: '/meme-imgs(square)/15.jpg', keywords: ['celeb'] },
    { id: 16, url: '/meme-imgs(square)/16.jpg', keywords: ['suprise'] },
    { id: 17, url: '/meme-imgs(square)/17.jpg', keywords: ['politician'] },
    { id: 18, url: '/meme-imgs(square)/18.jpg', keywords: ['toy-story'] }
];



let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: ``,
            font: "50px ariel",
            align: 'left',
            color: 'black',
            x: 200,
            y: 200
        }
    ],
    name: ``
}

function resetgMeme() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: ``,
                font: "50px ariel",
                align: 'left',
                color: 'black',
                x: 200,
                y: 200
            }
        ],
        name: ``
    }
    updateTxtOnInput()
}

function getMemeTxt() {
    return gMeme.lines[getMeme(`line`)].txt
}
function updateMemeModelTxt(val) {
    gMeme.lines[getMeme(`line`)].txt = val


}
function updateMemeModal(savedMemeIdx) {
    let galleryMemes = loadFromStorage(STORAGE_KEY)

    gMeme = galleryMemes[savedMemeIdx]
    console.log(`gMeme`, gMeme)
}

function deleteSavedMeme(memeNum) {
    gMemes.splice(memeNum - 1, 1)
    saveToStorage(STORAGE_KEY, gMemes)
}

function moreSearch() {
    gCurrSerachPage++
    if (gCurrSerachPage * 3 >= gKeys.length) {
        gCurrSerachPage = 0
    }
    renderSearches()
}


function getKeys() {
    let startIdx = gCurrSerachPage * PAGE_SIZE
    return gKeys.slice(startIdx, startIdx + PAGE_SIZE)

}


function getImgs() {
    // resetgMeme()
    let imgs = (loadFromStorage(STORAGE_KEY_IMGS)) ? loadFromStorage(STORAGE_KEY_IMGS) : gImgs

    return imgs
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


function updateMemeName(name) {
    gMeme.name = name
}
