function init() {
    const resultsElem = document.getElementById('results');
    fetch("users.json")
        .then(usersResp => usersResp.json())
        .then(users => {
            console.log(users);
            return Promise.all(
                users.map(user =>
                    fetch(`https://api.github.com/users/${user.username}`)
                        .then(gitUserResp => gitUserResp.json())
                )
            )
        })
        .then(gitUsers => {
            console.log(gitUsers);
            const images = gitUsers.map(gitUser => {
                const img = new Image();
                img.src = gitUser.avatar_url;
                // resultsElem.appendChild(img);
                resultsElem.insertAdjacentElement('beforeend', img);
                return img;
            })
            return new Promise((resolve, reject) => {
                setTimeout(resolve, 10000, images);
            });
        }).then(images => {
            images.forEach(img => resultsElem.removeChild(img));
        }).finally(() => console.log('Demo finished'));
}

init();