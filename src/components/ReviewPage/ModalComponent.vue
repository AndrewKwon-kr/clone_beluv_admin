<template>
  <a-modal
    :title="`${data.product_Title} (${data.Product_Id})`"
    :visible="visible"
    @cancel="this.$parent.handleCancel"
    :closable="false"
    width="80%"
    height="40%"
    :ok-button-props="{ style: { display: 'none' } }"
  >
    <div class="modal-container">
      <div class="left-area">
        <ProductTableVue :data="productData" :loading="loading" />
      </div>
      <div class="right-area">
        <div class="card-wrapper">
          <a-card :loading="loading">
            <a-card-grid style="display: flex; width: 100%; justify-content: space-between">
              <span class="bold">
                <v-icon color="#ff1744">mdi-star</v-icon>
                {{
                  (
                    this.productData.map((data) => data.rating)?.reduce((a, b) => a + b, 0) / this.productData.length
                  ).toFixed(2)
                }}
              </span>
              <span>별점 분포 통계</span>
            </a-card-grid>
          </a-card>
        </div>
        <div class="card-wrapper">
          <a-card :loading="loading">
            <a-card-grid v-for="(rating, index) in ratingArray" :key="index" style="width: 100%">
              <span class="rating-text">{{ rating }}점</span>
              <a-progress
                :percent="productData.filter((data) => data.rating === Number(rating)).length * 2.5"
                status="active"
                :show-info="false"
                :stroke-color="colorArray[rating - 1]"
              />
              <span class="rating-text">{{ productData.filter((data) => data.rating === Number(rating)).length }}</span>
            </a-card-grid>
          </a-card>
        </div>
        <a-card :loading="loading">
          <a-card-grid
            v-for="(review, index) in reviewData.reviewitems"
            :key="index"
            style="display: flex; width: 100%; justify-content: space-between"
          >
            <div class="grid-div">{{ review.title }}</div>
            <div class="grid-div review-name">{{ review.name }}</div>
            <div class="grid-div bold">{{ review.per }}%</div>
          </a-card-grid>
        </a-card>
      </div>
    </div>
    <template slot="footer">
      <a-button key="back" @click="this.$parent.handleCancel"> 취소 </a-button>
    </template>
  </a-modal>
</template>
<script>
import { getProductReviews, getReviewRating } from '@/http-api/index';
import ProductTableVue from './ProductTable.vue';

export default {
  props: ['data', 'visible', 'loading'],
  name: 'modalComponent',
  components: {
    ProductTableVue,
  },
  data() {
    const ratingArray = ['5', '4', '3', '2', '1'];
    const colorArray = ['#1976d2', '#303f9f', '#00796b', '#fbc02d', '#e64a19'];

    return {
      productData: [],
      reviewData: {},
      ratingArray: ratingArray,
      colorArray: colorArray,
    };
  },
  methods: {
    async setProductReviews() {
      const response = await getProductReviews(this.data.Product_Id);
      if (response.status === 200) {
        response.data.data.forEach((element, index) => {
          element.no = response.data.data.length - index;
        });
        this.productData = response.data.data;
        this.$emit('setLoading');
      }
    },
    async setReviewRating() {
      const response = await getReviewRating(this.data.Product_Id);
      if (response.status === 200) {
        this.reviewData = response.data.data;
        console.log(response.data.data);
      }
    },
  },
  watch: {
    visible: function () {
      if (this.visible) {
        this.setProductReviews(this.data.Product_Id);
        this.setReviewRating(this.data.Product_Id);
      } else {
        this.productData = [];
        this.reviewData = {};
      }
    },
  },
};
</script>
<style>
.modal-container {
  height: 60vh;
  display: flex;
}

.left-area {
  margin: 10px;
  padding: 0 5px;
  width: 70%;
  flex-grow: 7;
  height: 100%;
  overflow-y: scroll;
}

.right-area {
  padding: 10px;
  width: 30%;
  flex-grow: 3;
}

.card-wrapper {
  margin-bottom: 10px;
}

.ant-card-grid {
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ant-progress-line {
  margin: 0 20px !important;
  width: 80% !important;
}

.rating-text {
  width: 30px;
}

.review-name {
  color: rgb(56, 142, 60);
  font-weight: bold;
}

.bold {
  font-weight: bold;
}

.grid-div {
  width: 33%;
  margin-right: 10%;
  font-size: 12px;
  font-weight: 600;
}

.grid-div:last-child {
  text-align: right;
  margin: 0;
}
</style>
