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

        for (var i = 0; i < stars.length; ++i) {
           repositoryNames[stars[i].full_name] = true;
        }

        for (var i = 0; i < repositories.length; ++i) {
            if (repositoryNames[repositories[i].full_name]) {
                starredRepositories.push(repositories[i]);
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
