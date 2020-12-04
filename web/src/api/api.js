const fetch = async (url, method, data, contentType = "application/json") => {
  const headers = new Headers();

  let body;
  if (data) {
    headers.append("Content-Type", contentType);
    // headers.append('Access-Control-Allow-Origin', '*');
    body = JSON.stringify(data);
  }

  const response = await window.fetch(url, {
    method,
    headers,
    body,
  });

  if (!response.ok) {
    return { error: { status: response.status } };
  }

  return { data: await response.json() };
};
  
export const get = (url) => fetch(url, "GET");
  
export const post = (url, data) => fetch(url, "POST", data);

export const put = (url, data) => fetch(url, "PUT", data);

export const deleteApi = (url) => fetch(url, "DELETE");