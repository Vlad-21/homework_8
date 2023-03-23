const PORT = 3004;

export function getUserData () {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:${PORT}/userList`).then((response) => {
            response.json().then((data) => {
                resolve(data);
            }).catch((e) => {
                reject(e);
            })
        }).catch((e) => {
            reject(e);
        });
    });
}

export function createUser (userData) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:${PORT}/userList`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }).then(response => {
            resolve(response);
        }).catch(e => {
            reject(e);
        })
    });
}


export function updateUser (userID, userData) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:${PORT}/userList/${userID}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }).then((response) => {
            resolve(response);
            })
            .catch((e) => {
                reject(e);
            })
    });
}

export function deleteUser (userID) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:${PORT}/userList/${userID}`, {
            method: "DELETE",
        }).then((response) => {
            resolve(response);
        }).catch((e) => {
            reject(e);
        });
    });
}