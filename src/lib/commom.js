export function random (number) {
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let res = ''
    for (let i = 0; i < number; i++) {
        let index = getIndex()
        res += chars[index]
    }

    function getIndex () {
        const _random = Math.ceil(Math.random() * chars.length)
        if (_random < chars.length) {
            return _random
        } else {
            return getIndex()
        }
    }

    return res
}
