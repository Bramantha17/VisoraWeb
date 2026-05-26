<script>
import { getProducts, createProduct, deleteProduct } from '@/service/productService.js'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import api from '@/service/api.js'

// Laravel returns 422 with { errors: { field: [msg, ...] } }
function extractLaravelErrors(err) {
  return err?.response?.data?.errors || {}
}

function laravelErrorsToFlat(errors) {
  const flat = {}
  for (const [key, msgs] of Object.entries(errors)) {
    flat[key] = Array.isArray(msgs) ? msgs[0] : msgs
  }
  return flat
}

export default {
  name: 'AdminProducts',

  data() {
    return {
      quill: null,
      activeTab: 'create',
      tabs: [
        {
          key: 'create',
          label: 'Tambah Produk',
          icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
        },
        {
          key: 'update',
          label: 'Update Produk',
          icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 12v3h3l9-9-3-3-9 9z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>',
        },
        {
          key: 'delete',
          label: 'Hapus Produk',
          icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M6 4V2h4v2M14 4l-1 10H3L2 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        },
      ],

      // Products fetched from GET /api/products
      products: [],
      productsLoading: false,
      productsError: null,

      // Create form
      createForm: {
        product_name: '',
        product_price: '',
        product_stock: '',
        product_description: '',
        product_feature: [''],
        product_image: null,
        product_link: '',
        product_discount: '',
      },
      createErrors: {},
      createAlert: null,
      createLoading: false,
      createImagePreview: null,

      // Update form
      selectedProductId: '',
      updateForm: {
        product_name: '',
        product_price: '',
        product_stock: '',
        product_description: '',
        product_feature: [''],
        product_image: null,
        product_link: '',
        product_discount: '',
      },
      updateErrors: {},
      updateAlert: null,
      updateLoading: false,
      updateImagePreview: null,

      // Delete
      deleteTarget: null,
      deleteLoading: false,
      deleteAlert: null,
    }
  },

  computed: {
    currentTabLabel() {
      return this.tabs.find((t) => t.key === this.activeTab)?.label || ''
    },
  },

  mounted() {
    this.fetchProducts()
  },

  //quill text editor
  mounted() {
    const options = {
      theme: 'snow',
      modules: { toolbar: true },
      placeholder: 'Tulis deskripsi produk...'
    }

    this.quill = new Quill(this.$refs.editor, options)
    this.quill.on('text-change', () => {
      this.createForm.product_description = this.quill.root.innerHTML
    })
  },
  //quill text editor end

  watch: {
    // Refresh product list whenever user opens delete or update tab
    activeTab(val) {
      if (val === 'delete' || val === 'update') this.fetchProducts()
    },
  },

  methods: {
    // ---- Fetch products (used by delete table + update dropdown) ----
    async fetchProducts() {
      this.productsLoading = true
      this.productsError = null
      try {
        const data = await getProducts()
        // Support both { data: [...] } and plain array responses
        this.products = Array.isArray(data) ? data : (data.data ?? [])
      } catch (err) {
        this.productsError = err?.response?.data?.message || 'Gagal memuat data produk.'
      } finally {
        this.productsLoading = false
      }
    },

    // ---- Feature helpers ----
    addFeature(mode) {
      if (mode === 'create') this.createForm.product_feature.push('')
      else this.updateForm.product_feature.push('')
    },
    removeFeature(mode, idx) {
      if (mode === 'create') {
        if (this.createForm.product_feature.length > 1)
          this.createForm.product_feature.splice(idx, 1)
      } else {
        if (this.updateForm.product_feature.length > 1)
          this.updateForm.product_feature.splice(idx, 1)
      }
    },

    // ---- Image helpers ----
    triggerFileInput(ref) {
      this.$refs[ref].click()
    },
    handleImageChange(e, mode) {
      const file = e.target.files[0]
      if (!file) return
      if (file.size > 3 * 1024 * 1024) {
        if (mode === 'create') this.createErrors.product_image = 'Ukuran gambar maksimal 3MB'
        return
      }
      const reader = new FileReader()
      reader.onload = (ev) => {
        if (mode === 'create') {
          this.createForm.product_image = file
          this.createImagePreview = ev.target.result
          delete this.createErrors.product_image
        } else {
          this.updateForm.product_image = file
          this.updateImagePreview = ev.target.result
        }
      }
      reader.readAsDataURL(file)
    },
    handleDrop(e, mode) {
      const file = e.dataTransfer.files[0]
      if (!file || !file.type.startsWith('image/')) return
      const fakeEvent = { target: { files: [file] } }
      this.handleImageChange(fakeEvent, mode)
    },

    // ---- Client-side pre-validation (catches obvious errors before hitting API) ----
    validateCreate() {
      const errs = {}
      const f = this.createForm
      if (!f.product_name?.trim()) errs.product_name = 'Nama produk wajib diisi'
      if (f.product_price === '' || f.product_price === null)
        errs.product_price = 'Harga wajib diisi'
      if (f.product_stock === '' || f.product_stock === null)
        errs.product_stock = 'Stok wajib diisi'
      if (!f.product_description?.trim()) errs.product_description = 'Deskripsi wajib diisi'
      if (!f.product_feature.length || f.product_feature.every((feat) => !feat.trim()))
        errs.product_feature = 'Minimal satu fitur wajib diisi'
      if (!f.product_image) errs.product_image = 'Gambar produk wajib diunggah'
      if (!f.product_link?.trim()) errs.product_link = 'Link produk wajib diisi'
      else if (!/^https?:\/\/.+/.test(f.product_link))
        errs.product_link = 'Format URL tidak valid (harus diawali https://)'
      if (f.product_discount === '' || f.product_discount === null)
        errs.product_discount = 'Diskon wajib diisi'
      else if (Number(f.product_discount) < 0 || Number(f.product_discount) > 100)
        errs.product_discount = 'Diskon harus antara 0–100'
      return errs
    },

    validateUpdate() {
      const errs = {}
      const f = this.updateForm
      if (f.product_link && !/^https?:\/\/.+/.test(f.product_link))
        errs.product_link = 'Format URL tidak valid'
      if (f.product_discount !== '' && f.product_discount !== null) {
        if (Number(f.product_discount) < 0 || Number(f.product_discount) > 100)
          errs.product_discount = 'Diskon harus antara 0–100'
      }
      return errs
    },

    // ---- CREATE — POST /api/products ----
    async handleCreate() {
      this.createErrors = this.validateCreate()
      if (Object.keys(this.createErrors).length) return

      this.createLoading = true
      this.createAlert = null

      try {
        const f = this.createForm
        const formData = new FormData()
        formData.append('product_name', f.product_name)
        formData.append('product_price', f.product_price)
        formData.append('product_stock', f.product_stock)
        formData.append('product_description', f.product_description)
        f.product_feature
          .filter((x) => x.trim())
          .forEach((feat) => formData.append('product_feature[]', feat))
        formData.append('product_image', f.product_image)
        formData.append('product_link', f.product_link)
        formData.append('product_discount', f.product_discount)

        await createProduct(formData)

        this.createAlert = { type: 'success', msg: 'Produk berhasil ditambahkan!' }
        this.resetCreate()
        // Refresh list so update/delete tabs stay in sync
        this.fetchProducts()
      } catch (err) {
        if (err?.response?.status === 422) {
          this.createErrors = laravelErrorsToFlat(extractLaravelErrors(err))
          this.createAlert = { type: 'danger', msg: 'Periksa kembali isian form di atas.' }
        } else {
          this.createAlert = {
            type: 'danger',
            msg: err?.response?.data?.message || 'Gagal menyimpan produk. Silakan coba lagi.',
          }
        }
      } finally {
        this.createLoading = false
      }
    },

    resetCreate() {
      this.createForm = {
        product_name: '',
        product_price: '',
        product_stock: '',
        product_description: '',
        product_feature: [''],
        product_image: null,
        product_link: '',
        product_discount: '',
      }
      this.createErrors = {}
      this.createImagePreview = null
      if (this.$refs.createImageInput) this.$refs.createImageInput.value = ''
    },

    // ---- UPDATE — PUT /api/products/{id} (with _method spoofing for multipart) ----
    loadProductForUpdate() {
      const p = this.products.find((x) => x.id == this.selectedProductId)
      if (!p) return
      this.updateForm = {
        product_name: p.product_name || '',
        product_price: p.product_price ?? '',
        product_stock: p.product_stock ?? '',
        product_description: p.product_description || '',
        product_feature: p.product_feature?.length ? [...p.product_feature] : [''],
        product_image: null,
        product_link: p.product_link || '',
        product_discount: p.product_discount ?? '',
      }
      this.updateImagePreview = p.product_image || null
      this.updateErrors = {}
      this.updateAlert = null
    },

    async handleUpdate() {
      this.updateErrors = this.validateUpdate()
      if (Object.keys(this.updateErrors).length) return

      this.updateLoading = true
      this.updateAlert = null

      try {
        const f = this.updateForm
        const formData = new FormData()

        // Laravel doesn't parse PUT multipart — spoof method
        formData.append('_method', 'PUT')

        if (f.product_name) formData.append('product_name', f.product_name)
        if (f.product_price !== '') formData.append('product_price', f.product_price)
        if (f.product_stock !== '') formData.append('product_stock', f.product_stock)
        if (f.product_description) formData.append('product_description', f.product_description)
        if (f.product_feature.some((x) => x.trim())) {
          f.product_feature
            .filter((x) => x.trim())
            .forEach((feat) => formData.append('product_feature[]', feat))
        }
        if (f.product_image) formData.append('product_image', f.product_image)
        if (f.product_link) formData.append('product_link', f.product_link)
        if (f.product_discount !== '') formData.append('product_discount', f.product_discount)

        // productService.updateProduct uses api.put which doesn't parse multipart.
        // We POST with _method=PUT instead so Laravel handles the file upload correctly.
        await api.post(`/products/${this.selectedProductId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })

        this.updateAlert = { type: 'success', msg: 'Produk berhasil diupdate!' }
        this.fetchProducts()
      } catch (err) {
        if (err?.response?.status === 422) {
          this.updateErrors = laravelErrorsToFlat(extractLaravelErrors(err))
          this.updateAlert = { type: 'danger', msg: 'Periksa kembali isian form di atas.' }
        } else {
          this.updateAlert = {
            type: 'danger',
            msg: err?.response?.data?.message || 'Gagal mengupdate produk. Silakan coba lagi.',
          }
        }
      } finally {
        this.updateLoading = false
      }
    },

    resetUpdate() {
      this.loadProductForUpdate()
    },

    // ---- DELETE — DELETE /api/products/{id} ----
    // confirmDelete(product) {
    // this.deleteTarget = product
    // this.deleteAlert = null
    // },
    //
    // async executeDelete() {
    // this.deleteLoading = true
    // try {
    // await deleteProduct(this.deleteTarget.id)
    // this.products = this.products.filter(p => p.id !== this.deleteTarget.id)
    // this.deleteTarget = null
    // } catch (err) {
    // this.deleteAlert = err?.response?.data?.message || 'Gagal menghapus produk. Silakan coba lagi.'
    // } finally {
    // this.deleteLoading = false
    // }
    // },

    async executeDelete(productId) {
      this.deleteLoading = true
      try {
        await deleteProduct(productId)
        this.products = this.products.filter((p) => p.id !== productId)
      } catch (err) {
        // Instead of modal alert, you can use a toast or inline message
        alert(err?.response?.data?.message || 'Gagal menghapus produk. Silakan coba lagi.')
      } finally {
        this.deleteLoading = false
      }
    },

    goToEdit(id) {
      this.selectedProductId = id
      this.loadProductForUpdate()
      this.activeTab = 'update'
    },

    // ---- Utility ----
    truncate(text, len) {
      if (!text) return ''
      return text.length > len ? text.slice(0, len) + '...' : text
    },
    formatPrice(val) {
      return Number(val).toLocaleString('id-ID')
    },
  },
}
</script>

<template>
  <div class="admin-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar">
      <nav class="sidebar-nav">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="nav-item-admin"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          <span class="nav-icon-admin" v-html="tab.icon"></span>
          <span>{{ tab.label }}</span>
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">{{ currentTabLabel }}</h1>
          <p class="page-sub">Kelola produk aplikasi Anda</p>
        </div>
      </div>

      <!-- CREATE PRODUCT TAB -->
      <div v-if="activeTab === 'create'" class="card">
        <form @submit.prevent="handleCreate" class="product-form" novalidate>
          <div class="form-grid">
            <!-- Product Name -->
            <div class="form-group">
              <label class="form-label">Nama Produk <span class="req">*</span></label>
              <input
                v-model="createForm.product_name"
                type="text"
                class="form-input"
                :class="{ 'input-error': createErrors.product_name }"
                placeholder="Contoh: Light POS Premium"
              />
              <span v-if="createErrors.product_name" class="error-msg">{{
                createErrors.product_name
              }}</span>
            </div>

            <!-- Product Price -->
            <div class="form-group">
              <label class="form-label">Harga Produk <span class="req">*</span></label>
              <div class="input-prefix-wrap">
                <span class="input-prefix">Rp</span>
                <input
                  v-model="createForm.product_price"
                  type="number"
                  class="form-input with-prefix"
                  :class="{ 'input-error': createErrors.product_price }"
                  placeholder="500000"
                  min="0"
                />
              </div>
              <span v-if="createErrors.product_price" class="error-msg">{{
                createErrors.product_price
              }}</span>
            </div>

            <!-- Product Stock -->
            <div class="form-group">
              <label class="form-label">Stok <span class="req">*</span></label>
              <input
                v-model="createForm.product_stock"
                type="number"
                class="form-input"
                :class="{ 'input-error': createErrors.product_stock }"
                placeholder="100"
                min="0"
              />
              <span v-if="createErrors.product_stock" class="error-msg">{{
                createErrors.product_stock
              }}</span>
            </div>

            <!-- Discount -->
            <div class="form-group">
              <label class="form-label">Diskon (%) <span class="req">*</span></label>
              <div class="input-suffix-wrap">
                <input
                  v-model="createForm.product_discount"
                  type="number"
                  class="form-input with-suffix"
                  :class="{ 'input-error': createErrors.product_discount }"
                  placeholder="32"
                  min="0"
                  max="100"
                />
                <span class="input-suffix">%</span>
              </div>
              <span v-if="createErrors.product_discount" class="error-msg">{{
                createErrors.product_discount
              }}</span>
            </div>
          </div>

          <!-- Product Link -->
          <div class="form-group">
            <label class="form-label">Link Produk <span class="req">*</span></label>
            <input
              v-model="createForm.product_link"
              type="url"
              class="form-input"
              :class="{ 'input-error': createErrors.product_link }"
              placeholder="https://visora.com/produk/light-pos"
            />
            <span v-if="createErrors.product_link" class="error-msg">{{
              createErrors.product_link
            }}</span>
          </div>
        
          <div>
            <label class="form-label">Deskripsi Produk <span class="req">*</span></label>
            <div ref="editor"></div>
          </div>
          <!-- Description -->
          <div class="form-group">
            <textarea
              v-model="createForm.product_description"
              class="form-input form-textarea"
              :class="{ 'input-error': createErrors.product_description }"
              placeholder="Deskripsikan fitur unggulan produk ini..."
              rows="4"
            ></textarea>
            <span v-if="createErrors.product_description" class="error-msg">{{
              createErrors.product_description
            }}</span>
          </div>

          <!-- Features -->
          <div class="form-group">
            <label class="form-label">Fitur Produk <span class="req">*</span></label>
            <div v-for="(feat, idx) in createForm.product_feature" :key="idx" class="feature-row">
              <input
                v-model="createForm.product_feature[idx]"
                type="text"
                class="form-input"
                :placeholder="`Fitur ${idx + 1}, contoh: pencatatan transaksi`"
              />
              <button
                type="button"
                class="btn-remove"
                @click="removeFeature('create', idx)"
                :disabled="createForm.product_feature.length === 1"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
            <button type="button" class="btn-add-feature" @click="addFeature('create')">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1v12M1 7h12"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              Tambah Fitur
            </button>
            <span v-if="createErrors.product_feature" class="error-msg">{{
              createErrors.product_feature
            }}</span>
          </div>

          <!-- Image Upload -->
          <div class="form-group">
            <label class="form-label">Gambar Produk <span class="req">*</span></label>
            <div
              class="upload-zone"
              :class="{ 'has-file': createImagePreview, 'input-error': createErrors.product_image }"
              @click="triggerFileInput('createImageInput')"
              @dragover.prevent
              @drop.prevent="handleDrop($event, 'create')"
            >
              <img
                v-if="createImagePreview"
                :src="createImagePreview"
                class="image-preview"
                alt="preview"
              />
              <div v-else class="upload-placeholder">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 16l4-4 4 4 4-6 4 6"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="3"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
                <p>Klik atau drag &amp; drop gambar di sini</p>
                <p class="upload-hint">PNG, JPG, JPEG — maks. 3MB</p>
              </div>
            </div>
            <input
              ref="createImageInput"
              type="file"
              accept="image/*"
              style="display: none"
              @change="handleImageChange($event, 'create')"
            />
            <span v-if="createErrors.product_image" class="error-msg">{{
              createErrors.product_image
            }}</span>
          </div>

          <!-- Alert -->
          <div v-if="createAlert" class="alert" :class="createAlert.type">
            {{ createAlert.msg }}
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secondary" @click="resetCreate">Reset Form</button>
            <button type="submit" class="btn-primary" :disabled="createLoading">
              <span v-if="createLoading" class="spinner"></span>
              {{ createLoading ? 'Menyimpan...' : 'Simpan Produk' }}
            </button>
          </div>
        </form>
      </div>

      <!-- UPDATE PRODUCT TAB -->
      <div v-if="activeTab === 'update'" class="card">
        <div class="form-group" style="margin-bottom: 2rem">
          <label class="form-label"
            >Pilih Produk yang Akan Diupdate <span class="req">*</span></label
          >
          <select
            v-model="selectedProductId"
            class="form-input form-select"
            @change="loadProductForUpdate"
          >
            <option value="">-- Pilih Produk --</option>
            <option v-for="p in products" :key="p.id" :value="p.id">{{ p.product_name }}</option>
          </select>
        </div>

        <form
          v-if="selectedProductId"
          @submit.prevent="handleUpdate"
          class="product-form"
          novalidate
        >
          <p class="update-note">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.2" />
              <path
                d="M7 6v4M7 4.5v.5"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
              />
            </svg>
            Kosongkan field yang tidak ingin diubah
          </p>

          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Nama Produk</label>
              <input
                v-model="updateForm.product_name"
                type="text"
                class="form-input"
                :class="{ 'input-error': updateErrors.product_name }"
                placeholder="Nama produk baru..."
              />
              <span v-if="updateErrors.product_name" class="error-msg">{{
                updateErrors.product_name
              }}</span>
            </div>
            <div class="form-group">
              <label class="form-label">Harga Produk</label>
              <div class="input-prefix-wrap">
                <span class="input-prefix">Rp</span>
                <input
                  v-model="updateForm.product_price"
                  type="number"
                  class="form-input with-prefix"
                  :class="{ 'input-error': updateErrors.product_price }"
                  placeholder="Harga baru..."
                  min="0"
                />
              </div>
              <span v-if="updateErrors.product_price" class="error-msg">{{
                updateErrors.product_price
              }}</span>
            </div>
            <div class="form-group">
              <label class="form-label">Stok</label>
              <input
                v-model="updateForm.product_stock"
                type="number"
                class="form-input"
                :class="{ 'input-error': updateErrors.product_stock }"
                placeholder="Stok baru..."
                min="0"
              />
              <span v-if="updateErrors.product_stock" class="error-msg">{{
                updateErrors.product_stock
              }}</span>
            </div>
            <div class="form-group">
              <label class="form-label">Diskon (%)</label>
              <div class="input-suffix-wrap">
                <input
                  v-model="updateForm.product_discount"
                  type="number"
                  class="form-input with-suffix"
                  :class="{ 'input-error': updateErrors.product_discount }"
                  placeholder="0–100"
                  min="0"
                  max="100"
                />
                <span class="input-suffix">%</span>
              </div>
              <span v-if="updateErrors.product_discount" class="error-msg">{{
                updateErrors.product_discount
              }}</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Link Produk</label>
            <input
              v-model="updateForm.product_link"
              type="url"
              class="form-input"
              :class="{ 'input-error': updateErrors.product_link }"
              placeholder="https://..."
            />
            <span v-if="updateErrors.product_link" class="error-msg">{{
              updateErrors.product_link
            }}</span>
          </div>

          <div class="form-group">
            <label class="form-label">Deskripsi Produk</label>
            <textarea
              v-model="updateForm.product_description"
              class="form-input form-textarea"
              :class="{ 'input-error': updateErrors.product_description }"
              placeholder="Deskripsi baru..."
              rows="4"
            ></textarea>
            <span v-if="updateErrors.product_description" class="error-msg">{{
              updateErrors.product_description
            }}</span>
          </div>

          <div class="form-group">
            <label class="form-label">Fitur Produk</label>
            <div v-for="(feat, idx) in updateForm.product_feature" :key="idx" class="feature-row">
              <input
                v-model="updateForm.product_feature[idx]"
                type="text"
                class="form-input"
                :placeholder="`Fitur ${idx + 1}`"
              />
              <button
                type="button"
                class="btn-remove"
                @click="removeFeature('update', idx)"
                :disabled="updateForm.product_feature.length === 1"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
            <button type="button" class="btn-add-feature" @click="addFeature('update')">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1v12M1 7h12"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              Tambah Fitur
            </button>
          </div>

          <div class="form-group">
            <label class="form-label">Ganti Gambar Produk</label>
            <div
              class="upload-zone"
              :class="{ 'has-file': updateImagePreview }"
              @click="triggerFileInput('updateImageInput')"
              @dragover.prevent
              @drop.prevent="handleDrop($event, 'update')"
            >
              <img
                v-if="updateImagePreview"
                :src="updateImagePreview"
                class="image-preview"
                alt="preview"
              />
              <div v-else class="upload-placeholder">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 16l4-4 4 4 4-6 4 6"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="3"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
                <p>Klik untuk mengganti gambar (opsional)</p>
                <p class="upload-hint">PNG, JPG, JPEG — maks. 3MB</p>
              </div>
            </div>
            <input
              ref="updateImageInput"
              type="file"
              accept="image/*"
              style="display: none"
              @change="handleImageChange($event, 'update')"
            />
          </div>

          <div v-if="updateAlert" class="alert" :class="updateAlert.type">
            {{ updateAlert.msg }}
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secondary" @click="resetUpdate">Reset</button>
            <button type="submit" class="btn-primary" :disabled="updateLoading">
              <span v-if="updateLoading" class="spinner"></span>
              {{ updateLoading ? 'Menyimpan...' : 'Update Produk' }}
            </button>
          </div>
        </form>

        <div v-else class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p>Pilih produk di atas untuk mulai mengedit</p>
        </div>
      </div>

      <!-- DELETE PRODUCT TAB -->
      <div v-if="activeTab === 'delete'" class="card" style="position: relative">
        <div v-if="productsLoading" class="empty-state">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-dasharray="31.4"
              stroke-dashoffset="10"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 12 12"
                to="360 12 12"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
          <p>Memuat data produk...</p>
        </div>
        <div v-else-if="productsError" class="alert danger" style="margin: 0 0 1rem">
          {{ productsError }}
        </div>
        <div v-else class="table-wrap">
          <table class="product-table">
            <thead>
              <tr>
                <th class="fs-6">Produk</th>
                <th class="fs-6">Harga</th>
                <th class="fs-6">Stok</th>
                <th class="fs-6">Diskon</th>
                <th class="fs-6">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id" class="table-row">
                <td>
                  <div class="product-cell">
                    <div
                      class="product-thumb"
                      :style="
                        product.product_image
                          ? `background-image:url(${product.product_image_url})`
                          : ''
                      "
                    >
                      <span v-if="!product.product_image">{{
                        product.product_name.charAt(0)
                      }}</span>
                    </div>
                    <div>
                      <div class="product-name">{{ product.product_name }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="price-badge">Rp {{ formatPrice(product.final_price) }}</span>
                </td>
                <td>
                  <span
                    class="stock-badge"
                    :class="product.product_stock > 10 ? 'in-stock' : 'low-stock'"
                    >{{ product.product_stock }}</span
                  >
                </td>
                <td>
                  <span v-if="product.product_discount > 0" class="discount-badge"
                    >-{{ product.product_discount }}%</span
                  >
                  <span v-else class="no-discount">—</span>
                </td>
                <td>
                  <div class="action-btns">
                    <button class="btn-edit" @click="goToEdit(product.id)" title="Edit Produk">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M1 10.5V13h2.5l7.37-7.37-2.5-2.5L1 10.5z"
                          stroke="currentColor"
                          stroke-width="1.2"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.37 1.63a1.77 1.77 0 012.5 2.5l-.9.9-2.5-2.5.9-.9z"
                          stroke="currentColor"
                          stroke-width="1.2"
                        />
                      </svg>
                    </button>
                    <button
                      class="btn-delete"
                      @click="executeDelete(product.id)"
                      title="Hapus Produk"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2 3.5h10M5.5 1.5h3M3.5 3.5l.7 8h5.6l.7-8"
                          stroke="currentColor"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="products.length === 0">
                <td colspan="5" class="empty-table">Belum ada produk yang tersedia</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- end v-else -->

      <!-- Delete Confirmation Modal — inside the relative card so position:absolute works -->
      <!--      <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">-->
      <!--        <div class="modal">-->
      <!--          <div class="modal-icon">-->
      <!--            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>-->
      <!--          </div>-->
      <!--          <h3 class="modal-title">Hapus Produk?</h3>-->
      <!--          <p class="modal-body">Anda akan menghapus <strong>{{ deleteTarget?.product_name }}</strong>. Tindakan ini tidak dapat dibatalkan.</p>-->
      <!--          <div v-if="deleteAlert" class="alert danger" style="margin-bottom: 1rem; text-align:left;">{{ deleteAlert }}</div>-->
      <!--          <div class="modal-actions">-->
      <!--            <button class="btn-secondary" @click="deleteTarget = null; deleteAlert = null">Batal</button>-->
      <!--            <button class="btn-danger" @click="executeDelete" :disabled="deleteLoading">-->
      <!--              <span v-if="deleteLoading" class="spinner"></span>-->
      <!--              {{ deleteLoading ? 'Menghapus...' : 'Ya, Hapus' }}-->
      <!--            </button>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </main>
  </div>
</template>
