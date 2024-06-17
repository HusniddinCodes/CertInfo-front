<script>
export default {
    name: "CancelButton",
    props: {
        cancelButton: Function,
        buttonName: String
    }
}
</script>

<template>
    <button @click="cancelButton" type="button" class="btn btn-outline cancel-btn border">{{buttonName}}</button>
</template>

<style scoped>
.cancel-btn:active {
    background: #7F56D9;
    color: white;
}

.cancel-btn {
    padding: 9px 16px 9px 16px;
    gap: 8px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
}
</style>
