import api from './api'

export const register = async (data) => {
    const res = await api.post('/register', data)
    return res.data
}

export const login = async (data) => {
  const res = await api.post('/login', data)

  // ✅ store token
  localStorage.setItem('token', res.data.token)

  // optional (but good)
  localStorage.setItem('user', JSON.stringify(res.data.user))

  return res.data
}

// axios.post('/api/register', formData)
//   .then(response => {
//     const token = response.data.token;
//     localStorage.setItem('token', token);

//     // set header Authorization untuk request berikutnya
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     // redirect ke halaman utama
//     this.$router.push('/homepage');
//   });
