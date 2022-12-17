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



function initSavedMemeSection() {

}

function moreSearch() {
    gCurrSerachPage++
    if (gCurrSerachPage * 3 >= gKeys.length) {
        gCurrSerachPage = 0
    }
    renderSearches()
}
