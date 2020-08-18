const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-btn");
const simpleResults = document.getElementById("simple-results");

const apiLink = "https://api.lyrics.ovh/suggest/";

//Event Listener for SEARCH button...
searchButton.addEventListener("click", function () {
  const searchValue = searchBox.value.trim();
  if (searchValue == "") {
    alert("Please Type a Song or Artist Name !!!");
  } else {
    searchedSongs(searchValue);
  }
});

//Search by Song or Artist...
function searchedSongs(searchData) {
  fetch(`${apiLink}${searchData}`)
    .then((res) => res.json())
    .then((data) => showData(data));
}

// Show the Searched Results..
function showData(results) {
  output = "";
  for (let i = 0; i < 10; i++) {
    song = results.data[i];
    output += `<p class='author lead'>
      <strong>${song.title}</strong> - Album by <span class='artist-name'> ${
      song.artist.name
    }</span>
       
      <button class='btn btn-success get-lyrics' data-title="${
        song.title
      }" data-artist="${song.artist.name}" id="${
      "get-lyrics-" + i
    }">Get Lyrics</button>
     </p>`;
  }
  simpleResults.innerHTML = output;

  //Activate Get Lyrics Button...
  const getLyricsBtn = document.getElementsByClassName("get-lyrics");
  for (let j = 0; j < getLyricsBtn.length; j++) {
    getLyricsBtn[j].addEventListener("click", function () {
      const title = this.getAttribute("data-title");
      const artist = this.getAttribute("data-artist");

      getSongLyrics(title, artist);
    });
  }
}

//Get & show the Lyrics...
function getSongLyrics(title, artist) {
  fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then((res) => res.json())
    .then((data) => {
      let getLyrics = data.lyrics;

      if (getLyrics == undefined) {
        getLyrics = `<span style="color:red; font-size:20px">Sorry, Lyrics couldn't found..!!!</span>`;
      }

      const singleLyrics = document.getElementById("single-lyrics-simple");
      singleLyrics.innerHTML = `<h3 class="text-success mb-4"><strong>${title}</strong> - <span style="color:yellow; font-size:20px">${artist}</span></h3>
          <pre class="lyric text-white">
            ${getLyrics} 
                </pre>`;
    });
}
