import keyboardJS from 'keyboardJS'
// import { ipcSender } from 'ipcModule'
// import { storage } from 'storage'

export function send (callback) {
    keyboardJS.bind('enter', event => {
        callback(event)
    })
}

export function onEnter (callback) {
    keyboardJS.bind(['command+enter', 'ctrl+enter'], () => {
        callback()
    })
}

export function select (callback) {
    keyboardJS.bind(['command+a', 'ctrl+a'], e => {
        console.log('select all', e)
        e.preventDefault()
        callback && callback()
    })
}

// export function enter (html) {
//     keyboardJS.bind('enter', (e) => {
//         if (e.keyCode === 13) {
//             let textRange = html.selection.createRange()
//             textRange.text = '\r\n'
//             textRange.select()
//             e.returnValue = false
//         }
//     })
// }
