const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const url = "https://oc-p5-api.herokuapp.com/api/teddies/";
let products = [];
let singleProduct = {};
let cart = [];
const app = document.getElementById("app");
let count = document.getElementById("item-amount");
