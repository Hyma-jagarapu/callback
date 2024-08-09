document.getElementById('callbackButton').addEventListener('click', function() {
    simulateDelay(function() {
        fetchDataAndDisplay();
    });
});

function simulateDelay(callback) {
    setTimeout(callback, 5000);
}

function fetchDataAndDisplay() {
    fetch('https://dummyjson.com/posts')
        .then(response => response.json())
        .then(data => {
            const posts = data.posts;
            const postTitles = posts.map(post => post.title).join('<br>');
            document.getElementById('callbackDiv').innerHTML = `Callback executed after 5 seconds.<br><br>Post Titles:<br>${postTitles}`;
        })
        .catch(error => console.error('Error fetching data:', error));
}
