<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :rowKey="
      (record, index) => {
        return index;
      }
    "
    :loading="loading"
  >
    <div slot="url" slot-scope="url">
      <div v-for="(imageUrl, index) in url" v-bind:key="index">
        <div v-if="imageUrl">
          <a-popover trigger="click">
            <template slot="content">
              <img :src="imageUrl" v-bind:style="{ width: '600px', height: '400px' }" />
            </template>
            <img
              :src="imageUrl"
              v-bind:style="{
                width: '30px',
                height: '20px',
                cursor: 'pointer',
              }"
            />
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
        <span class="text-bold" v-if="content_bad">({{ content_bad.length }})</span>
        <v-icon color="#388E3C">mdi-card-text</v-icon>
      </a-tooltip>
    </div>
    <div slot="rating" slot-scope="rating">
      <a-rate :value="rating" disabled style="fontsize: 10px" />
    </div>
    <div slot="gender" slot-scope="gender">
      <span v-if="gender === 'M'">남</span>
      <span v-else-if="gender === 'F'">여</span>
      <span v-else>모름</span>
    </div>
  </a-table>
</template>
<script>
export default {
  props: ['data', 'loading'],
  name: 'productTable',
  data() {
    const columns = [
      {
        title: 'No',
        dataIndex: 'no',
        key: 'no',
        width: '10%',
        sorter: (a, b) => a.no - b.no,
        sortDirections: ['ascend'],
      },
      {
        title: '글쓴이',
        dataIndex: 'nickName',
        key: 'nickName',
        width: '7%',
      },
      {
        title: '이미지',
        dataIndex: 'url',
        key: 'url',
        scopedSlots: { customRender: 'url' },
        width: '7%',
      },
      {
        title: '좋은점(글수)',
        dataIndex: 'content',
        key: 'content',
        scopedSlots: { customRender: 'content' },
        width: '15%',
      },
      {
        title: '안좋은점(글수)',
        dataIndex: 'content_bad',
        key: 'content_bad',
        scopedSlots: { customRender: 'content_bad' },
        width: '15%',
      },
      {
        title: '별점',
        dataIndex: 'rating',
        key: 'rating',
        scopedSlots: { customRender: 'rating' },
        width: '15%',
        sorter: (a, b) => a.rating - b.rating,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '아기성별',
        dataIndex: 'gender',
        key: 'gender',
        scopedSlots: { customRender: 'gender' },
      },
      {
        title: '아기생일',
        dataIndex: 'birth',
        key: 'birth',
        scopedSlots: { customRender: 'birth' },
      },
      {
        title: '아기피부',
        dataIndex: 'skinType',
        key: 'skinType',
        scopedSlots: { customRender: 'skinType' },
      },
      {
        title: '등록일',
        dataIndex: 'createdAt',
        key: 'createdAt',
        scopedSlots: { customRender: 'createdAt' },
      },
    ];
    return {
      columns: columns,
    };
  },
};
</script>
