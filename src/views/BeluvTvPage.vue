<template>
  <v-container id="user-profile-view" fluid tag="section">
    <h1>총 {{ data.length }} 건</h1>
    <VideoListTable :data="data" />
  </v-container>
</template>

<script>
import { dummys } from '../dummys/VideoList';
import VideoListTable from '@/components/BeluvTvPage/VideoListTable.vue';

export default {
  name: 'BeluvTvView',
  components: {
    VideoListTable,
  },
  data() {
    return {
      data: dummys,
    };
  },
};
</script>
