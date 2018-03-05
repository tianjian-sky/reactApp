import Mousetrap from 'mousetrap'
import { ipcSender } from 'ipcModule'
import { storage } from 'storage'
// import { chatManager } from 'chatManager'

export function keyListening () {
    Mousetrap.bind(['command+q', 'ctrl+q'], () => {
        ipcSender('close')
    })

    Mousetrap.bind('command+/', () => {
        window.db.find({}, (err, docs) => {
            if (!err) {
                console.log(docs)
            } else {
                console.error(err)
            }
        })
    })

    Mousetrap.bind('command+1', () => {
        window.db.findOne({ _id: 'appPath' }, (err, doc) => {
            if (!err) {
                console.log(doc)
            } else {
                console.error(err)
            }
        })
    })

    Mousetrap.bind('command+2', () => {
        window.db.findOne({ _id: storage.doctorInfo('id') + '-msgs' }, (err, doc) => {
            if (!err) {
                console.log(doc)
            } else {
                console.error(err)
            }
        })
    })

    Mousetrap.bind('command+3', () => {
        window.db.findOne({ _id: storage.doctorInfo('id') + '-patients' }, (err, doc) => {
            if (!err) {
                console.log(doc)
            } else {
                console.error(err)
            }
        })
    })

    Mousetrap.bind('command+4', () => {
        window.db.findOne({ _id: storage.doctorInfo('id') + '-session' }, (err, doc) => {
            if (!err) {
                console.log(doc)
            } else {
                console.error(err)
            }
        })
    })

    Mousetrap.bind('command+5', () => {
        window.db.findOne({ _id: storage.doctorInfo('id') + '-unread' }, (err, doc) => {
            if (!err) {
                console.log(doc)
            } else {
                console.error(err)
            }
        })
    })

    Mousetrap.bind('command+;', () => {
        ipcSender('dev')
    })

    Mousetrap.bind('command+enter', () => {
        console.log('mouse on')
        // const _inputNode = document.getElementById('msgInput')
        // chatManager.send({ msg: _inputNode.innerHTML, patientDocId: storage.doctorInfo('id') })
    })
}
