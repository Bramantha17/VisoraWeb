<script setup>
defineProps({
    type: { type: String, requierd: true },
    label: { type: String, requierd: true },
    identitiy: { type: String, requierd: true },
    placeholder: { type: String, requierd: false },
    readonly: { type: String, requierd: false, default: "0" },
    modelValue: { type: [String, number] }
})

defineEmits(["update: modelValue", "keyInput", "edit", "cancle"])
</script>

<template>

</template>