"use strict";

// the token is read only, so calm your tits
var github = new GitHub({token: '29616f2628c43b5156bdd928cd8b30da539d2972'});
var githubGet = Promise.promisify(github.get, {context: github});

Promise.join(
    githubGet('orgs/eloquent/repos?type=public', {all: true}),
    githubGet('users/ezzatron/starred', {all: true}),

    function (repositories, stars) {
        var repositoryNames = {};
        var starredRepositories = [];

        for (let star of stars) {
           repositoryNames[star.full_name] = true;
        }

        for (let repository of repositories) {
            if (repositoryNames[repository.full_name]) {
                starredRepositories.push(repository);
            }
        }

        riot.mount('github-repository-list', {repositories: starredRepositories});
    }
)
.catch(
    function (error) {
        var repositoryList = document.querySelector('github-repository-list p')

        repositoryList.classList.add('error');
        repositoryList.innerHTML =
            'Sorry, something went wrong; probably rate limiting. ' +
            'Try <a href="https://github.com/eloquent">GitHub</a> instead.';
    }
);
