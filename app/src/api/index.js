function delay (time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    })
}

async function registerApi(userInfo) {
    await delay(1000);
    if(JSON.parse(localStorage.getItem("user"))) {
        return false;
    }
    localStorage.setItem("user", JSON.stringify(userInfo));
    return true;
}
async function loginApi(user) {
    await delay(1000);
    const localInfo = JSON.parse(localStorage.getItem("user"));
    if(!localInfo) {
        return false;
    }
    if(localInfo.username != user.value || localInfo.password != user.password) {
        return false;
    }
    return localInfo;
}


export {
    registerApi,
    loginApi,
}