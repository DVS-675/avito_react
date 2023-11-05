const PATH = "http://localhost:8090";

//получить все объявления

export async function getAllAds() {
  const response = await fetch(`${PATH}/ads`, {
    method: "GET",

    headers: {
      "content-type": "application/json",
    },
  });

  const responseData = await response.json();
  return responseData;
}

export async function getAllUsers() {
  const response = await fetch(`${PATH}/user/all`, {
    method: "GET",

    headers: {
      "content-type": "application/json",
    },
  });

  const responseData = await response.json();
  return responseData;
}

export async function getCurrentUserAds() {
  const response = await fetch(`${PATH}/ads/me`, {
    method: "GET",

    headers: {
      "content-type": "application/json",
    },
  });

  const responseData = await response.json();
  return responseData;
}

export async function getAd(ad_id) {
  const response = await fetch(`${PATH}/ads/${ad_id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Ошибка");
  }

  const responseData = await response.json();
  return responseData;
}

export async function getAdsFeedback(ads_id) {
  const response = await fetch(`${PATH}/ads/${ads_id}/comments`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Ошибка");
  }

  const responseData = await response.json();
  return responseData;
}

export async function AddAdsFeedback(ads_id, text, token) {
  const response = await fetch(`${PATH}/ads/${ads_id}/comments`, {
    method: "POST",
    body: JSON.stringify({
      text: text,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка");
  }

  const responseData = await response.json();
  return responseData;
}

export async function loginUser(email, password) {
  const response = await fetch(`${PATH}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok && response.status === 401) {
    throw new Error("Ошибка авторизации");
  }

  const responseData = await response.json();
  return responseData;
}

export async function registerUser(email, password, name, surname, city) {
  const response = await fetch(`${PATH}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      surname: surname,
      city: city,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  const responseData = await response.json();
  return responseData;
}
