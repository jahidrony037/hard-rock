const searchSongs = async() => {
    const searchText = document.getElementById("search-field").value;
    const url = ` https://api.lyrics.ovh/suggests/:${searchText}`

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
                     </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>

        `
        songContainer.appendChild(songDiv);
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

}

const displayError = error => {
    const errorMessege = document.getElementById('error-messege');
    const h3 = document.createElement('h3');
    h3.innerText = "something went wrong! it's failed to fetch plz try again after sometimes";
    errorMessege.appendChild(h3);
}