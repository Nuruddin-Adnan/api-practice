const loadComment = async () => {
    const url = 'https://jsonplaceholder.typicode.com/comments';
    try {
        const response = await fetch(url);
        const data = await response.json();
        showComment(data);
    }
    catch (error) {
        console.log(error);
    }
}

loadComment();

const showComment = (data) => {
    const commentContainer = document.getElementById('comment-container');
    data.forEach((comment, index) => {
        if (index >= 20) {
            return;
        }
        const { id, name, email, body: commentText, postId } = comment;
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${commentText.slice(0, 150)}${commentText.length > 150 ? '...' : ''} </td>
            <td><button class="btn btn-primary text-nowrap" onclick="showPost('https://jsonplaceholder.typicode.com/posts/${postId}');" data-bs-toggle="modal" data-bs-target="#postModal">See post</button></td>
        </tr>
        `
        commentContainer.appendChild(tr)
    });
}

const showPost = async (url) => {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = '';
    try {
        const response = await fetch(url);
        const data = await response.json();
        const { title, body: postDescription } = data;

        postContainer.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title" id="postModalLabel">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            ${postDescription}
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        `
    }
    catch (error) {
        console.log(error);
    }
}