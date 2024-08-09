document.getElementById('promiseButton').addEventListener('click', function() {
    document.getElementById('promiseDiv').textContent = 'Loading...';

    fetchDataWithTimeout('https://dummyjson.com/posts', 5000)
        .then(data => {
            const posts = data.posts;
            const postTitles = posts.map(post => post.title).join('<br>');
            document.getElementById('promiseDiv').innerHTML = `Fetched Data:<br>${postTitles}`;
        })
        .catch(error => {
            document.getElementById('promiseDiv').textContent = `Error: ${error}`;
        });
});

function fetchDataWithTimeout(url, timeout) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject('Operation timed out.');
        }, timeout);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                clearTimeout(timer);
                resolve(data);
            })
            .catch(error => {
                clearTimeout(timer);
                reject(error.message);
            });
    });
}
