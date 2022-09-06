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
        <img :src=thumbnails v-bind:style="{width: '30px', height: '20px'}"/>
      </div>
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
    filters: [
      { text: '건강', value: '건강' },
      { text: '육아정보', value: '육아정보' },
      { text: '놀이', value: '놀이' },
      { text: '간식/식품', value: '간식/식품' },
      { text: '안전', value: '안전' },
    ],
    onFilter: (value, record) => record.subCategoryName.indexOf(value) === 0,
  },
  {
    title: '썸네일',
    key: 'thumbnails',
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
  },
  {
    title: '조회수',
    dataIndex: 'playCount',
    key: 'playCount',
  },
  {
    title: '활성',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '재생시간',
    dataIndex: 'play_time',
    key: 'play_time',
  },
  {
    title: '등록날짜',
    dataIndex: 'createdAt',
    key: 'createdAt',
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
