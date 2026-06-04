import api from './api'

// ambil semua product
export const getProducts = async () => {
  const res = await api.get('/products')
  return res.data
}

// ambil 1 product
export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`)
  return res.data
}

// tambah product
export const createProduct = async (data) => {
  const res = await api.post('/products', data)
  return res.data
}

// update product
export const updateProduct = async (id, data) => {
  const res = await api.put(`/products/${id}`, data)
  return res.data
}

// hapus product
export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`)
  return res.data
}
