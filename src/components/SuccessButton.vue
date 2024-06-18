<script>
export default {
    name: "SuccessButton",
    props: {
        successButton: Function,
        buttonName: String
    }
}
</script>

<template>
    <button @click="successButton" type="submit" class="btn save-btn mx-3">{{buttonName}}</button>
</template>

<style scoped>
.save-btn {
    background: #7F56D9;
    color: white;
}

.save-btn:active {
    background: white;
    color: #7F56D9;
}

.save-btn {
    padding: 9px 16px 9px 16px;
    gap: 8px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
}
</style>
