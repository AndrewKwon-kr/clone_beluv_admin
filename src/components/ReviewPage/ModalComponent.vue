<template>
    <a-modal :title="`${this.data.product_Title}  ${this.data.Product_Id}`" :visible="visible"
        @ok="this.$parent.handleOk" @cancel="this.$parent.handleCancel" :closable="false" width="80%" height="40%"
        :ok-button-props="{ style: { display: 'none'} }">
        <div class="modal-container">
            <p>{{ this.data.rating }}</p>
        </div>
    </a-modal>
</template>
<script>

export default {
    props: ['data', 'visible'],
    name: 'modalComponent',
}
</script>
<style>
.modal-container {
    height: 60vh;
}
</style>
