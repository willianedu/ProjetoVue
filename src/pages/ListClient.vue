<template>
  <div>
    <!-- Campos de busca e ordenação -->
    <div class="mb-3">
      <input type="text" class="form-control" placeholder="Buscar por nome" v-model="searchQuery">
      <select class="form-select" v-model="sortBy">
        <option value="nome">Ordenar por Nome</option>
        <option value="cpf">Ordenar por CPF</option>
        <!-- Adicione mais opções de ordenação conforme necessário -->
      </select>
    </div>

    <!-- Lista de clientes filtrada e ordenada -->
    <div
      class="d-flex justify-content-center"
      v-for="cliente in filteredAndSortedClients"
      :key="cliente.id"
    >
      <div class="card col-6 mt-3">
        <div class="card-body">
          <h5 class="card-title">{{ cliente.nome }}</h5>
          <p class="card-text"><strong>Nascimento:</strong> {{ formatDate(cliente.nascimento) }}</p>
          <p class="card-text"><strong>E-mail:</strong> {{ cliente.email }}</p>
          <p class="card-text"><strong>Telefone:</strong> {{ cliente.telefone }}</p>
          <p class="card-text"><strong>CPF:</strong> {{ cliente.cpf }}</p>
          <p class="card-text"><strong>Endereço:</strong> {{ cliente.endereco }}</p>
          <button type="button" class="btn btn-primary m-2" @click="updateClient(cliente.id)">Editar</button>
          <button type="button" class="btn btn-danger" @click="confirmDelete(cliente.id)">Excluir</button>
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
            Tem certeza que deseja excluir este cliente?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteClient">Excluir</button>
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
      clientes: [],
      clientToDelete: null,
      deleteModal: null, // Para armazenar a instância do modal
      searchQuery: '',
      sortBy: 'nome',
    };
  },
  created() {
    this.getClients();
  },
  mounted() {
    // Inicializa o modal quando o componente é montado
    this.deleteModal = new Modal(document.getElementById("deleteModal"));
  },
  computed: {
    filteredAndSortedClients() {
      let filteredClients = this.clientes;

      // Filtrar por nome
      if (this.searchQuery) {
        filteredClients = filteredClients.filter(cliente =>
          cliente.nome.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Ordenar os clientes
      if (this.sortBy === 'nome') {
        filteredClients.sort((a, b) => a.nome.localeCompare(b.nome));
      } else if (this.sortBy === 'cpf') {
        filteredClients.sort((a, b) => a.cpf.localeCompare(b.cpf));
      }
      
      // Adicione mais lógica de ordenação conforme necessário

      return filteredClients;
    }
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return '';
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    },
    async getClients() {
      this.clientes = [];
      const querySnapshot = await getDocs(collection(db, "clientes"));
      querySnapshot.forEach((doc) => {
        const objectClient = {
          id: doc.id,
          nome: doc.data().nome,
          nascimento: doc.data().nascimento,
          email: doc.data().email,
          telefone: doc.data().telefone,
          cpf: doc.data().cpf,
          endereco: doc.data().endereco,
        };
        this.clientes.push(objectClient);
      });
    },
    updateClient(idClient) {
      this.$router.push({ name: "formclient", query: { id: idClient } });
    },
    confirmDelete(clientId) {
      this.clientToDelete = clientId;
      this.deleteModal.show(); // Mostra o modal
    },
    async deleteClient() {
      if (this.clientToDelete) {
        await deleteDoc(doc(db, "clientes", this.clientToDelete));
        this.clientToDelete = null;
        this.getClients(); // Atualiza a lista de clientes
        this.deleteModal.hide(); // Fecha o modal
        // Adicione uma notificação de sucesso após a exclusão
        toast.success("Cliente excluído com sucesso!", {
          autoClose: 5000,
        });
      }
    },
  },
};
</script>
