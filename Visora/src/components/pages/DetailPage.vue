<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import api from '@/service/api'

const route = useRoute()
const product = ref({})

onMounted(async () => {
    const id = route.params.id
    const response = await api.get(`/products/${id}`)
    product.value = response.data.data
})
</script>

<!-- <template>
    <div v-if="product.id" class="card p-4">
        <h2>{{ product.product_name }}</h2>
        <img 
        :src="product.product_image_url" 
        alt="Product image"
        style="width: 264px; height: 396px;" />
        <p v-html="product.product_description"></p>
    </div>
</template> -->

<template>
  <div class="container my-5">
    <div class="row align-items-center">
      <!-- Kolom kiri: gambar produk -->
      <div class="col-md-6 text-center">
        <img 
          :src="product.product_image_url" 
          alt="Product image" 
          class="img-fluid rounded shadow"
          style="max-height: 400px;"
        />
      </div>

      <!-- Kolom kanan: deskripsi produk -->
      <div class="col-md-6">
        <h2 class="fw-bold mb-3">{{ product.product_name }}</h2>
        <p v-html="product.product_description" class="text-muted"></p>

        <h4 class="text-warning mt-4">Rp{{ product.product_price }}</h4>
        <p>Stock: {{ product.product_stock }}</p>

        <a :href="product.product_link" target="_blank" class="btn btn-warning rounded-4 mt-3">
          Hubungi Kami
        </a>
      </div>
    </div>
  </div>
</template>