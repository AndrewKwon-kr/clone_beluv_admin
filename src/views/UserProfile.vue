<template>
  <v-container
    id="user-profile-view"
    fluid
    tag="section"
  >
    <a-table 
    :columns="columns" 
    :data-source="data" 
    :rowKey="(record, index) => {return index}"
    >
      <div slot="thumbnails" slot-scope="thumbnails" class="thumbnail">
        <a-popover trigger="click">
          <template slot="content">
            <img :src=thumbnails v-bind:style="{width: '300px', height: '200px'}"/>
          </template>
            <img :src=thumbnails v-bind:style="{width: '30px', height: '20px', cursor: 'pointer'}"/>
        </a-popover>
      </div>
      <div slot="summary" slot-scope="summary">
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>{{summary}}</span>
          </template>
          <v-icon color="green darken-2">mdi-card-text</v-icon>
        </a-tooltip>
      </div>
      <div slot="status" slot-scope="status">
        <v-icon v-if="status === 'ACTIVATE'" color="green darken-2">mdi-eye</v-icon>
        <v-icon v-else >mdi-eye-off</v-icon>
      </div>
      <span slot="createdAt" slot-scope="createdAt">{{createdAt.substr(0,10)}}</span>
    </a-table>
  </v-container>
</template>

<script>
  import { dummys } from '../dummys/dummys.js'

  const columns = [
  {
    title: "No",
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '대카테고리',
    dataIndex: 'categoryName',
    key: 'categoryName',
    width: '10%',
    filters: [
      { text: '육아꿀팁', value: '육아꿀팁' },
      { text: '육아정보', value: '육아정보' },
      { text: '브이로그/일상', value: '브이로그/일상' },
    ],
    onFilter: (value, record) => record.categoryName.indexOf(value) === 0,
  },
  {
    title: '소카테고리',
    dataIndex: 'subCategoryName',
    key: 'subCategoryName',
    width: '10%',
    filters: [
      { text: '건강', value: '건강' },
      { text: '육아정보', value: '육아정보' },
      { text: '놀이', value: '놀이' },
      { text: '간식/식품', value: '간식/식품' },
      { text: '교육', value: '교육' },
    ],
    onFilter: (value, record) => record.subCategoryName.indexOf(value) === 0,
  },
  {
    title: '썸네일',
    key: 'thumbnails',
    width: '10%',
    dataIndex: 'thumbnails',
    scopedSlots: {customRender: 'thumbnails'}
  },
  {
    title: '채널명',
    dataIndex: 'channel_title',
    key: 'channel_title',
  },
  {
    title: '영상제목',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '요약글',
    dataIndex: 'summary',
    key: 'summary',
    width: '5%',
    scopedSlots: {customRender: 'summary'}
  },
  {
    title: '조회수',
    dataIndex: 'playCount',
    key: 'playCount',
    width: '8%',
    sorter: (a, b) => a.playCount - b.playCount,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '활성',
    dataIndex: 'status',
    key: 'status',
    width: '5%',
    scopedSlots: {customRender: 'status'},
    filters: [
      { text: '활성', value: 'ACTIVATE' },
      { text: '비활성', value: 'INACTIVATE' },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.status.indexOf(value) === 0,
  },
  {
    title: '재생시간',
    dataIndex: 'play_time',
    key: 'play_time',
    width: '10%',
  },
  {
    title: '등록날짜',
    dataIndex: 'createdAt',
    key: 'createdAt',
    scopedSlots: {customRender: 'createdAt'}

  },
];

  export default { 
    name: 'UserProfileView',
    data: () => ({
      columns: columns,
      data: dummys
    })
  }
</script>
<style>
  .ant-table-thead > tr > th {
    text-align: center;
  }
  .ant-table-tbody {
    background-color: white;
    text-align: center;
  }
</style>