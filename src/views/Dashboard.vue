<template>
  <v-container id="yarn-view" fluid tag="section">
    <v-row v-if="loading">
      <div class="spin-wrapper">
        <a-spin :indicator="indicator" />
      </div>
    </v-row>
    <v-row v-else>
      <v-col v-for="({ actionIcon, actionText, ...attrs }, i) in stats" :key="i" cols="12" md="6" lg="3">
        <material-stat-card v-bind="attrs">
          <template #actions>
            <v-icon class="mr-2" small v-text="actionIcon" />
            <div class="text-truncate">
              {{ actionText }}
            </div>
          </template>
        </material-stat-card>
      </v-col>
    </v-row>
    <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
      :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width"
      :height="height" />
  </v-container>
</template>

<script>
// Utilities
import { get } from 'vuex-pathify'
import { getAppUserInfo } from '../http-api/index'
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

export default {
  name: 'DashboardView',
  components: {
    LineChartGenerator
  },
  methods: {
    async getData() {
      const res = await getAppUserInfo();

      if (res.status === 200) {
        this.items = res.data.result;
        this.stats = this.stats.map((stat) => {
          return { ...stat, value: Intl.NumberFormat().format(this.items[stat.value]) }
        })
      }
      setTimeout(() => {
        this.loading = false;
      }, 200)
    },

  },
  async mounted() {
    await this.getData();
  },

  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },


  data() {
    return {
      indicator: <a-icon type="loading" style="font-size: 48px" spin />,
      loading: true,
      items: {},
      stats: [
        {
          actionIcon: 'mdi-alpha-a-box-outline',
          actionText: '10만 가즈아...!',
          color: '#FD9A13',
          icon: 'mdi-account-multiple',
          title: '총 회원수',
          value: 'all'
        },
        {
          actionIcon: 'mdi-alpha-t-box-outline',
          actionText: '오늘 가입해주신 분들',
          color: 'primary',
          icon: 'mdi-account-arrow-up',
          title: '오늘 가입회원',
          value: 'today'
        },
        {
          actionIcon: 'mdi-alpha-w-box-outline',
          actionText: '이번주 가입자분들',
          color: 'success',
          icon: 'mdi-account-multiple-plus',
          title: '이번주 가입회원',
          value: 'week'
        },
        {
          actionIcon: 'mdi-alpha-m-box-outline',
          actionText: '이번달 가입자분들',
          color: 'info',
          icon: 'mdi-account-group',
          title: '이번달 가입회원',
          value: 'month'
        },
        {
          actionIcon: 'mdi-history',
          actionText: '돌아와요',
          color: '#DC2626',
          icon: 'mdi-account-multiple-minus',
          title: '탈퇴자',
          value: 'inActivatedUser'
        },
      ],
      chartData: {
        labels: [
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
        ],
        datasets: [
          {
            label: '가입(샘플)',
            backgroundColor: '#f87979',
            borderColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40, 90]
          },
          {
            label: '탈퇴(샘플)',
            backgroundColor: '#5B82E3',
            borderColor: '#5B82E3',
            data: [20, 9, 10, 14, 6, 16, 30, 8]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    sales: get('sales/sales'),
    totalSales() {
      return this.sales.reduce((acc, val) => acc + val.salesInM, 0)
    },
  },
}
</script>
<style>
.spin-wrapper {
  width: 100vw;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>
