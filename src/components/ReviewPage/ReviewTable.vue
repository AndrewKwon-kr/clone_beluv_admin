<template>
  <a-table
    :columns="columns"
    :data-source="filteredData"
    :rowKey="
      (record, index) => {
        return index;
      }
    "
    :customRow="this.$parent.handleClickRow"
  >
    <div slot="ProductReview_Url" slot-scope="ProductReview_Url" v-if="ProductReview_Url">
      <a-popover trigger="click">
        <template slot="content">
          <img :src="ProductReview_Url" v-bind:style="{ width: '600px', height: '400px' }" />
        </template>
        <img :src="ProductReview_Url" v-bind:style="{ width: '30px', height: '20px', cursor: 'pointer' }" />
      </a-popover>
    </div>
    <div v-else>
      <img :src="require('@/assets/ic-beluv.png')" />
    </div>
    <div slot="rating" slot-scope="rating">
      <a-rate :value="rating" disabled style="fontsize: 10px" />
    </div>
    <div slot="ProductReview_content" slot-scope="ProductReview_content">
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>{{ ProductReview_content }}</span>
        </template>
        <span>{{ ProductReview_content?.substr(0, 30) }}...</span>
        <span class="text-bold">({{ ProductReview_content.length }})</span>
        <v-icon color="green darken-2">mdi-card-text</v-icon>
      </a-tooltip>
    </div>
    <div slot="ProductReview_Content_bad" slot-scope="ProductReview_Content_bad">
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>{{ ProductReview_Content_bad }}</span>
        </template>
        <span>{{ ProductReview_Content_bad?.substr(0, 30) }}...</span>
        <span class="text-bold" v-if="ProductReview_Content_bad">({{ ProductReview_Content_bad.length }})</span>
        <v-icon color="green darken-2">mdi-card-text</v-icon>
      </a-tooltip>
    </div>
    <span slot="createdAt" slot-scope="createdAt">{{ createdAt?.substr(0, 10) }}</span>
    <div slot="status" slot-scope="status">
      <a-switch v-if="status === 'ACTIVATE'" default-checked />
      <a-switch v-else />
    </div>
  </a-table>
</template>
<script>
export default {
  props: ['filteredData'],
  name: 'ReviewTable',

  data() {
    const columns = [
      {
        title: 'No',
        dataIndex: 'review_Id',
        key: 'review_Id',
        width: '5%',
      },
      {
        title: '???????????????',
        dataIndex: 'category_Name',
        key: 'category_Name',
        width: '8%',
        filters: [
          { text: '??????', value: '??????' },
          { text: '?????????', value: '?????????' },
          { text: '?????????', value: '?????????' },
          { text: '??????', value: '??????' },
          { text: '????????????', value: '????????????' },
          { text: '?????????', value: '?????????' },
          { text: '??????/????????????', value: '??????/????????????' },
          { text: '?????????', value: '?????????' },
        ],
        onFilter: (value, record) => record.category_Name.indexOf(value) === 0,
      },
      {
        title: '???????????????',
        dataIndex: 'subCategory_Name',
        key: 'subCategory_Name',
        width: '8%',
      },
      {
        title: '????????????',
        dataIndex: 'barnd_Name',
        key: 'barnd_Name',
        width: '7%',
      },
      {
        title: '?????????',
        dataIndex: 'product_Title',
        key: 'product_Title',
        width: '7%',
      },
      {
        title: '?????????',
        dataIndex: 'user_NickName',
        key: 'user_NickName',
        width: '7%',
      },
      {
        title: '?????????',
        dataIndex: 'ProductReview_Url',
        key: 'ProductReview_Url',
        scopedSlots: { customRender: 'ProductReview_Url' },
        width: '7%',
      },
      {
        title: '?????????(??????)',
        dataIndex: 'ProductReview_content',
        key: 'ProductReview_content',
        scopedSlots: { customRender: 'ProductReview_content' },
        width: '15%',
      },
      {
        title: '????????????(??????)',
        dataIndex: 'ProductReview_Content_bad',
        key: 'ProductReview_Content_bad',
        scopedSlots: { customRender: 'ProductReview_Content_bad' },
        width: '15%',
      },
      {
        title: '??????',
        dataIndex: 'rating',
        key: 'rating',
        scopedSlots: { customRender: 'rating' },
        width: '15%',
        sorter: (a, b) => a.rating - b.rating,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '?????????',
        dataIndex: 'createdAt',
        key: 'createdAt',
        scopedSlots: { customRender: 'createdAt' },
      },
      {
        title: '??????',
        dataIndex: 'status',
        key: 'status',
        scopedSlots: { customRender: 'status' },
      },
    ];

    return {
      columns: columns,
      endOpen: false,
      modalValue: {},
      visible: false,
      loading: true,
    };
  },
};
</script>
