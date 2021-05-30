const searchSongs = async() => {
    const searchText = document.getElementById("search-field").value;
    const url = ` https://api.lyrics.ovh/suggest/:${searchText}`
    toggleSpinner();
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    } catch (error) {
        displayError(error);
    }


}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = "";
    songs.forEach(song => {

        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
        <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        <audio controls>
                        
                        <source src="${song.preview}" type="audio/mpeg">
                      
                      </audio>
                      <a target="blank" href="${song.link}"> <h4> Get Full Song </h4></a>
                     </div>
                       <div class="col-md-3 text-md-right text-center">
                       <div id="loading-spinner" class="d-none">
                       <div class="spinner-border text-primary" role="status">
                           <span class="visually-hidden"></span>
                       </div>
                   </div>
                           <button id="get-lyrics"  onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-danger">Get Lyrics</button>
                         </div>

        `
        songContainer.appendChild(songDiv);
        toggleSpinner();
    });

}

const getLyrics = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayLyric(data.lyrics))
        .catch(error => displayError(error))
}

// const getLyrics = async(artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
//     const res = await fetch(url);
//     const data = await res.json();
//     displayLyric(data.lyrics);

// }

const displayLyric = lyric => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyric;
    lyricsDiv.innerText = '';

}

const displayError = error => {
    const errorMessege = document.getElementById('error-messege');
    const h3 = document.createElement('h3');
    h3.innerText = "something went wrong! it's failed to fetch plz try again after sometimes";
    errorMessege.appendChild(h3);
}

const toggleSpinner = () => {
    const spinner = document.getElementById("loading-spinner");
    const songs = document.getElementById("song-container");
    //const lyric = document.getElementById("get-lyrics");
    spinner.classList.toggle("d-none");
    songs.classList.toggle("d-none");
    //lyric.classList.toggle("d-none");

}