import api from './api'

// ambil semua product
export const getProducts = async () => {
  try {
    const res = await api.get('/products')
    return res.data 
  } catch (error) {
    throw error
  }
}

// ambil 1 product
export const getProductById = async (id) => {
  try {
    const res = await api.get(`/products/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

// tambah product
export const createProduct = async (data) => {
  try {
    const res = await api.post('/products', data)
    return res.data
  } catch (error) {
    throw error
  }
}

// update product
export const updateProduct = async (id, data) => {
  try {
    const res = await api.put(`/products/${id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

// hapus product
export const deleteProduct = async (id) => {
  try {
    const res = await api.delete(`/products/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}