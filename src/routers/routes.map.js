import Home from "@/pages/Home.vue";

import ListClient from "@/pages/ListClient.vue";

import ListProduct from "@/pages/ListProduct.vue";
import ListFornecedor from "@/pages/ListFornecedor.vue";
import FormFornecedor from "@/pages/FormFornecedor.vue";
import FormClient from "@/pages/FormClient.vue";
import FormProduct from "@/pages/FormProduct.vue"; 

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  
  {
    path: "/listclient",
    name: "listclient",
    component: ListClient,
  },
  
  {
    path: "/listproduct",
    name: "listproduct",
    component: ListProduct,
  },
  
  {
    path: "/listfornecedor",
    name: "listfornecedor",
    component: ListFornecedor,
  },

  {
    path: "/formfornecedor",
    name: "formfornecedor",
    component: FormFornecedor,
  },

  {
    path: "/formclient",
    name: "formclient",
    component: FormClient,
  },
  
  {
    path: "/formproduct",
    name: "formproduct",
    component: FormProduct,
  },
];

export default routes