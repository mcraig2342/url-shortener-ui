export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrls = (url) => {
  fetch("http://localhost:3001/api/v1/urls", {
    method: "POST",
    body: JSON.stringify({long_url: url.url, title: url.title}),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .catch(err => console.log('ERROR', err))

}
