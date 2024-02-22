const searchInput = document.getElementById('search');

searchInput.addEventListener('input', function() {
  const query = searchInput.value.trim(); // Trim any leading or trailing spaces
  
  if (query !== '' && query.length >= 4) {
    console.log(query);
    searchdata(query);
  } else {
    // Clear the output div when the input is empty or less than 4 characters
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
  }
});

function searchdata(query) {
  fetch('./dataset/feeddata.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const regex = new RegExp('\\b' + query + '\\b', 'i');
      const resq = data.filter(item => regex.test(item.searchdata));
      displayData(resq);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function displayData(data) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';
  data.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('resultdiv');
    
    if (post?.images) {
      const img = document.createElement('img');
      img.src = post?.images;
      img.classList.add('resultimg');
      postDiv.appendChild(img);
    }
    
    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
    
    const heading = document.createElement('h2');
    heading.textContent = post?.searchdata;
    postContent.appendChild(heading);
    
    const link = document.createElement('a');
    link.href = post?.link;
    link.textContent = "Read More...";
    link.classList.add('read-more'); // Adding class 'read-more' to the link
    link.target = "_blank"; // Open link in a new tab
    postContent.appendChild(link);
    
    postDiv.appendChild(postContent);
    outputDiv.appendChild(postDiv);
  });
}
