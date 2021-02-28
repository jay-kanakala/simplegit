//import { v4 as uuidv4 } from 'uuid';

// Simple-git without promise 
const simpleGit = require('simple-git')();
// Shelljs package for running shell tasks optional
const shellJs = require('shelljs');
// Simple Git with Promise for handling success and failure
const simpleGitPromise = require('simple-git/promise')();


async function uploadToGit(req, res) {
    try {
        // change current directory to repo directory in local
        shellJs.cd('c:/work/subbu/');
        // Repo name
        const repo = 'simplegit';  //Repo name
        // User name and password of your GitHub
        const userName = 'jay-kanakala';
        const password = 'ert345yu56';
        // Set up GitHub url like this so no manual entry of user pass needed
        const gitHubUrl = `https://${userName}:${password}@github.com/${userName}/${repo}`;
        // add local git config like username and email
        simpleGit.addConfig('user.email','jay.kanakala@gmail.com');
        simpleGit.addConfig('user.name','jay-kanakala');
        // Add remore repo url as origin to repo
        console.log("addbefore");
        simpleGitPromise.addRemote('origin',gitHubUrl);
        // Add all files for commit
        simpleGitPromise.add('.')
            .then(
            (addSuccess) => {
                console.log(addSuccess);
            }, (failedAdd) => {
                console.log('adding files failed');
            });
        // Commit files as Initial Commit
        simpleGitPromise.commit('Intial commit by simplegit')
        .then(
            (successCommit) => {
                console.log(successCommit);
            }, (failed) => {
                console.log('failed commmit');
        });
        // Finally push to online repository
        simpleGitPromise.push('origin','master')
            .then((success) => {
            console.log('repo successfully pushed');
            },(failed)=> {
            console.log('repo push failed');
        });
        let result = "await redis.getAll();"
        if(!result){
            res.status(200).send({message: "No users found", user: []});
        }else{
            res.status(200).send({message: "Users found", user: result});
        }
    } catch(err) {
        console.log(err);
        res.status(200).send({message: err, user: []});
    }    
}

//export the required functions
module.exports = { uploadToGit };