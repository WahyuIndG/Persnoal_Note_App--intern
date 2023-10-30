import axios from 'axios';

const BASE_URL = 'https://notes-api.dicoding.dev/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

async function login({ email, password }) {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      JSON.stringify({ email, password }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data.accessToken;
  } catch (error) {
    if (error.response?.data?.message) {
      console.error('HTTP error occured: ', error.response.status, error.response.data);
      throw error.response.data.message;
    } else {
      console.error('Another error occurred: ', error);
      throw error.message;
    }
  }
}

async function register({ name, email, password }) {
  try {
    await axios.post(`${BASE_URL}/register`, JSON.stringify({ name, email, password }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (error.response?.data?.message) {
      console.error('HTTP error occured: ', error.response.status, error.response.data);
      throw error.response.data.message;
    } else {
      console.error('Another error occurred: ', error);
      throw error.message;
    }
  }
}

async function getUserLogged() {
  try {
    const response = await axios.get(`${BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

    return response.data.data;
  } catch (error) {
    if (error.response?.data?.message) {
      console.error('HTTP error occured: ', error.response.status, error.response.data);
      throw error.response.data.message;
    } else {
      console.error('Another error occurred: ', error);
      throw error.message;
    }
  }
}

async function addNote({ title, body }) {
  try {
    const response = await axios.post(
      `${BASE_URL}/notes`,
      JSON.stringify({ title, body }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    if (error.response?.data?.message) {
      console.error('HTTP error occured: ', error.response.status, error.response.data);
      throw error.response.data.message;
    } else {
      console.error('Another error occurred: ', error);
      throw error.message;
    }
  }
}

async function getActiveNotes() {
  try {
    const response = await axios.get(`${BASE_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return response.data.data;
  } catch (error) {
    if (error.response?.data?.message) {
      console.error('HTTP error occured: ', error.response.status, error.response.data);
      throw error.response.data.message;
    } else {
      console.error('Another error occurred: ', error);
      throw error.message;
    }
  }
}

async function getArchivedNotes() {
  try {
    const response = await axios.get(`${BASE_URL}/notes/archived`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.message === 'Network Error') {
      console.error('Network error occured: ', error);
    } else if (error.response) {
      console.error('HTTP error occured: ', error.response.status, error.response.data);
    } else {
      console.error('An unknown error occurred: ', error);
    }
    throw error;
  }
}

async function getNote(id) {
  try {
    const response = await axios.get(`${BASE_URL}/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return response.data.data;
  } catch (error) {
    if (error.response?.data?.message) {
      console.error('HTTP error occured: ', error.response.status, error.response.data);
      throw error.response.data.message;
    } else {
      console.error('Another error occurred: ', error);
      throw error.message;
    }
  }
}

async function archiveNote(id) {
  try {
    await axios.post(`${BASE_URL}/notes/${id}/archive`, null, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  } catch (error) {
    if (error.response?.data?.message) {
      console.error('HTTP error occured: ', error.response.status, error.response.data);
      throw error.response.data.message;
    } else {
      console.error('Another error occurred: ', error);
      throw error.message;
    }
  }
}

async function unarchiveNote(id) {
  try {
    await axios.post(`${BASE_URL}/notes/${id}/unarchive`, null, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  } catch (error) {
    if (error.response?.data?.message) {
      console.error('HTTP error occured: ', error.response.status, error.response.data);
      throw error.response.data.message;
    } else {
      console.error('Another error occurred: ', error);
      throw error.message;
    }
  }
}

async function deleteNote(id) {
  try {
    await axios.delete(`${BASE_URL}/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  } catch (error) {
    if (error.response?.data?.message) {
      console.error('HTTP error occured: ', error.response.status, error.response.data);
      throw error.response.data.message;
    } else {
      console.error('Another error occurred: ', error);
      throw error.message;
    }
  }
}

export {
  getAccessToken,
  putAccessToken,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
  login,
};
