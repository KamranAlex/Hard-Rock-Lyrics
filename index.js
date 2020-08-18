const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-btn");
const simpleResults = document.getElementById("simple-results");
const facnyResults = document.getElementById("fancy-result");
const showFancyBtn = document.getElementById("show-fancy");
const showSimpleBtn = document.getElementById("show-simple");

const apiLink = "https://api.lyrics.ovh/suggest/";

//Event Listener for SEARCH button...
searchButton.addEventListener("click", function () {
  const searchValue = searchBox.value.trim();
  if (searchValue == "") {
    alert("Please Type a Song or Artist Name !!!");
  } else {
    searchedSongs(searchValue);
    setTimeout(() => {
      document.getElementById("show-fancy").style.display = "block";
    }, 2500);
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
  simpleOutput = "";
  fancyOutput = "";
  for (let i = 0; i < 10; i++) {
    song = results.data[i];

    //Inject Search results to DOM...
    simpleOutput += `<p class='author lead'>
        <strong style="font-size: larger">${
          song.title
        }</strong> - Album by  <span class='artist-name'> ${
      song.artist.name
    }  </span>
        
        <button class='btn btn-success get-lyrics' data-title="${
          song.title
        }" data-artist="${song.artist.name}" id="${
      "get-lyrics-" + i
    }">Get Lyrics</button>
      </p>`;

    fancyOutput += `<div class="single-result row align-items-center my-3 p-3">
              <div class="col-md-2">
                <img src="${song.album.cover_small}" alt="" id="album-cover" />
              </div>

              <div class="col-md-7">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span style="color:yellow">${
                  song.artist.name
                }</span></p>
              </div>

              <div class="col-md-3 text-md-right text-center">
                <button class='btn btn-success get-lyrics' data-title="${
                  song.title
                }" data-artist="${song.artist.name}" id="${
      "get-fancy-lyrics-" + i
    }">Get Lyrics</button>
              
              </div>
              </div>`;
  }
  simpleResults.innerHTML = simpleOutput;
  facnyResults.innerHTML = fancyOutput;

  //Activate Get Lyrics Buttons...
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
        getLyrics = `<span style="color:red; font-size:15px">Sorry, Lyrics couldn't found..!!!</span>`;
      }
      //Inject the lyrics to DOM...
      const singleLyrics = document.getElementById("single-lyrics-simple");
      singleLyrics.innerHTML = `<h3 class="text-success mb-4"><strong>${title}</strong> - <span style="color:yellow; font-size:20px">${artist}</span></h3>
            <pre class="lyric text-white">
              ${getLyrics} 
                  </pre>`;

      const fancyLyrics = document.getElementById("fancy-lyrics");
      fancyLyrics.innerHTML = `<h3 class="text-success mb-4"><strong>${title}</strong> - <span style="color:yellow; font-size:20px">${artist}</span></h3>
            <pre class="lyric text-white">
              ${getLyrics}
                  </pre>`;
    });
}

//Toggle [Simple <=> Fancy] Buttons event Handler...
showFancyBtn.addEventListener("click", function () {
  document.getElementById("fancy-result").style.display = "block";
  document.getElementById("simple-results").style.display = "none";
  document.getElementById("fancy-lyrics").style.display = "block";
  document.getElementById("single-lyrics-simple").style.display = "none";
  document.getElementById("show-simple").style.display = "block";
  document.getElementById("show-fancy").style.display = "none";
});

showSimpleBtn.addEventListener("click", function () {
  document.getElementById("fancy-result").style.display = "none";
  document.getElementById("simple-results").style.display = "block";
  document.getElementById("fancy-lyrics").style.display = "none";
  document.getElementById("single-lyrics-simple").style.display = "block";
  document.getElementById("show-simple").style.display = "none";
  document.getElementById("show-fancy").style.display = "block";
});
