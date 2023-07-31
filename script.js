const button =document.getElementById('button');
const audioElement =document.getElementById('audio');


// Disable / Enable Buttnon
function toggleButton(){
    button.disabled = !button.disabled;
}


// Passing joke to VoiceRSS Api
function tellMe(joke){
    VoiceRSS.speech({
        key: '3c254e6f0f8741f5b4e2c3eb4e3d8e90',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from joke api
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup){
            joke = `${data.setup}... ${data.delivery}`;
        }else {
            joke = data.joke;
        }
        // Text-To-Speach
        tellMe(joke);
        //toggle button
        toggleButton();
    }catch (error){
        // Catch errors
        console.log('Jokes request failed!', error);
    }
}

// Event Listeners
button.addEventListener('click',getJokes);
audioElement.addEventListener('ended',toggleButton);