<template>
    <div class="favorites-tab">
      <h2 class="favorites-tab__title">Favorites</h2>
      <ul class="favorites-tab__list">
        <li
          v-for="favorite in favorites"
          :key="favorite.id"
          class="favorites-tab__list-item"
        >
          <span>{{ favorite.name }}</span>
          <span>{{ favorite.temp }}°C</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FavoritesTab',
    props: {
      favorites: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style>

  .favorites-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .favorites-tab__title {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .favorites-tab__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .favorites-tab__list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
  }
  </style>