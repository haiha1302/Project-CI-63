export function verifyEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

export function md5(string) {
    return CryptoJS.MD5(string).toString()
}

export function getDataFromDocs(docs) {
    const data = []
    docs.forEach((doc) => {
        data.push(getDataFromDoc(doc))
    })
    return data
}

export function getDataFromDoc(doc) {
    let data = doc.data()
    data.id = doc.id
    return data
}

export function saveCurrentUser(currentUser) {
    localStorage.setItem('current-user', JSON.stringify(currentUser))
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('current-user'))
}