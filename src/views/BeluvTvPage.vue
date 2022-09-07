<template>
  <v-container id="user-profile-view" fluid tag="section">
    <h1>총 {{data.length}} 건</h1>
    <a-table :columns="columns" :data-source="data" :rowKey="(record, index) => { return index }">
      <div slot="thumbnails" slot-scope="thumbnails" class="thumbnail">
        <a-popover trigger="click">
          <template slot="content">
            <img :src=thumbnails v-bind:style="{width: '300px', height: '200px'}" />
          </template>
          <img :src=thumbnails v-bind:style="{width: '30px', height: '20px', cursor: 'pointer'}" />
        </a-popover>
      </div>
      <div slot="summary" slot-scope="summary">
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>{{ summary }}</span>
          </template>
          <v-icon color="green darken-2">mdi-card-text</v-icon>
        </a-tooltip>
      </div>
      <div slot="playCount" slot-scope="playCount">
        <span>{{ playCount.toLocaleString() }}</span>
      </div>
      <div slot="status" slot-scope="status">
        <v-icon v-if="status === 'ACTIVATE'" color="green darken-2">mdi-eye</v-icon>
        <v-icon v-else>mdi-eye-off</v-icon>
      </div>
      <span slot="createdAt" slot-scope="createdAt">{{createdAt.substr(0,10)}}</span>
    </a-table>
  </v-container>
</template>

<script>
import { dummys } from '../dummys/dummys.js'

export default {
  name: 'ProductListView',
  data() {

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
        scopedSlots: { customRender: 'thumbnails' }
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
        customRender: (text, record) => {
          return (
            <div slot="title" slot-scope="title">
              <span>{{ text }}</span>
              <button
                icon
                x-small
                target="_blank"
                onClick={() => window.open(record.videoLink)}
              >
                <img src={require('@/assets/open-in-new.png')} style={{ width: '16px', marginLeft: '5px' }} />
              </button>
            </div>
          )
        }
      },
      {
        title: '요약글',
        dataIndex: 'summary',
        key: 'summary',
        width: '8%',
        scopedSlots: { customRender: 'summary' }
      },
      {
        title: '조회수',
        dataIndex: 'playCount',
        key: 'playCount',
        width: '8%',
        scopedSlots: { customRender: 'playCount' },
        sorter: (a, b) => a.playCount - b.playCount,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '활성',
        dataIndex: 'status',
        key: 'status',
        width: '7%',
        scopedSlots: { customRender: 'status' },
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
        width: '7%',
        scopedSlots: { customRender: 'createdAt' }

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
</style>