<template>
  <div class="d-flex justify-content-center">
    <div class="card col-6 mt-3">
      <form>
        <div class="card-header">
          <span v-if="form.id">Editar</span><span v-else>Cadastro de Veículos</span>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="title" class="form-label">Nome do Veículo</label>
            <input
              type="text"
              class="form-control"
              id="title"
              name="title"
              v-model="form.title"
            />
          </div>
          <div class="mb-3">
            <label for="identification" class="form-label">ID</label>
            <input
              type="textarea"
              class="form-control"
              id="identification"
              name="identification"
              v-model="form.identification"
            />
          </div>
          <div class="mb-3">
            <label for="marca" class="form-label">Marca</label>
            <input
              type="textarea"
              class="form-control"
              id="marca"
              name="marca"
              v-model="form.marca"
            />
          </div>
          <div class="mb-3">
            <label for="modelo" class="form-label">Modelo</label>
            <input
              type="textarea"
              class="form-control"
              id="modelo"
              name="modelo"
              v-model="form.modelo"
            />
          </div>
          <div class="mb-3">
            <label for="ano" class="form-label">Ano</label>
            <input
              type="textarea"
              class="form-control"
              id="ano"
              name="ano"
              v-model="form.ano"
            />
          </div>
          <div class="mb-3">
            <label for="cor" class="form-label">Cor</label>
            <input
              type="textarea"
              class="form-control"
              id="cor"
              name="cor"
              v-model="form.cor"
            />
          </div>
          <div class="mb-3">
            <label for="condicao" class="form-label">Condição</label>
            <select
              class="form-control"
              id="condicao"
              name="condicao"
              v-model="form.condicao"
            >
              <option value="Novo">Novo</option>
              <option value="Semi-Novo">Semi-Novo</option>
              <option value="Usado">Usado</option>
            </select>
          </div>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-primary" @click="saveTask">
            {{ form.id ? 'Salvar' : 'Cadastrar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "../firebaseDB";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "FormProduct",
  data() {
    return {
      form: {
        id: null,
        title: "",
        cor: "",
        identification: "",
        ano: "",
        marca: "",
        modelo: "",
        condicao: "",
      },
    };
  },
  async created() {
    this.form.id = this.$route.query.id;
    if (this.form.id) {
      await this.fetchTask(this.form.id);
    }
  },
  methods: {
    async fetchTask(id) {
      const docRef = doc(db, "veiculos", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.form = { id, ...docSnap.data() };
      } else {
        console.log("No such document!");
      }
    },
    async saveTask() {
      if (this.form.id) {
        this.updateTask();
      } else {
        this.insertTask();
      }
    },
    async insertTask() {
      try {
        await addDoc(collection(db, "veiculos"), {
          title: this.form.title,
          identification: this.form.identification,
          cor: this.form.cor,
          ano: this.form.ano,
          marca: this.form.marca,
          modelo: this.form.modelo,
          condicao: this.form.condicao,
        });
        this.clearForm();
        this.makeToast();
        setTimeout(() => {
          this.$router.push({ name: "listproduct" });
        }, 2000); // Atraso de 2 segundos para permitir que o toast seja visto
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
    async updateTask() {
      try {
        const docRef = doc(db, "veiculos", this.form.id);
        await updateDoc(docRef, {
          title: this.form.title,
          identification: this.form.identification,
          cor: this.form.cor,
          ano: this.form.ano,
          marca: this.form.marca,
          modelo: this.form.modelo,
          condicao: this.form.condicao,
        });
        this.makeToast("Veículo atualizado com sucesso!");
        setTimeout(() => {
          this.$router.push({ name: "listproduct" });
        }, 2000); // Atraso de 2 segundos para permitir que o toast seja visto
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
    clearForm() {
      this.form.title = "";
      this.form.cor = "";
      this.form.ano = "";
      this.form.marca = "";
      this.form.modelo = "";
      this.form.identification = "";
      this.form.condicao = "";
    },
    makeToast(message = "Salvo com Sucesso") {
      toast.success(message, {
        autoClose: 5000,
      });
    },
  },
};
</script>
