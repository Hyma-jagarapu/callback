document.getElementById('asyncButton').addEventListener('click', async function() {
    const div = document.getElementById('asyncDiv');
    div.textContent = 'Loading...';

    try {
        const data = await fetchDataWithTimeout('https://dummyjson.com/posts', 5000);
        const posts = data.posts;
        const postTitles = posts.map(post => post.title).join('<br>');
        div.innerHTML = `Fetched Data:<br>${postTitles}`;
    } catch (error) {
        div.textContent = `Error: ${error.message || error}`;
    }
});

async function fetchDataWithTimeout(url, timeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Operation timed out.');
        }
        throw error;
    }
}
