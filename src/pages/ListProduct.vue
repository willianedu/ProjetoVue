<template>
  <div>
    <!-- Campos de busca e ordenação -->
    <div class="mb-3">
      <input type="text" class="form-control" placeholder="Buscar por nome" v-model="searchQuery">
      <select class="form-select" v-model="sortBy">
        <option value="nome">Ordenar por Nome</option>
        <option value="id">Ordenar por ID</option>
      </select>
    </div>

    <!-- Lista de veículos filtrada e ordenada -->
    <div
      class="d-flex justify-content-center"
      v-for="veiculo in filteredAndSortedVeiculos"
      :key="veiculo.id"
    >
      <div class="card col-6 mt-3">
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-body-secondary">
            <strong>{{ veiculo.title }}</strong>
          </h6>
          <p class="card-text">
            <strong>ID:</strong> {{ veiculo.identification}}
          </p>
          <p class="card-text">
            <strong>Marca:</strong><br>
            {{ veiculo.marca}}
          </p>
          <p class="card-text">
            <strong>Modelo:</strong><br>
            {{ veiculo.modelo}}
          </p>
          <p class="card-text">
            <strong>Ano:</strong><br>
            {{ veiculo.ano }}
          </p>
          <p class="card-text">
            <strong>Cor:</strong><br>
            {{ veiculo.cor }}
          </p>
          <p class="card-text">
            <strong>Condição:</strong><br>
            {{ veiculo.condicao }}
          </p>
          <button type="button" class="btn btn-primary m-2" @click="updateVeiculo(veiculo.id)">Editar</button>
          <button type="button" class="btn btn-danger" @click="confirmDelete(veiculo.id)">Excluir</button>
        </div>
      </div>
    </div>

    <!-- Modal de confirmação -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Confirmar Exclusão</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Tem certeza que deseja excluir este veículo?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteVeiculo">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebaseDB";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Modal } from "bootstrap"; // Certifique-se de que o Bootstrap 5 esteja instalado
import { toast } from "vue3-toastify"; // Importe a função de notificação

export default {
  data() {
    return {
      veiculos: [],
      veiculoToDelete: null,
      deleteModal: null, // Para armazenar a instância do modal
      searchQuery: '',
      sortBy: 'nome',
    };
  },
  created() {
    this.getVeiculos();
  },
  mounted() {
    // Inicializa o modal quando o componente é montado
    this.deleteModal = new Modal(document.getElementById("deleteModal"));
  },
  computed: {
    filteredAndSortedVeiculos() {
      let filteredVeiculos = this.veiculos;

      // Filtrar por nome
      if (this.searchQuery) {
        filteredVeiculos = filteredVeiculos.filter(veiculo =>
          veiculo.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Ordenar os veículos
      if (this.sortBy === 'nome') {
        filteredVeiculos.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortBy === 'id') {
        filteredVeiculos.sort((a, b) => a.identification - b.identification);
      }

      return filteredVeiculos;
    }
  },
  methods: {
    async getVeiculos() {
      this.veiculos = [];
      const querySnapshot = await getDocs(collection(db, "veiculos"));
      querySnapshot.forEach((doc) => {
        const objectVeiculo = {
          id: doc.id,
          title: doc.data().title,
          identification: doc.data().identification,
          marca: doc.data().marca,
          modelo: doc.data().modelo,
          ano: doc.data().ano,
          cor: doc.data().cor,
          condicao: doc.data().condicao,
        };
        this.veiculos.push(objectVeiculo);
      });
    },
    updateVeiculo(idVeiculo) {
      this.$router.push({ name: "formproduct", query: { id: idVeiculo } });
    },
    confirmDelete(veiculoId) {
      this.veiculoToDelete = veiculoId;
      this.deleteModal.show(); // Mostra o modal
    },
    async deleteVeiculo() {
      if (this.veiculoToDelete) {
        await deleteDoc(doc(db, "veiculos", this.veiculoToDelete));
        this.veiculoToDelete = null;
        this.getVeiculos(); // Atualiza a lista de veículos
        this.deleteModal.hide(); // Fecha o modal
        // Adicione uma notificação de sucesso após a exclusão
        toast.success("Veículo excluído com sucesso!", {
          autoClose: 5000,
        });
      }
    },
  },
};
</script>
