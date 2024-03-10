function searchVideos() {
    const apiKey = "AIzaSyA19RlVxcJoPwoCn25KccFn9VXBohbbos8";
    const searchInput = document.getElementById("searchInput").value;

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchInput}&type=video&maxResults=5&key=${apiKey}`)
        .then(response => response.json())
        .then(data => displaySearchResults(data.items))
        .catch(error => console.error('Error:', error));
}

function displaySearchResults(results) {
    const searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.innerHTML = "";

    results.forEach((result, index) => {
        const title = result.snippet.title;
        const videoId = result.id.videoId;

        const resultDiv = document.createElement("div");
        resultDiv.innerHTML = `<p>${index + 1}. ${title} (Video ID: ${videoId})</p>`;
        resultDiv.onclick = () => getVideoInfo(videoId);

        searchResultsDiv.appendChild(resultDiv);
    });
}

function getVideoInfo(videoId) {
    const apiKey = "AIzaSyA19RlVxcJoPwoCn25KccFn9VXBohbbos8";

    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => displayVideoInfo(data.items[0].snippet))
        .catch(error => console.error('Error:', error));
}

function displayVideoInfo(videoInfo) {
    const videoInfoDiv = document.getElementById("videoInfo");
    videoInfoDiv.innerHTML = `
        <h2>Informasi Video</h2>
        <p><strong>Judul:</strong> ${videoInfo.title}</p>
        <p><strong>Deskripsi:</strong> ${videoInfo.description}</p>
        <img src="${videoInfo.thumbnails.high.url}" alt="Thumbnail">
    `;
}