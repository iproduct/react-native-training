import { User } from './user.js'

async function init() {
    try {
        const resultsElem = document.getElementById('results');
        const usersResp = await fetch("users.json");
        const users = await usersResp.json();
        console.log(users);
        const gitUsers = await Promise.all(
            users.map(async user => {
                const gitUserResp = await fetch(`https://api.github.com/users/${user.username}`);
                const gu = await gitUserResp.json();
                return new User(gu.login, gu.name, gu.avatar_url, gu.public_repos, gu.public_gists, gu.followers);
            })
        );
        console.log(gitUsers);
        const elems = gitUsers.map(u => {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `
                <figure>
                    <img src="${u.pictureUrl}">
                    <figcaption>${u.name} - ${u.username}</figcaption>
                </figure>
            `;
            // resultsElem.appendChild(img);
            resultsElem.insertAdjacentElement('beforeend', userDiv);
            return userDiv;
        });
        // await new Promise((resolve, reject) => {
        //     setTimeout(resolve, 10000);
        // });
        // elems.forEach(elem => resultsElem.removeChild(elem));
    } catch (err) {
        console.log('Error: ', err);
    } finally {
        console.log('Demo finished');
    }
}

init();