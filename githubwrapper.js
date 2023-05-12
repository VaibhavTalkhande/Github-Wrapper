console.log('github wrapper');

const userNameInput = document.getElementById('userName');
const showDetailsButton = document.getElementById('showDetails');
const profileInfoDiv = document.getElementById('profileInfo');
const reposInfoDiv = document.getElementById('reposInfo');
const  RepostarsDiv = document.getElementById('RepoStars');
// using async and await
showDetailsButton.addEventListener('click', async () => {
    const userName = userNameInput.value;

    //request the data from server: fetch api
    const res = await fetch(`https://api.github.com/users/${userName}`);
    const data = await res.json();
    showProfile(data);
    showReposInfo(userName);
})

function showProfile(data) {
    RepostarsDiv.style.display = 'flex';
    // console.log(data);
    profileInfoDiv.innerHTML = `<div class="card">
        <div class="card-img">
            <img src=${data.avatar_url} alt=${data.name}>
        </div>
        <div class="card-body">
            <div class="card-title">${data.name}</div>
            <div class="card-subHeading">${data.login}</div>
            <div class="card-text">
                <p>${data.bio}</p>
                <p>${data.followers} followers ${data.following} following

                <button>
                        <a href=${data.html_url}>
                            Do checkout Profile
                        </a>
                </button>
            </div>
        </div>
    </div>`
}

async function showReposInfo(userName) {
    const res = await fetch(`https://api.github.com/users/${userName}/repos`);
    const data = await res.json();
    data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    showRepos(data);
    const filterSelect = document.getElementById('filter');
    filterSelect.addEventListener('change', () => {
    const filterValue = filterSelect.value;
    if (filterValue === 'stars') {
        data.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (filterValue === 'forks') {
        data.sort((a, b) => b.forks_count - a.forks_count);
    } else if (filterValue === 'updated') {
        data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    } else if (filterValue === 'size') {
        data.sort((a, b) => b.size - a.size);
    }
    showRepos(data);
})
}

function showRepos(data) {
    console.log(data);
    let output = '';
    data.forEach((repo) => {
        output += `<div class="Project-card">
            <div class="card-body">
                <div class="card-title">${repo.name}</div>
                <div class="card-text">
                <p id="description">${repo.description}</p>
                <div class="card-subHeading">
                    <i class="fas fa-circle" style="color: ${repo.language === 'JavaScript' ? 'yellow' : repo.language === 'HTML' ? 'red' : repo.language === 'CSS' ? 'blue' : repo.language === 'Python' ? 'green' : repo.language === 'C++' ? 'purple' : repo.language === 'C' ? 'orange' : repo.language === 'Java' ? 'pink' : repo.language === 'TypeScript' ? 'brown' : repo.language === 'Ruby' ? 'black' : repo.language === 'PHP' ? 'grey' : 'white'}"></i>
                   ${repo.language}
                </div>
                    <span>
                        <i class="fas fa-star"></i>
                    ${repo.stargazers_count} stars 
                        <i class="fas fa-code-branch"></i>
                    ${repo.forks_count} forks</span>
                    <span>
                    <i class="fas fa-code"></i>
                    ${repo.size} KB</span>
                    </div>
                    </div>
                    <button id="viewRepo">
                        <a href=${repo.html_url}>
                            View Repo
                        </a>
                    </button>
        </div>`
    })
    reposInfoDiv.innerHTML = output;
}
    
