<template>
  <div class="d-flex justify-content-center">
    <div class="card col-6 mt-3">
      <form>
        <div class="card-header">
          <span v-if="form.id">Editar</span><span v-else>Cadastro/Empresa</span>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="title" class="form-label">Nome Fantasia</label>
            <input type="text" class="form-control" id="title" name="title" v-model="form.title" />
          </div>
          <div class="mb-3">
            <label for="nomeempresarial" class="form-label">Nome Empresarial</label>
            <input type="text" class="form-control" id="nomeempresarial" name="nomeempresarial" v-model="form.nomeempresarial" />
          </div>
          <div class="mb-3">
            <label for="cnpj" class="form-label">CNPJ</label>
            <input type="tel" class="form-control" name="cnpj" id="cnpj" v-model="form.cnpj"
              :class="{ 'is-invalid': !isValidCNPJ && form.cnpj !== '' }" @blur="validateCNPJ" required />
            <!-- Feedback de validação -->
            <div v-if="!isValidCNPJ && form.cnpj !== ''" class="invalid-feedback">
              CNPJ inválido.
            </div>
            <!-- Descrição sobre o formato do CNPJ -->
            <small id="cnpjHelp" class="form-text text-muted">O CNPJ deve ser escrito no formato XX.XXX.XXX/XXXX-XX ou apenas números.</small>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Descrição</label>
            <textarea type="textarea" class="form-control" id="description" name="description" v-model="form.description"></textarea>
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
  name: "Form",
  data() {
    return {
      form: {
        id: null,
        title: "",
        description: "",
        nomeempresarial: "",
        cnpj: "",
      },
    };
  },
  computed: {
    isValidCNPJ() {
      const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
      return cnpjRegex.test(this.form.cnpj);
    }
  },
  async created() {
    this.form.id = this.$route.query.id;
    if (this.form.id) {
      await this.fetchTask(this.form.id);
    }
  },
  methods: {
    async fetchTask(id) {
      const docRef = doc(db, "fornecedor", id); // Certifique-se de que a coleção é 'fornecedor'
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.form = { id, ...docSnap.data() };
      } else {
        console.log("No such document!");
      }
    },
    async saveTask() {
      if (this.isValidCNPJ) {
        if (this.form.id) {
          this.updateTask();
        } else {
          this.insertTask();
        }
      } else {
        console.log("CNPJ inválido!");
      }
    },
    async insertTask() {
      try {
        await addDoc(collection(db, "fornecedor"), {
          title: this.form.title,
          description: this.form.description,
          cnpj: this.form.cnpj,
          nomeempresarial: this.form.nomeempresarial,
        });
        this.clearForm();
        this.makeToast();
        setTimeout(() => {
          this.$router.push({ name: "listfornecedor" });
        }, 2000); // Atraso de 2 segundos para permitir que o toast seja visto
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
    async updateTask() {
      try {
        const docRef = doc(db, "fornecedor", this.form.id); // Certifique-se de que a coleção é 'fornecedor'
        await updateDoc(docRef, {
          title: this.form.title,
          description: this.form.description,
          cnpj: this.form.cnpj,
          nomeempresarial: this.form.nomeempresarial,
        });
        this.makeToast("Fornecedor atualizado com sucesso!");
        setTimeout(() => {
          this.$router.push({ name: "listfornecedor" });
        }, 2000); // Atraso de 2 segundos para permitir que o toast seja visto
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
    clearForm() {
      this.form.title = "";
      this.form.description = "";
      this.form.cnpj = "";
      this.form.nomeempresarial = "";
    },
    makeToast(message = "Salvo com Sucesso") {
      toast.success(message, {
        autoClose: 5000,
      });
    },
    validateCNPJ() {
      const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
      this.isValidCNPJ = cnpjRegex.test(this.form.cnpj);
    }
  },
};
</script>
