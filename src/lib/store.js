import { globalVars } from 'globalVars'
import cookie from 'js-cookie'

const getItem = Symbol('getItem')

/**
 * sessionStorage封装
 */
class Storage {
    doctorInfo (key) {
        const keys = ['id', 'name', 'avatar', 'gender']
        // const _doctor = this[getItem]('doctorBaseInfo')

        if (keys.includes(key)) {
            let doctorInfo = JSON.parse(cookie.get('doctorBaseInfo'))
            return doctorInfo[key]
        } else {
            console.error('storage.getDoctorInfo key is not define')
        }
    }

    getDoctorInfo () {
        return this[getItem]('doctorBaseInfo')
    }

    getPatientById (id) {
        const patientList = JSON.parse(cookie.get('patientDocs'))
        const _index = patientList.findIndex(value => { return value.patientDocId === id })
        if (_index > -1) {
            return patientList[_index]
        }
    }

    patients () {
        return JSON.parse(cookie.get('patients'))
    }

    getKey (key) {
        return this.doctorInfo('id') + '-' + key
    }

    [getItem] (key) {
        return JSON.parse(cookie.get(key))
    }
}

export const storage = new Storage()
