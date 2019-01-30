'use strict';

function getRepos(username) {
    console.log(username);
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => 
            displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
}


function displayResults(responseJson) {
    $('.result-display').empty();
    for(let i = 0; i < responseJson.length; i++) {
        //replace the existing image with the new one
        $('.result-display').append(
         `<h2><a href=${responseJson[i].html_url}>${responseJson[i].full_name}</a></h2>`
        );
    }
    //display the results section
    $('.results').removeClass('hidden');
}

function watchForm() {
  $('#button').on("click", event => {
    const username = $('#text').val();
    event.preventDefault();
    getRepos(username);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});