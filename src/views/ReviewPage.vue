<template>
  <v-container id="user-profile-view" fluid tag="section">
    <h1>총 {{data.length}} 건</h1>
    <a-table :columns="columns" :data-source="data" :rowKey="(record, index) => { return index }">
      <div slot="ProductReview_Url" slot-scope="ProductReview_Url" >
        <a-popover trigger="click">
          <template slot="content">
            <img :src=ProductReview_Url v-bind:style="{width: '600px', height: '400px'}" />
          </template>
          <img :src=ProductReview_Url v-bind:style="{width: '30px', height: '20px', cursor: 'pointer'}" />
        </a-popover>
      </div>
      <div slot="rating" slot-scope="rating">
        <a-rate :value=rating disabled style="fontSize: 10px" />
      </div>
      <span slot="createdAt" slot-scope="createdAt">{{createdAt.substr(0,10)}}</span>
      <div slot="status" slot-scope="status">
        <a-switch v-if="status==='ACTIVATE'" default-checked />
        <a-switch v-else />
      </div>
    </a-table>
  </v-container>
</template>

<script>
import { dummys } from '../dummys/ReviewList'

export default {
  name: 'ReviewView',
  data() {

    const columns = [
      {
        title: "No",
        dataIndex: 'review_Id',
        key: 'review_Id',
        width: '5%'
      },
      {
        title: "대카테고리",
        dataIndex: 'category_Name',
        key: 'category_Name',
        width: '8%',
      },
      {
        title: "소카테고리",
        dataIndex: 'subCategory_Name',
        key: 'subCategory_Name',
        width: '8%',
      },
      {
        title: "브랜드명",
        dataIndex: 'barnd_Name',
        key: 'barnd_Name',
        width: '7%',
      },
      {
        title: "제품명",
        dataIndex: 'product_Title',
        key: 'product_Title',
        width: '7%',
      },
      {
        title: "글쓴이",
        dataIndex: 'user_NickName',
        key: 'user_NickName',
        width: '7%',
      },
      {
        title: "이미지",
        dataIndex: 'ProductReview_Url',
        key: 'ProductReview_Url',
        scopedSlots: { customRender: 'ProductReview_Url' },
        width: '7%',
      },
      {
        title: "좋은점(글수)",
        dataIndex: 'ProductReview_content',
        key: 'ProductReview_content',
        width: '15%',
      },
      {
        title: "안좋은점(글수)",
        dataIndex: 'ProductReview_Content_bad',
        key: 'ProductReview_Content_bad',
        width: '15%',
      },
      {
        title: "별점",
        dataIndex: 'rating',
        key: 'rating',
        scopedSlots: { customRender: 'rating' },
        width: '15%',
      },
      {
        title: "등록일",
        dataIndex: 'createdAt',
        key: 'createdAt',
        scopedSlots: { customRender: 'createdAt' },
      },
      {
        title: "활성",
        dataIndex: 'status',
        key: 'status',
        scopedSlots: { customRender: 'status' },
      },
      
    ]
    return {
      columns: columns,
      data: dummys
    }
  }

}
</script>
<style>
.ant-table-title {
  display: none;
}

.ant-table-thead>tr>th {
  text-align: center;
}

.ant-table-tbody {
  background-color: white;
  text-align: center;
}
.ant-table-tbody > tr > td {
  font-weight: 600 !important;
}
.ant-rate-star:not(:last-child) {
    margin-right: 4px;
}
.v-application ul {
    padding-left: 0;
}
</style>