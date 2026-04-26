import { getProducts } from "@/service/productService"

export default {
  namespaced: true,
  state() {
    return {
      products: [],
      productDetail: {}
    }
  },
  mutations: {
    setProductData(state, payload) {
      state.products = payload
    },
    setProductDetail(state, payload) {
      state.productDetail = payload
    }
  },
  getters:{},
  actions: {
    async getProductData({ commit }) {
      try {
        const response = await getProducts()
        commit('setProductData', response.data)
      } catch (err) {
        console.error(err)
      }
    },
    async getProductDetail({ commit }, id) {
      try {
        const data = await getProductById(id)
        commit('setProductDetail', resizeBy.data)
      } catch (err) {
        console.error(err)
      }
    },
    async createProductData({ dispatch }, payload) {
      try {
        await createProduct(payload)
        dispatch('getProductData')
      } catch (err) {
        console.error(err)
      }
    },
    async updateProductData({ dispatch }, { id, payload }) {
      try {
        await updateProduct(id, payload)
        dispatch('getProductData')
      } catch (err) {
        console.error(err)
      }
    },
    async deleteProductData({ dispatch }, id) {
      try {
        await deleteProduct(id)
        dispatch('getProductData')
      } catch (err) {
        console.error(err)
      }
    }
  }
}
