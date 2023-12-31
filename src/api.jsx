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
  });

  const responseData = await response.json();
  return responseData;
}

export async function getCurrentUser(token) {
  const response = await fetch(`${PATH}/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
  const responseData = await response.json();
  return responseData;
}

export async function changeCurrentUser(token, name, surname, phone, city) {
  const response = await fetch(`${PATH}/user`, {
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      surname: surname,
      phone: phone,
      city: city,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
  const responseData = await response.json();
  return responseData;
}

export async function updateAvatar(formData, token) {
  const response = await fetch(`${PATH}/user/avatar`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseData = await response.json();
  return responseData;
}

export async function getCurrentUserAds(token) {
  const response = await fetch(`${PATH}/ads/me`, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
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

export async function deleteAd(ad_id, token) {
  const response = await fetch(`${PATH}/ads/${ad_id}`, {
    method: "DELETE",
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

export async function updateAd(ad_id, token, title, description, price) {
  const response = await fetch(`${PATH}/ads/${ad_id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      description: description,
      price: price,
    }),
  });

  if (!response.ok) {
    throw new Error("Ошибка");
  }

  const responseData = await response.json();
  return responseData;
}

export async function updateAdImages(ad_id, formData, token) {
  const response = await fetch(`${PATH}/ads/${ad_id}/image`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseData = await response.json();
  return responseData;
}

export async function deleteAdImage(ad_id, file_url, token) {
  const response = await fetch(
    `${PATH}/ads/${ad_id}/image/?${new URLSearchParams({
      file_url: file_url,
    })}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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

export async function AddNewAd(token, title, description, price) {
  const response = await fetch(`${PATH}/adstext`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      description: description,
      price: price,
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
