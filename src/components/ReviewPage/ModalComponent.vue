<template>
  <a-modal :title="`${data.product_Title} (${data.Product_Id})`" :visible="visible" @cancel="this.$parent.handleCancel"
    :closable="false" width="80%" height="40%" :ok-button-props="{ style: { display: 'none'} }">
    <div class="modal-container">
      <div class="left-area">
        <a-table :columns="columns" :data-source="productData" :rowKey="(record, index) => { return index }"
          :loading="loading">
          <div slot="url" slot-scope="url">
            <div v-for="(imageUrl, index) in url" v-bind:key="index">
              <div v-if="imageUrl">
                <a-popover trigger="click">
                  <template slot="content">
                    <img :src=imageUrl v-bind:style="{width: '600px', height: '400px'}" />
                  </template>
                  <img :src=imageUrl v-bind:style="{width: '30px', height: '20px', cursor: 'pointer'}" />
                </a-popover>
              </div>
              <div v-else>
                <img :src="require('@/assets/ic-beluv.png')" />
              </div>
            </div>
          </div>
          <div slot="content" slot-scope="content">
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ content }}</span>
              </template>
              <span>{{ content.substr(0, 30) }}...</span>
              <span class="text-bold">({{ content.length }})</span>
              <v-icon color="#388E3C">mdi-card-text</v-icon>
            </a-tooltip>
          </div>
          <div slot="content_bad" slot-scope="content_bad">
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ content_bad }}</span>
              </template>
              <span>{{ content_bad.substr(0, 30) }}...</span>
              <span class="text-bold" v-if="content_bad">({{ content_bad.length
              }})</span>
              <v-icon color="#388E3C">mdi-card-text</v-icon>
            </a-tooltip>
          </div>
          <div slot="rating" slot-scope="rating">
            <a-rate :value=rating disabled style="fontSize: 10px" />
          </div>
          <div slot="gender" slot-scope="gender">
            <span v-if="gender==='M'">남</span>
            <span v-else-if="gender==='F'">여</span>
            <span v-else>모름</span>
          </div>
        </a-table>
      </div>
      <div class="right-area">
        <div class="card-wrapper">
          <a-card :loading="loading">
            <a-card-grid style="display:flex; width:100%; justify-content: space-between;">
              <span class="bold">
                <v-icon color="#ff1744">mdi-star</v-icon>
                {{ (this.productData.map((data) => data.rating)?.reduce((a, b) => a + b, 0) /
                this.productData.length).toFixed(2) }}
              </span>
              <span>별점 분포 통계</span>
            </a-card-grid>
          </a-card>
        </div>
        <div class="card-wrapper">
          <a-card :loading="loading">
            <a-card-grid v-for="(rating, index) in ratingArray" :key="index" style="width:100%;">
              <span class="rating-text">{{ rating }}점</span>
              <a-progress :percent="productData.filter((data) => data.rating === Number(rating)).length * 2.5"
                status="active" :show-info="false" :stroke-color="colorArray[rating - 1]" />
              <span class="rating-text">{{ productData.filter((data) => data.rating === Number(rating)).length }}</span>
            </a-card-grid>
          </a-card>
        </div>
        <a-card :loading="loading">
          <a-card-grid v-for="(review, index) in reviewData.reviewitems" :key="index"
            style="display:flex; width:100%; justify-content: space-between;">
            <div class="grid-div">{{review.title}}</div>
            <div class="grid-div review-name">{{review.name}}</div>
            <div class="grid-div bold">{{review.per}}%</div>
          </a-card-grid>
        </a-card>
      </div>
    </div>
  </a-modal>
</template>
<script>
import { headers } from '@/http-api/index'

export default {
  props: ['data', 'visible', 'loading'],
  name: 'modalComponent',
  data() {
    const ratingArray = ['5', '4', '3', '2', '1'];
    const colorArray = ['#1976d2', '#303f9f', '#00796b', '#fbc02d', '#e64a19']
    const columns = [
      {
        title: "No",
        dataIndex: 'no',
        key: 'no',
        width: '10%',
        sorter: (a, b) => a.no - b.no,
        sortDirections: ['ascend'],
      },
      {
        title: "글쓴이",
        dataIndex: 'nickName',
        key: 'nickName',
        width: '7%',
      },
      {
        title: "이미지",
        dataIndex: 'url',
        key: 'url',
        scopedSlots: { customRender: 'url' },
        width: '7%',
      },
      {
        title: "좋은점(글수)",
        dataIndex: 'content',
        key: 'content',
        scopedSlots: { customRender: 'content' },
        width: '15%',
      },
      {
        title: "안좋은점(글수)",
        dataIndex: 'content_bad',
        key: 'content_bad',
        scopedSlots: { customRender: 'content_bad' },
        width: '15%',
      },
      {
        title: "별점",
        dataIndex: 'rating',
        key: 'rating',
        scopedSlots: { customRender: 'rating' },
        width: '15%',
        sorter: (a, b) => a.rating - b.rating,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: "아기성별",
        dataIndex: 'gender',
        key: 'gender',
        scopedSlots: { customRender: 'gender' },
      },
      {
        title: "아기생일",
        dataIndex: 'birth',
        key: 'birth',
        scopedSlots: { customRender: 'birth' },
      },
      {
        title: "아기피부",
        dataIndex: 'skinType',
        key: 'skinType',
        scopedSlots: { customRender: 'skinType' },
      },
      {
        title: "등록일",
        dataIndex: 'createdAt',
        key: 'createdAt',
        scopedSlots: { customRender: 'createdAt' },
      },
    ]
    return {
      columns: columns,
      productData: [],
      reviewData: {},
      ratingArray: ratingArray,
      colorArray: colorArray
    }
  },
  methods: {
    async setProductReviews() {
      const response = await this.$axios.post(
        "http://beluvapicore-env.eba-swmkh4rv.ap-northeast-2.elasticbeanstalk.com/api/Review/ProductReviewList",
        {
          productId: this.data.Product_Id,
          categoryId: 0,
          photoCheck: 0,
          filter: 0,
          userId: 0,
          startNo: 0,
          endNo: 1000
        },
        { headers: headers() }
      );
      if (response.status === 200) {
        response.data.data.forEach((element, index) => {
          element.no = response.data.data.length - index;
        });
        // console.log(response.data.data)
        this.productData = response.data.data;
        this.$parent.loading = false;
      }
    },
    async setReviewRating() {
      const response = await this.$axios.post(
        "http://beluvapicore-env.eba-swmkh4rv.ap-northeast-2.elasticbeanstalk.com/api/Review/Review_Rating",
        {
          productId: this.data.Product_Id,
          userId: 0,
        },
        { headers: headers() }
      );
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
    }
  }

}
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
