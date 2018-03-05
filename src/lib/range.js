/**
 * 选取操作，移动光标..
 */
class MyRange {
    moveCurret (textDom, pos) {
        var range
        try {
            if (window.getSelection) {
                range = window.getSelection() // 创建range
                range.selectAllChildren(textDom) // range 选择obj下所有子内容
                range.collapseToEnd() // 光标移至最后
            } else
            if (textDom.setSelectionRange) {
                // IE Support
                textDom.focus()
                textDom.setSelectionRange(pos, pos)
            } else if (textDom.createTextRange) {
                // Firefox support
                range = textDom.createTextRange()
                range.collapse(true)
                range.moveEnd('character', pos)
                range.moveStart('character', pos)
                range.select()
            }
        } catch (e) {
        }
    }
    getRange (dom) {
        if (window.getSelection) {
            let selection = window.getSelection()
            return selection.getRangeAt(0)
        } else if (document.selection) {
            dom.focus()
            var selectRange = document.selection.createRange()
            return selectRange
        }
    }
    getSelection () {
        return window.getSelection() || document.selection
    }
    getCursorPosition (textDom) {
        var cursorPos = 0
        try {
            if (window.getSelection) {
                let selection = window.getSelection()
                return selection.focusOffset
            } else if (document.selection) {
                textDom.focus()
                var selectRange = document.selection.createRange()
                var textLen = textDom.nodeName.toLowerCase().indexOf(/input|textarea/) >= 0 ? textDom.value.length : domQuery.innerText(textDom).length
                selectRange.moveStart('character', -textLen)
                cursorPos = selectRange.text.length
            }
            return cursorPos
        } catch (e) {
            return 0
        }
    }
}
export const myRange = new MyRange()
