'use strict'

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gImgs = [
    { id: 1, url: '/meme-imgs(square)/1.jpg', keywords: ['funny', 'tramp'] },
    { id: 2, url: '/meme-imgs(square)/2.jpg', keywords: ['love', 'dogs'] },
    { id: 3, url: '/meme-imgs(square)/3.jpg', keywords: ['love', 'dogs'] },
    { id: 4, url: '/meme-imgs(square)/4.jpg', keywords: ['sleep', 'cat'] },
    { id: 5, url: '/meme-imgs(square)/5.jpg', keywords: ['baby', 'funny'] },
    { id: 6, url: '/meme-imgs(square)/6.jpg', keywords: ['explaining', 'person'] },
    { id: 7, url: '/meme-imgs(square)/7.jpg', keywords: ['baby', 'suprise'] },
    { id: 8, url: '/meme-imgs(square)/8.jpg', keywords: ['curious', 'person'] },
    { id: 9, url: '/meme-imgs(square)/9.jpg', keywords: ['laugh', 'baby'] },
    { id: 10, url: '/meme-imgs(square)/1.jpg', keywords: ['laugh', 'obama'] },
    { id: 11, url: '/meme-imgs(square)/11.jpg', keywords: ['kissing', 'fight'] },
    { id: 12, url: '/meme-imgs(square)/12.jpg', keywords: ['you', 'person'] },
    { id: 13, url: '/meme-imgs(square)/13.jpg', keywords: ['toast', 'leonardo-dicaprio'] },
    { id: 14, url: '/meme-imgs(square)/14.jpg', keywords: ['metrix', 'glasses'] },
    { id: 15, url: '/meme-imgs(square)/15.jpg', keywords: ['zero', 'fail'] },
    { id: 16, url: '/meme-imgs(square)/16.jpg', keywords: ['suprise', 'disappointment'] },
    { id: 17, url: '/meme-imgs(square)/17.jpg', keywords: ['putin', 'you'] },
    { id: 18, url: '/meme-imgs(square)/18.jpg', keywords: ['toy-story', 'story'] }
];
let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: getMemeTxt(),
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

function getMemeTxt() {
    return gMemeTxt
}

function updateMemeModelTxt() {
    gMeme.lines[0].txt = getMemeTxt()
}

function updateMemeImgSelectedId(imgId) {
    gMeme.selectedImgId = imgId
}
function getImgs() {
    return gImgs
}


function createMeme(imgNum, drawTxt) {
    gMeme = {
        selectedImgId: imgNum,
        selectedLineIdx: 0,
        lines: [
            {
                txt: getMemeTxt(selectedLineIdx),
                size: 20,
                align: 'left',
                color: 'red'
            }
        ]
    }
}