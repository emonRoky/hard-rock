const inputSongName = document.getElementById('inputValue');
const displyLyrics = document.getElementById('display-lyrics')
const displaySong = document.getElementById('display-song');
document.getElementById('submitBtn').addEventListener('click',function(){
    fetch("https://api.lyrics.ovh/suggest/"+ inputSongName.value +"/")
    .then(response => response.json())
    .then(data =>{
      showData(data)
    })
    inputSongName.value ="";
});

function showData(data){

    for (i = 0; i<10 ; i++){
        let title = data.data[i].title;
        let name = data.data[i].artist.name;

        displaySong.innerHTML += `
                        <div class="single-result row align-items-center my-3 p-3">
                        <div class="col-md-9">
                            <h3 id="song-title" class="lyrics-name">${title}</h3>
                            <p class="author lead">Album by <span> ${name} </span></p>
                        </div>
                        <div class="col-md-3 text-md-right text-center">
                            <button onclick="getLyrics('${name}','${title}')" class="btn btn-success">Get Lyrics</button>
                        </div>
                    </div>
                    `          
    }

}
function getLyrics(name , title){
    fetch(`https://api.lyrics.ovh/v1/${name}/${title}`)
    .then(response => response.json())
    .then(data => {
        if(data.lyrics == undefined){
            alert("did't find the lyrics");
        }
        displyLyrics.innerHTML +=`
        <h2  class="text-success mb-4">${title} - ${name}</h2>
        <pre class="lyric text-white">
        ${data.lyrics}
        </pre>
        `
    });
    displaySong.style.display = "none";
};





