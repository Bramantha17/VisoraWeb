<script setup>
defineProps({
  products: {
    type: Array,
    default: () => [],
  },
})

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '')
}

function truncate(text, length) {
  return text.length > length ? text.slice(0, 150) + '...' : text
}
</script>

<template>
  <div class="p-4 py-3">
    <div class="row g-3">
      <div v-for="(product, index) in products" :key="product?.id" class="col-md-4">
        <div
          class="mt-2 img-fluid card h-100 text-center p-3 rounded-5"
          :class="{ 'border-warning border-5': index === 1 }"
        >
          <div
            v-if="index === 1"
            class="most-popular-badge badge bg-warning text-dark p-2 rounded-5"
          >
            <span>Most Popular</span>
          </div>
          <h4 class="title-product fw-bold text-warning mt-3">
            {{ product.product_name }}
          </h4>
          <img
            :src="product.product_image_url"
            class="mb-3 container"
            alt="productImage"
            style="width: 264px; height: 396px"
          />
          <p class="text-muted">
            {{ truncate(stripHtml(product.product_description), 80) }}
          </p>
          <RouterLink :to="`/products/${product.id}`">
            <div class="p-3 mt-auto btn-detail rounded-4">
              <button>Detail</button>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
