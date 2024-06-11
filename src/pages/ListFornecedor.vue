<template>
  <div>
    <!-- Campos de busca e ordenação -->
    <div class="mb-3">
      <input type="text" class="form-control" placeholder="Buscar por nome empresarial" v-model="searchQuery">
      <select class="form-select" v-model="sortBy">
        <option value="nome">Ordenar por Nome Empresarial</option>
        <option value="cnpj">Ordenar por CNPJ</option>
      </select>
    </div>

    <!-- Lista de fornecedores filtrada e ordenada -->
    <div
      class="d-flex justify-content-center"
      v-for="fornecedor in filteredAndSortedFornecedores"
      :key="fornecedor.id"
    >
      <div class="card col-6 mt-3">
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-body-secondary">
            <strong>{{ fornecedor.title }}</strong>
          </h6>
          <p class="card-text">
            {{ fornecedor.ghost_name }}
          </p>
          <p class="card-text">
            <strong>Nome Empresarial: </strong> <br>
            {{ fornecedor.nomeempresarial }}
          </p>
          <p class="card-text">
            <strong>CNPJ: </strong> <br>
            {{ fornecedor.cnpj }}
          </p>
          <p class="card-text">
            <strong>Descrição da Empresa: </strong> <br>
            {{ fornecedor.description }}
          </p>
          <button type="button" class="btn btn-primary m-2" @click="updateFornecedor(fornecedor.id)">Editar</button>
          <button type="button" class="btn btn-danger" @click="confirmDelete(fornecedor.id)">Excluir</button>
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
            Tem certeza que deseja excluir este fornecedor?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteFornecedor">Excluir</button>
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
      fornecedores: [],
      fornecedorToDelete: null,
      deleteModal: null, // Para armazenar a instância do modal
      searchQuery: '',
      sortBy: 'nome',
    };
  },
  created() {
    this.getFornecedores();
  },
  mounted() {
    // Inicializa o modal quando o componente é montado
    this.deleteModal = new Modal(document.getElementById("deleteModal"));
  },
  computed: {
    filteredAndSortedFornecedores() {
      let filteredFornecedores = this.fornecedores;

      // Filtrar por nome empresarial
      if (this.searchQuery) {
        filteredFornecedores = filteredFornecedores.filter(fornecedor =>
          fornecedor.nomeempresarial.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Ordenar os fornecedores
      if (this.sortBy === 'nome') {
        filteredFornecedores.sort((a, b) => a.nomeempresarial.localeCompare(b.nomeempresarial));
      } else if (this.sortBy === 'cnpj') {
        filteredFornecedores.sort((a, b) => a.cnpj.localeCompare(b.cnpj));
      }

      return filteredFornecedores;
    }
  },
  methods: {
    async getFornecedores() {
      this.fornecedores = [];
      const querySnapshot = await getDocs(collection(db, "fornecedor"));
      querySnapshot.forEach((doc) => {
        const objectFornecedor = {
          id: doc.id,
          title: doc.data().title,
          ghost_name: doc.data().ghost_name,
          nomeempresarial: doc.data().nomeempresarial,
          cnpj: doc.data().cnpj,
          description: doc.data().description,
        };
        this.fornecedores.push(objectFornecedor);
      });
    },
    updateFornecedor(idFornecedor) {
      this.$router.push({ name: "formfornecedor", query: { id: idFornecedor } });
    },
    confirmDelete(fornecedorId) {
      this.fornecedorToDelete = fornecedorId;
      this.deleteModal.show(); // Mostra o modal
    },
    async deleteFornecedor() {
      if (this.fornecedorToDelete) {
        await deleteDoc(doc(db, "fornecedor", this.fornecedorToDelete));
        this.fornecedorToDelete = null;
        this.getFornecedores(); // Atualiza a lista de fornecedores
        this.deleteModal.hide(); // Fecha o modal
        // Adicione uma notificação de sucesso após a exclusão
        toast.success("Fornecedor excluído com sucesso!", {
          autoClose: 5000,
        });
      }
    },
  },
};
</script>
