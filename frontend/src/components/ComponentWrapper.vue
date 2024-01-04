<template>
        <!-- <div class="component-box-purple">
        </div>
        <div class="component-box-black">
        </div> -->
        <div class="component-box-content">
            <slot name="content"></slot>
        </div>
</template>

<script setup>
</script>

<style scoped>
/* .component-box-content {
    background-color: #E8DED9;
    position: relative;
    border-radius: 10px;
    border: 2px #846F91 solid;
} */

.component-box-purple {
    background-color: #846F91;
    position: relative;
    width: 400px;
    border-radius: 10px;
    z-index: 1;
}

.component-box-black {
    background-color: #000000;
    position: relative;
    width: 400px;
    margin-left: 20px;
    margin-top: 20px;
    border-radius: 10px;
    z-index: 2;
}
</style>