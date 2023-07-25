<template>
  <div class="top-city">
    <div class="city-container">
      <button
        class="city-title"
        v-for="cityItem in cities"
        :key="cityItem.id"
        @click="changeCity(cityItem.title)"
      >
        {{ cityItem.title }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  weatherInfo: {
    type: [Object, null],
    required: true,
  },
  changeCity: Function,
});

const cities = [
  {
    id: 1,
    title: 'New York',
  },
  {
    id: 2,
    title: 'Paris',
  },
  {
    id: 3,
    title: 'Berlin',
  },
  {
    id: 4,
    title: 'Tokyo',
  },
  {
    id: 5,
    title: 'London',
  },
  {
    id: 6,
    title: 'Kyiv',
  },
  {
    id: 7,
    title: 'Istanbul',
  },
];
</script>

<style lang="css" scoped>
.top-city {
  margin-top: 20px;
  margin-bottom: 20px;
}

.city-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.city-title {
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #ffafcc;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.city-title:hover {
  background-color: #ffc8dd;
}

.city-title:focus {
  outline: none;
}

@media (max-width: 768px) {
  .city-container {
    flex-direction: column;
  }

  .city-title {
    margin-bottom: 10px;
  }
}

@media (max-width: 480px) {
  .city-title {
    font-size: 14px;
  }
}

@media (max-width: 320px) {
  .city-title {
    font-size: 12px;
  }
}


</style>
