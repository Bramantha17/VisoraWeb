import api from './api'

export const register = async (data) => {
    const res = await api.post('/register', data)
    return res.data
}

export const login = async (data) => {
  const res = await api.post('/login', data)
  console.log(res.data)
  localStorage.setItem('token', res.data.token)
  localStorage.setItem('user', JSON.stringify(res.data.user))

  return res.data
}

export const forgotPassword = (data) => {
  return api.post('/forgot-password', data).then(res => res.data)
}

export const resetPassword = (data) => {
  return api.post('/reset-password', data).then(res => res.data)
}

// export default {
//   state: {
//     user: JSON.parse(localStorage.getItem('user')) || null,
//     token: localStorage.getItem('token') || null
//   },
//   mutations: {
//     setUser(state, payload) {
//       state.user = payload.user
//       state.token = payload.token
//       localStorage.setItem('token', payload.token)
//       localStorage.setItem('user', JSON.stringify(payload.user))
//     },
//   }
// }

export default {
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user
      state.token = payload.token
      localStorage.setItem('token', payload.token)
      localStorage.setItem('user', JSON.stringify(payload.user))
    },
  }
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
