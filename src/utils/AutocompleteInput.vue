<template>
    <div>
      <input
        type="text"
        v-model="searchText"
        @input="handleInput"
        @focus="showSuggestions"
        @blur="hideSuggestions"
      />
      <ul v-if="showAutoComplete">
        <li v-for="(city, index) in suggestedCities" :key="index" @click="selectCity(city)">
          {{ city }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { debounce } from 'lodash';
  import WeatherService from './WeatherService.js';
  export default {
    name: 'AutocompleteInput',
    data() {
      return {
        searchText: '',
        suggestedCities: [],
        showAutoComplete: false,
        weatherService: new WeatherService('1fd483147332f485b277c0e2647b9c3f'),
      };
    },
    methods: {
      handleInput: debounce(async function () {
        if (this.searchText === '') {
          this.suggestedCities = [];
          return;
        }
  
        try {
          // Use the WeatherService to fetch suggested city names based on searchText
          const suggestions = await this.weatherService.fetchCitySuggestions(this.searchText);
          this.suggestedCities = suggestions;
        } catch (error) {
          // Handle error if the API request fails
          console.error('Error fetching city suggestions:', error);
          this.suggestedCities = [];
        }
      }, 300),
      showSuggestions() {
        this.showAutoComplete = true;
      },
      hideSuggestions() {
        this.showAutoComplete = false;
      },
      selectCity(city) {
        // Emit the selected city to the parent component (App.vue)
        this.$emit('city-selected', city);
        this.searchText = ''; // Clear the input field after selecting a city
        this.suggestedCities = []; // Clear the suggested cities list after selection
      },
    },
  };
  </script>
  
  <style>
  /* Put AutocompleteInput CSS styles here */
  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1.2rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
  }

  li {
    padding: 0.5rem;
    cursor: pointer;
  }

  li:hover {
    background-color: #ccc;
  }

  li:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }

  li:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }

  li:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }
  </style>